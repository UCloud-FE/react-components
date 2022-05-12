import React, { HTMLAttributes, memo, useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import { Mode, TDate } from '@z-r/calendar';

import { Override } from 'src/type';
import useLocale from 'src/components/LocaleProvider/useLocale';

import { getValidDate, getDisabledRule } from './utils';
import { prefixCls, SCalendar, STwoSide, twoSideSingleCls } from './style';
import HeaderSwitcher from './HeaderSwitcher';
import LOCALE from './locale/zh_CN';
import Cell from './Cell';
import { CalendarProps } from './Calendar';
import useUncontrolled from 'src/hooks/useUncontrolled';
import HeaderButton from './HeaderButton';

const TwoSideCalendar = React.memo(function DateCalendar({
    onSelect,
    onChange,
    rules,
    locale: _locale,
    current: _current,
    defaultCurrent: _defaultCurrent,
    onCurrentChange: _onCurrentChange,
    ...rest
}: CalendarProps & Override<HTMLAttributes<HTMLDivElement>, CalendarProps>) {
    const [current, setCurrent] = useUncontrolled<TDate>(
        _current,
        _defaultCurrent || rest.value || rest.defaultValue || new Date(),
        _onCurrentChange
    );

    const [firstDisplay, setFirstDisplay] = useState(true);
    const [secondDisplay, setSecondDisplay] = useState(true);
    const handleFirstModeChange = useCallback((mode: Mode) => {
        setSecondDisplay(mode === 'date');
    }, []);
    const handleSecondModeChange = useCallback((mode: Mode) => {
        setFirstDisplay(mode === 'date');
    }, []);
    const handleSecondCurrentChange = useCallback(
        (d: Date) => {
            setCurrent(moment(d).add({ month: -1 }));
        },
        [setCurrent]
    );
    const disabledRule = useMemo(() => {
        return getDisabledRule(rules);
    }, [rules]);
    const handleChange = useCallback(
        (v: TDate) => {
            const validDate = getValidDate(v, rules);
            onChange && onChange(validDate);
        },
        [onChange, rules]
    );
    const locale = useLocale(LOCALE, 'Calendar', _locale);
    const calendarLocale = useMemo(() => ({ months: locale.months, weekdays: locale.weekdays }), [
        locale.months,
        locale.weekdays
    ]);
    const renderHeaderSwitcher = useCallback(props => <HeaderSwitcher {...props} locale={locale} />, [locale]);

    return (
        <STwoSide className={!firstDisplay || !secondDisplay ? twoSideSingleCls : ''}>
            <SCalendar
                prefixCls={prefixCls}
                disabledRule={disabledRule}
                onChange={handleChange}
                locale={calendarLocale}
                monthBeforeYear={locale.monthBeforeYear}
                components={{ HeaderSwitcher: renderHeaderSwitcher, Cell: Cell, HeaderButton }}
                current={current}
                onCurrentChange={setCurrent}
                onModeChange={handleFirstModeChange}
                customStyle={{ boxShadow: false }}
                hidden={!firstDisplay}
                {...rest}
            />
            <SCalendar
                prefixCls={prefixCls}
                disabledRule={disabledRule}
                onChange={handleChange}
                locale={calendarLocale}
                monthBeforeYear={locale.monthBeforeYear}
                components={{ HeaderSwitcher: renderHeaderSwitcher, Cell: Cell, HeaderButton }}
                current={moment(+current).add({ month: 1 })}
                onCurrentChange={handleSecondCurrentChange}
                onModeChange={handleSecondModeChange}
                customStyle={{ boxShadow: false }}
                hidden={!secondDisplay}
                {...rest}
            />
        </STwoSide>
    );
});

export default memo(TwoSideCalendar);
