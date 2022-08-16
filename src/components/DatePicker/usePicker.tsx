import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import type { TDate } from '@ucloud-fe/calendar';

import { animationPrefixCls } from 'src/style/globalAnimation';
import useLocale from 'src/components/LocaleProvider/useLocale';
import useUncontrolled from 'src/hooks/useUncontrolled';
import usePopoverConfig from 'src/hooks/usePopoverConfig';
import KeyCode from 'src/utils/KeyCode';

import LOCALE from './locale/zh_CN';
import { isDateDisabled, getValidDate, isDateValid, Precision, setPrecision } from './utils';
import { DatePickerProps } from './DatePicker';
import { datePickerPopupCls } from './style';

const formatInput = (v: string, allFormat: string[], precision?: Precision): Moment | null | false => {
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
            return precision ? d.startOf(precision) : d;
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

const getValidCurrentDate = (value: TDate | null | undefined, d: Date, currentValue?: TDate): TDate =>
    value != null && moment(+value).isValid()
        ? value
        : currentValue != null
        ? currentValue
        : moment(d).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
const trigger: string[] = [];
const align = {
    points: ['tl', 'bl'],
    overflow: { adjustX: 0, adjustY: 1 },
    offset: [0, 10],
    targetOffset: [0, 0]
};
const usePicker = <D,>(
    props: TProps<D>,
    displayToFormatAndTimeMode: DisplayToFormatAndTimeMode<D>,
    mode: 'date' | 'month',
    onClear?: () => void
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

    const precision: Precision = useMemo(() => {
        if (mode === 'month') return 'month';
        if (!timeMode?.length) return 'date';
        if (timeMode.indexOf('ss') >= 0) return 'second';
        if (timeMode.indexOf('mm') >= 0) return 'minute';
        if (timeMode.indexOf('HH') >= 0) return 'hour';
        return 'date';
    }, [mode, timeMode]);

    const d = useMemo(() => new Date(), []);

    const clickConfirm = !timeMode?.length;
    let [value, onChange] = useUncontrolled<TDate | null | undefined, Moment | null>(_value, defaultValue, _onChange);
    const [calCurrentValue, setCalCurrentValue] = useState(() => getValidCurrentDate(value, d));
    if (!nullable && value == null) value = d;
    const [inputValue, setInputValue] = useState(() => formatDate(value, format));
    const [calValue, setCalValue] = useState(value);
    const [lastValidValue, setLastValidValue] = useState(calValue);
    const [useInputValue, setUseInputValue] = useState(true);
    const [visible, setVisible] = useState(false);
    const locale = useLocale(LOCALE, 'DatePicker', _locale);

    useEffect(() => {
        if (visible) return;
        if (!value) {
            if (nullable) {
                setInputValue('');
            } else if (!nullable) {
                setInputValue(formatDate(moment(+d), format));
            }
        } else {
            setInputValue(formatDate(moment(+value), format));
        }
    }, [visible, d, format, nullable, value]);

    const error = useMemo(() => {
        let currentValue: TDate | null | undefined;
        if (useInputValue) {
            const inputDValue = formatInput(inputValue, allFormat, precision);
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
        precision,
        rules,
        useInputValue,
        value
    ]);

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (!visible) setVisible(true);
            const v = e.target.value;
            setInputValue(v);
            const d = formatInput(v, allFormat, precision);
            if (d) {
                setCalValue(d);
            } else {
                setCalValue(null);
                calValue && setLastValidValue(calValue);
            }
            setUseInputValue(true);
        },
        [allFormat, calValue, precision, visible]
    );
    const clear = useCallback(() => {
        setInputValue('');
        setCalValue(null);
    }, []);
    const hide = useCallback(() => {
        setVisible(false);
    }, []);

    const handleConfirm = useCallback(
        (v?: TDate | null) => {
            const currentValue = v !== undefined ? v : calValue;
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
    const handleInputClear = useCallback(() => {
        clear();
        // 不走 onChange，区分两种操作
        if (onClear) {
            onClear();
        } else {
            handleConfirm(null);
        }
    }, [clear, handleConfirm, onClear]);

    const handleCalendarChange = useCallback(
        (v: Moment | TDate) => {
            v = getValidDate(v, rules);
            v = setPrecision(v, precision);
            setCalValue(moment(+v));
            setInputValue(formatDate(moment(+v), format));
            setUseInputValue(false);
            if (clickConfirm) {
                onChange && onChange(moment(+v));
                setVisible(false);
            }
        },
        [clickConfirm, format, onChange, precision, rules]
    );

    const handleInputFocus = useCallback(() => {
        setCalValue(value == null ? null : value);
        setCalCurrentValue(currentValue => getValidCurrentDate(value, d, currentValue));
        setUseInputValue(true);
        setVisible(true);
    }, [d, value]);
    const handleInputBlur = useCallback(() => {
        setVisible(false);
    }, []);
    const handleInputClick = useCallback(() => {
        setVisible(true);
    }, []);
    const handleInputMouseDown = handleInputClick;

    const handleInputDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.keyCode === KeyCode.ENTER) {
                handleConfirm();
                e.preventDefault();
                e.stopPropagation();
            }
        },
        [handleConfirm]
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
        onFocus: handleInputFocus,
        onBlur: handleInputBlur,
        onKeyDown: handleInputDown,
        onClick: handleInputClick,
        onMouseDown: handleInputMouseDown,
        disabled,
        size,
        status,
        placeholder: placeholder === undefined ? locale.placeholder : placeholder,
        clearable: nullable ? { autoFocus: false, callOnChange: false } : false,
        onClear: handleInputClear
    };
    const containerProps = { ...rest, disabled, status };
    const _popoverProps = {
        zIndex,
        transitionName: `${animationPrefixCls}-fade`,
        ...popoverConfigProps,
        ...popoverProps,
        ...(getCalendarContainer ? { getPopupContainer: getCalendarContainer } : {}),
        popupClassName: datePickerPopupCls,
        trigger,
        visible,
        align
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
        shortcuts,
        showConfirm: !clickConfirm
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
            active: visible
        },
        { clear, hide }
    ];
};

export default usePicker;
