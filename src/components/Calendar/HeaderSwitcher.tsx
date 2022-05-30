import React, { HTMLAttributes, memo, useMemo } from 'react';
import { HeaderSwitcherType, Mode } from '@z-r/calendar';

import { Override } from 'src/type';

import LOCALE from './locale/zh_CN';

const HeaderSwitcherWithoutMemo = ({
    type,
    value,
    locale,
    ...rest
}: Override<
    HTMLAttributes<HTMLSpanElement>,
    {
        type: HeaderSwitcherType;
        mode: Mode;
        value: Date;
        locale: typeof LOCALE;
    }
>) => {
    const display = useMemo(() => {
        switch (type) {
            case 'date-month':
                return value.getMonth() + 1 + locale.month;
            case 'date-year':
            case 'month':
                return value.getFullYear() + locale.year;
            case 'year': {
                const baseYear = ((value.getFullYear() / 10) | 0) * 10;
                return `${baseYear}${locale.year} - ${baseYear + 9}${locale.year}`;
            }
            case 'decade': {
                const baseYear = ((value.getFullYear() / 100) | 0) * 100;
                return `${baseYear}${locale.year} - ${baseYear + 99}${locale.year}`;
            }
        }
    }, [type, value, locale.month, locale.year]);

    return <span {...rest}>{display}</span>;
};

export default memo(HeaderSwitcherWithoutMemo);
