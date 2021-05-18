import React, { HTMLAttributes, memo, useCallback, useMemo } from 'react';
import { Moment } from 'moment';
import { TDate } from '@z-r/calendar/types/interface';

import { Override } from 'src/type';
import useLocale from 'src/components/LocaleProvider/useLocale';

import { getDisabledRule, getValidDate, Rules } from './utils';
import { SMonthCalendar, prefixCls } from './style';
import HeaderSwitcher from './HeaderSwitcher';
import LOCALE from './locale/zh_CN';

interface MonthProps {
    /** 当前值，受控 */
    value?: TDate | null;
    /** 默认值，非受控 */
    defaultValue?: TDate | null;
    /**
     * @deprecated 使用 onChange 来替换
     */
    onSelect?: (t: Moment) => void;
    /** 选中变化回调 */
    onChange?: (t: Moment) => void;
    /** 自定义规则 */
    rules?: Rules;
    /** 自定义样式 */
    customStyle?: {
        /**
         * 外层阴影，为 false 时隐藏
         */
        boxShadow?: boolean;
    };
    /** @ignore */
    locale?: typeof LOCALE;
}

const Month = ({
    onSelect,
    onChange,
    rules,
    locale: _locale,
    ...rest
}: MonthProps & Override<HTMLAttributes<HTMLDivElement>, MonthProps>) => {
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
