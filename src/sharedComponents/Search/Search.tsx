import React, { ChangeEvent, useCallback, HTMLAttributes, useMemo, memo } from 'react';
import _ from 'lodash';

import Icon from 'src/components/Icon';
import Input from 'src/components/Input';
import Loading from 'src/components/Loading';
import useLocale from 'src/components/LocaleProvider/useLocale';
import { Override } from 'src/type';

import { countCls, emptyTipCls, inputCls, loadingCls, emptyContentCls, SWrap } from './style';
import LOCALE from './locale/zh_CN';

interface SearchProps {
    /** 搜索后数量，null 不展示 */
    count?: number | null;
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
    locale: _locale,
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
    const locale = useLocale(LOCALE, 'SharedSearch', _locale);

    const prefix = <Icon type="search" />;
    const suffix =
        count != null ? (
            <span className={countCls}>
                {count}
                {locale.unit}
            </span>
        ) : null;

    return (
        <SWrap>
            <Input className={inputCls} suffix={suffix} prefix={prefix} onChange={handleChange} clearable block />
            {loading ? (
                <Loading
                    loading={loading}
                    className={loadingCls}
                    indicator={<Icon style={{ fontSize: '14px' }} type="loading" spin />}
                />
            ) : null}
            {empty ? <div className={emptyTipCls}>{locale.empty}</div> : null}
            <div className={empty ? emptyContentCls : ''}>{children}</div>
        </SWrap>
    );
};

export default memo(Search);
