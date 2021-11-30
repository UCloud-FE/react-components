import React, { ChangeEvent, useCallback, HTMLAttributes, useMemo, memo } from 'react';
import _ from 'lodash';

import Loading from 'src/components/Loading';
import useLocale from 'src/components/LocaleProvider/useLocale';
import { Override } from 'src/type';

import { emptyTipCls, loadingCls, emptyContentCls, SWrap } from './style';
import LOCALE from './locale/zh_CN';
import SearchInput from './SearchInput';

export interface SearchProps {
    /** 搜索后数量，null 不展示 */
    count?: number | null | void;
    /** 为空 */
    empty?: boolean;
    /** 展示 loading */
    loading?: boolean;
    /** 触发搜索回调 */
    onSearch: ((value: string) => Promise<void>) | ((value: string) => void);
    /** 触发搜索回调的防抖间隔 */
    wait?: number;
    /** @ignore */
    locale?: typeof LOCALE;
}

const Search = function ({
    count,
    empty,
    loading,
    onSearch,
    children,
    wait = 200
}: Override<HTMLAttributes<HTMLDivElement>, SearchProps>) {
    const handleSearch = useMemo(() => _.debounce((v: string) => onSearch(v), wait), [onSearch, wait]);
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value);
    },
        [handleSearch]
    );
    const locale = useLocale(LOCALE, 'SharedSearch');

    return (
        <SWrap>
            <SearchInput onChange={handleChange} count={count} status="default" />
            {loading ? <Loading loading={loading} className={loadingCls} /> : null}
            {empty ? <div className={emptyTipCls}>{locale.empty}</div> : null}
            <div className={empty ? emptyContentCls : ''}>{children}</div>
        </SWrap>
    );
};

export default memo(Search);
