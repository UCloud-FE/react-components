import React, { ReactNode, useEffect, useRef, useState } from 'react';

import wait from 'src/utils/wait';
import Highlight from 'src/sharedComponents/Search/Highlight';

const genCancelToken = () => {
    const token = { cancel: false };
    return token;
};
type CancelError = Error & { __is_cancel_error__: true };
const genCancelError = () => {
    const error: CancelError = new Error('Canceled') as CancelError;
    error.__is_cancel_error__ = true;
    return error;
};
const isCancelError = (error: CancelError | Error | unknown): error is CancelError => {
    return !!(error as CancelError)?.__is_cancel_error__;
};

const defaultSearchHandle = async <T extends { title: ReactNode | string; key: string; children?: T[] }>(
    searchValue: string,
    dataSource: T[] = [],
    cancelToken: ReturnType<typeof genCancelToken>
) => {
    // count of matched items
    let count = 0;
    // count of matched run times, used for time slice.
    let runTime = Date.now();
    // handle a list of child
    const handle = async (children: T[]): Promise<[T[], boolean]> => {
        let childrenHit = false;
        const newChildren: T[] = [];
        // handle child
        const handleChild = async (child: T) => {
            if (cancelToken.cancel) {
                throw genCancelError();
            }
            const now = Date.now();
            if (now - runTime > 20) {
                runTime = now;
                await wait();
            }
            const { title, children } = child;
            const override: Partial<T> = {};
            let searchHit = false;
            if (typeof title === 'string') {
                const index = title.indexOf(searchValue);
                searchHit = index >= 0;
                if (searchHit) {
                    count++;
                    const beforeStr = title.substr(0, index);
                    const afterStr = title.substr(index + searchValue.length);
                    override.title = (
                        <>
                            {beforeStr}
                            <Highlight>{searchValue}</Highlight>
                            {afterStr}
                        </>
                    );
                }
            }
            if (children) {
                const [_children, _searchHit] = await handle(children);
                override.children = _children;
                searchHit = _searchHit || searchHit;
            }
            if (searchHit) {
                childrenHit = true;
                newChildren.push({ ...child, ...override });
            }
        };
        const l = children.length;
        const childMatch = async (index: number) => {
            if (index < l) {
                await handleChild(children[index]);
                await childMatch(index + 1);
            }
        };
        await childMatch(0);
        return [newChildren, childrenHit];
    };
    const dataSourceAfterSearch = (await handle(dataSource))[0];
    return {
        dataSource: dataSourceAfterSearch,
        count
    };
};

interface SearchResult<T> {
    dataSource: T[];
    count?: number | null;
    empty?: boolean;
}

const useSearch = <T extends { title: ReactNode | string; key: string; children?: T[] }>({
    dataSource,
    searchValue,
    handleSearch,
    onSearchEnd,
    defaultDataSourceAfterSearch
}: {
    dataSource?: T[];
    searchValue?: string;
    handleSearch?: (searchValue: string, dataSource: T[]) => SearchResult<T> | Promise<SearchResult<T>>;
    onSearchEnd?: (searchResult: any) => void;
    defaultDataSourceAfterSearch?: T[];
}) => {
    if (!defaultDataSourceAfterSearch) defaultDataSourceAfterSearch = dataSource;
    const [dataSourceAfterSearch, setDataSourceAfterSearch] = useState(defaultDataSourceAfterSearch);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number | null | void>(null);
    const [error, setError] = useState<Error>();
    const cacheRef = useRef({ onSearchEnd });

    useEffect(() => {
        cacheRef.current.onSearchEnd = onSearchEnd;
    }, [onSearchEnd]);

    useEffect(() => {
        const cancelToken = genCancelToken();
        (async () => {
            setError(undefined);
            if (!searchValue) {
                setDataSourceAfterSearch(defaultDataSourceAfterSearch);
                setCount(null);
                setLoading(false);
                return;
            }
            if (!dataSource?.length) {
                setDataSourceAfterSearch([]);
                setCount(0);
                setLoading(false);
                return;
            }
            setLoading(true);
            await wait();
            try {
                const result = await (handleSearch
                    ? handleSearch(searchValue, dataSource)
                    : defaultSearchHandle(searchValue, dataSource, cancelToken));
                // 中断未完成的操作
                if (cancelToken.cancel) return;
                setLoading(false);
                setDataSourceAfterSearch(result.dataSource);
                setCount(result.count);
                cacheRef.current.onSearchEnd?.(result);
            } catch (error) {
                // ignore cancel error
                if (isCancelError(error as Error | CancelError)) return;
                console.error(error);
                if (cancelToken.cancel) return;
                setLoading(false);
                setError(error as Error);
            }
        })();
        return () => {
            cancelToken.cancel = true;
        };
    }, [dataSource, defaultDataSourceAfterSearch, handleSearch, searchValue]);
    return {
        dataSource: dataSourceAfterSearch || [],
        loading,
        count,
        error
    };
};

export default useSearch;
