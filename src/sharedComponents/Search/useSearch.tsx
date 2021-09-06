import { useEffect, useRef, useState } from 'react';

const useSearch = <T,>({
    dataSource,
    searchValue,
    handleSearch,
    onSearchEnd
}: {
    dataSource: T;
    searchValue: string;
    handleSearch: (searchValue: string, dataSource: T) => { count: number; dataSource: T };
    onSearchEnd: (searchResult: any) => void;
}): [T, boolean, number | null, boolean] => {
    const [dataSourceAfterSearch, setDataSourceAfterSearch] = useState(dataSource);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState<number | null>(null);
    const [empty, setEmpty] = useState(false);
    const cacheRef = useRef({ onSearchEnd });

    useEffect(() => {
        cacheRef.current.onSearchEnd = onSearchEnd;
    }, [onSearchEnd]);

    useEffect(() => {
        let exited = false;
        (async () => {
            if (!searchValue) {
                setDataSourceAfterSearch(dataSource);
                setCount(null);
                setEmpty(false);
                setLoading(false);
                return;
            }
            setLoading(true);
            const result = await handleSearch(searchValue, dataSource);
            // 中断未完成的操作
            if (exited) return;
            setLoading(false);
            setDataSourceAfterSearch(result.dataSource);
            setCount(result.count);
            setEmpty(result.count === 0);
            cacheRef.current.onSearchEnd(result);
        })();
        return () => {
            exited = true;
        };
    }, [dataSource, handleSearch, searchValue]);

    return [dataSourceAfterSearch, loading, count, empty];
};

export default useSearch;
