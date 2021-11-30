import React from 'react';

import SvgIcon from 'src/components/SvgIcon';
import Input, { InputProps } from 'src/components/Input';
import useLocale from 'src/components/LocaleProvider/useLocale';

import { countCls, inputCls } from './style';
import LOCALE from './locale/zh_CN';
import { SearchProps } from './Search';

const SearchInput = React.forwardRef(function SearchInput(
    { count, ...rest }: Pick<SearchProps, 'count'> & InputProps,
    ref: any
) {
    const locale = useLocale(LOCALE, 'SharedSearch');
    const prefix = <SvgIcon type="search" />;
    const suffix =
        count != null ? (
            <span className={countCls}>
                {count}
                {locale.unit}
            </span>
        ) : null;
    return <Input className={inputCls} suffix={suffix} prefix={prefix} clearable block ref={ref} {...rest} />;
});

export default SearchInput;
