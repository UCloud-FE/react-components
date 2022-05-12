import React, { HTMLAttributes, memo, useCallback, useMemo } from 'react';
import { Moment } from 'moment';
import { TDate } from '@z-r/calendar';

import { Override } from 'src/type';
import useLocale from 'src/components/LocaleProvider/useLocale';

import { getValidDate, Rules, getDisabledRule } from './utils';
import { SCalendar, prefixCls } from './style';
import HeaderSwitcher from './HeaderSwitcher';
import LOCALE from './locale/zh_CN';
import Month from './Month';
import Cell from './Cell';
import HeaderButton from './HeaderButton';

export interface CalendarProps {
    /** 当前值，受控 */
    value?: TDate | null;
    /** 范围值 */
    rangeValue?: [TDate | null, TDate | null];
    /** 默认值，非受控 */
    defaultValue?: TDate | null;
    /**
     * @deprecated 使用 onChange 来替换
     */
    onSelect?: (t: Moment) => void;
    /** 选中变化回调 */
    onChange?: (t: Moment) => void;
    current?: TDate;
    defaultCurrent?: TDate;
    onCurrentChange?: (v: TDate) => void;
    /** 自定义规则 */
    rules?: Rules;
    /** 自定义样式 */
    customStyle?: {
        /**
         * 外层阴影，为 false 时隐藏
         */
        boxShadow?: boolean;
    };
    /** 类型 */
    type?: 'date' | 'month';
    /** @ignore */
    locale?: typeof LOCALE;
}

const DateCalendar = React.memo(function DateCalendar({
    onSelect,
    onChange,
    rules,
    locale: _locale,
    ...rest
}: CalendarProps & Override<HTMLAttributes<HTMLDivElement>, CalendarProps>) {
    const disabledRule = useMemo(() => {
        return getDisabledRule(rules);
    }, [rules]);
    const handleChange = useCallback(
        (v: TDate) => {
            const validDate = getValidDate(v, rules);
            onChange && onChange(validDate);
            onSelect && onSelect(validDate);
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
        <SCalendar
            prefixCls={prefixCls}
            disabledRule={disabledRule}
            onChange={handleChange}
            locale={calendarLocale}
            monthBeforeYear={locale.monthBeforeYear}
            components={{ HeaderSwitcher: renderHeaderSwitcher, Cell: Cell, HeaderButton }}
            {...rest}
        />
    );
});
const Calendar = ({ type, ...props }: CalendarProps) => {
    return type === 'month' ? <Month {...props} /> : <DateCalendar {...props} />;
};

export default memo(Calendar);
