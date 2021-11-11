import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import { TDate } from '@z-r/calendar/types/interface';

import { animationPrefixCls } from 'src/style/globalAnimation';
import useLocale from 'src/components/LocaleProvider/useLocale';
import useUncontrolled from 'src/hooks/useUncontrolled';
import { Size } from 'src/type';
import usePopoverConfig from 'src/hooks/usePopoverConfig';

import LOCALE from './locale/zh_CN';
import { isDateDisabled, getValidDate, isDateValid } from './utils';
import { TShortcut } from './Footer';
import { DatePickerProps } from './DatePicker';

const formatInput = (v: string, allFormat: string[]): Moment | null | false => {
    if (v == '') return null;
    const l = allFormat.length;
    v = v
        .replace(/：/g, ':')
        .replace(/—/g, '-')
        .replace(/\s{2,}/g, ' ')
        .trim();

    for (let i = 0; i < l; i++) {
        let format = allFormat[i];
        format = format.replace(/\s[2]/g, ' ');
        format = format.trim();
        const d = moment(v, format, true);
        if (d.isValid()) {
            return d;
        }
    }
    return false;
};
const formatDate = (v: TDate | null | undefined, format: string) => {
    if (v == null) return '';
    const d = moment(+v);
    return d.isValid() ? d.format(format) : '';
};
type Time = 'HH' | 'mm' | 'ss';
const formatToTimeMode = (format: string): Time[] => {
    const timeMode: Time[] = [];
    if (format.indexOf('H') >= 0) timeMode.push('HH');
    if (format.indexOf('m') >= 0) timeMode.push('mm');
    if (format.indexOf('s') >= 0) timeMode.push('ss');
    return timeMode;
};

type TProps<D> = {
    onInitialChange?: (v: Moment | null) => void;
    display?: D;
} & DatePickerProps;
interface DisplayToFormatAndTimeMode<D> {
    (display?: D): [string[]] | [string[], string[]];
}

const getValidCurrentDate = (value: TDate | null | undefined, d: Date) =>
    value != null && moment(+value).isValid() ? value : d;

const usePicker = <D,>(
    props: TProps<D>,
    displayToFormatAndTimeMode: DisplayToFormatAndTimeMode<D>,
    mode: 'date' | 'month'
) => {
    const {
        value: _value,
        defaultValue,
        onChange: _onChange,
        rules,
        disabled,
        nullable,
        display,
        size,
        popoverProps,
        getCalendarContainer,
        zIndex,
        format: _format,
        locale: _locale,
        status,
        placeholder,
        shortcuts,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        type,
        ...rest
    } = props;

    const [displayFormat, displayTimeMode] = useMemo(() => displayToFormatAndTimeMode(display), [
        display,
        displayToFormatAndTimeMode
    ]);
    const [format, allFormat, timeMode] = useMemo(() => {
        let allFormat = displayFormat;
        let timeMode = displayTimeMode;
        if (_format) {
            allFormat = (Array.isArray(_format) ? _format : [_format]).concat(displayFormat);
            timeMode = formatToTimeMode(allFormat[0]);
        }
        return [allFormat[0], allFormat, timeMode];
    }, [_format, displayFormat, displayTimeMode]);

    const d = useMemo(() => new Date(), []);

    let [value, onChange] = useUncontrolled<TDate | null | undefined, Moment | null>(_value, defaultValue, _onChange);
    const [calCurrentValue, setCalCurrentValue] = useState(() => getValidCurrentDate(value, d));
    if (!nullable && value == null) value = d;
    const [inputValue, setInputValue] = useState(() => formatDate(value, format));
    const [calValue, setCalValue] = useState(value);
    const [lastValidValue, setLastValidValue] = useState(calValue);
    const [useInputValue, setUseInputValue] = useState(true);
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(false);
    const locale = useLocale(LOCALE, 'DatePicker', _locale);

    useEffect(() => {
        if (active) return;
        if (!value) {
            if (nullable) {
                setInputValue('');
            } else if (!nullable) {
                setInputValue(formatDate(moment(+d), format));
            }
        } else {
            setInputValue(formatDate(moment(+value), format));
        }
    }, [active, d, format, nullable, value]);

    const error = useMemo(() => {
        let currentValue: TDate | null | undefined;
        if (useInputValue) {
            const inputDValue = formatInput(inputValue, allFormat);
            if (inputDValue === false) return locale.inputErrorTip;
            currentValue = inputDValue;
        } else {
            currentValue = calValue;
        }
        if (!currentValue) {
            return nullable ? true : locale.nullableErrorTip;
        } else if (isDateValid(currentValue, value, rules)) {
            return locale.dateErrorTip;
        }
        return true;
    }, [
        allFormat,
        calValue,
        inputValue,
        locale.dateErrorTip,
        locale.inputErrorTip,
        locale.nullableErrorTip,
        nullable,
        rules,
        useInputValue,
        value
    ]);

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (!visible) setVisible(true);
            const v = e.target.value;
            setInputValue(v);
            const d = formatInput(v, allFormat);
            if (d) {
                setCalValue(d);
            } else {
                setCalValue(null);
                calValue && setLastValidValue(calValue);
            }
            setUseInputValue(true);
        },
        [allFormat, calValue, visible]
    );
    const handleCalendarChange = useCallback(
        (v: Moment | TDate) => {
            v = getValidDate(v, rules);
            setCalValue(moment(+v));
            setInputValue(formatDate(moment(+v), format));
            setUseInputValue(false);
        },
        [format, rules]
    );

    const handleInputFocus = useCallback(() => {
        setCalValue(value == null ? null : value);
        setCalCurrentValue(getValidCurrentDate(value, d));
        setUseInputValue(true);
        setActive(true);
    }, [d, value]);
    const handleInputBlur = useCallback(() => setActive(false), []);

    const handleConfirm = useCallback(
        (v?: TDate) => {
            const currentValue = v != null ? v : calValue;
            if (!currentValue) {
                if (!nullable) return;
            } else if (isDateDisabled(+currentValue, value, rules)) {
                return;
            }
            onChange && onChange(currentValue ? moment(+currentValue) : null);
            setVisible(false);
        },
        [calValue, nullable, onChange, rules, value]
    );

    const handleShortcut = useCallback(
        (v: TDate) => {
            handleCalendarChange(v);
            handleConfirm(v);
        },
        [handleCalendarChange, handleConfirm]
    );

    const popoverConfigProps = usePopoverConfig();
    const avoidBlur = useCallback(e => e.preventDefault(), []);

    const inputProps = {
        value: inputValue,
        onChange: handleInputChange,
        onBlur: handleInputBlur,
        onFocus: handleInputFocus,
        disabled,
        size,
        status,
        placeholder: placeholder === undefined ? locale.placeholder : placeholder
    };
    const containerProps = rest;
    const _popoverProps = {
        zIndex,
        transitionName: `${animationPrefixCls}-fade`,
        ...popoverConfigProps,
        ...popoverProps,
        ...(getCalendarContainer ? { getPopupContainer: getCalendarContainer } : {}),
        trigger: [],
        showAction: ['click', 'focus'],
        hideAction: ['blur'],
        visible,
        onVisibleChange: setVisible
    };
    const popupProps = {
        onMouseDown: avoidBlur
    };
    const calendarProps = {
        rules,
        value: calValue,
        current: calCurrentValue,
        onCurrentChange: setCalCurrentValue,
        onChange: handleCalendarChange,
        customStyle: { boxShadow: false }
    };
    const timeProps = {
        value: calValue || lastValidValue,
        mode: timeMode,
        onChange: handleCalendarChange
    };
    const footerProps = {
        mode,
        onShortcut: handleShortcut,
        confirmAble: error === true,
        onConfirm: handleConfirm,
        locale: _locale,
        shortcuts
    };

    return [
        inputProps,
        containerProps,
        _popoverProps,
        popupProps,
        calendarProps,
        timeProps,
        footerProps,
        {
            error: typeof error === 'string' ? error : null,
            active
        }
    ];
};

export default usePicker;
