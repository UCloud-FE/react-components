import React, { HTMLAttributes, memo, useCallback, useMemo } from 'react';
import { TDate } from '@z-r/calendar/types/interface';

import { Override } from 'src/type';
import useLocale from 'src/components/LocaleProvider/useLocale';

import { getDisabledRule, getValidDate } from './utils';
import { SMonthCalendar, prefixCls } from './style';
import HeaderSwitcher from './HeaderSwitcher';
import LOCALE from './locale/zh_CN';
import { CalendarProps } from './Calendar';

/**
 * @deprecated 请使用 ```<Calendar type='month' />``` 替换
 */
const Month = ({
    onSelect,
    onChange,
    rules,
    locale: _locale,
    ...rest
}: Override<HTMLAttributes<HTMLDivElement>, CalendarProps>) => {
    const disabledRule = useMemo(() => {
        return getDisabledRule(rules);
    }, [rules]);
    const handleChange = useCallback(
        (v: TDate) => {
            v = getValidDate(v, rules);
            onChange && onChange(v);
            onSelect && onSelect(v);
        },
        [onChange, onSelect, rules]
    );
    const locale = useLocale(LOCALE, 'Calendar', _locale);
    const calendarLocale = useMemo(() => ({ months: locale.months, weekdays: locale.weekdays }), [
        locale.months,
        locale.weekdays
    ]);
    const renderHeaderSwitcher = useCallback(props => <HeaderSwitcher {...props} locale={locale} />, [locale]);

    return (
        <SMonthCalendar
            prefixCls={prefixCls}
            disabledRule={disabledRule}
            onChange={handleChange}
            locale={calendarLocale}
            components={{ HeaderSwitcher: renderHeaderSwitcher }}
            {...rest}
        />
    );
};

export default memo(Month);
