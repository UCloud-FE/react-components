import React, {
    memo,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
    MouseEvent,
    useEffect,
    useContext
} from 'react';
import moment, { Moment } from 'moment';
import { TDate } from '@ucloud-fe/calendar';

import useUncontrolled from 'src/hooks/useUncontrolled';
import useLocale from 'src/components/LocaleProvider/useLocale';
import ControllerContext from 'src/components/Form/ControllerContext';
import useDidMount from 'src/hooks/useDidMount';
import isArray from 'src/utils/isArray';
import isNumber from 'src/utils/isNumber';
import Calendar, { TwoSide } from 'src/components/Calendar';
import pick from 'src/utils/pick';
import Popover from 'src/components/Popover';
import Input from 'src/components/Input';

import LOCALE from './locale/zh_CN';
import { isRangeDateValid } from './utils';
import {
    RangeSelect,
    RangeContainer,
    SRangeInputWrap,
    readonlyInputCls,
    RangeInputWrap,
    SPopup,
    Arrow,
    RangeCalendarWrap,
    dateSeparatorCls
} from './style';
import Footer, { TShortcut } from './Footer';
import useRangePicker, { RangeActionRef, RangePickerRef } from './useRangePicker';

interface RangeProps {
    /** 当前值，受控 */
    value?: [TDate | null, TDate | null];
    /** 默认值，非受控 */
    defaultValue?: [TDate | null, TDate | null];
    /** 修改回调，返回 moment 对象数组 */
    onChange?: (v: [Moment | null, Moment | null]) => void;
    /** 初始化回调函数，传入 option 的情况下会输出 option 对应的值，配合 option 或者 defaultOption 使用 */
    onInitialChange?: (v: [Moment | null, Moment | null]) => void;
    /** 选项 */
    options?: {
        label: ReactNode;
        value: string;
        disabled?: boolean;
        range?: {
            start?: TDate;
            end?: TDate;
        };
    }[];
    /** 当前选项，受控 */
    option?: string;
    /** 默认选项，非受控 */
    defaultOption?: string;
    /** 选项变化回调 */
    onOptionChange?: (option: string) => void;
    /**
     * @deprecated 不传入 options 即可隐藏
     * 隐藏快捷选项
     */
    hideOptions?: boolean;
    /** 是否可为空 */
    nullable?: [boolean | undefined, boolean | undefined] | [boolean | undefined] | [];
    /** 输入和展示的字符串格式，为数组时，第一个用作展示 */
    format?: string | string[];
    /**
     * @deprecated 使用 format 替换
     * 展示格式，会传入 DatePicker 和 Month 中（按照 type）
     */
    display?: {
        date?: {
            /** @deprecated 设置日期展示格式，使用 format 替换 */
            format?: string;
            /** @deprecated 是否展示日期选择，仅时间选择需求使用 TimePicker 替换 */
            show?: boolean;
        };
        /** 设置为 false，隐藏时 */
        hour?: boolean;
        /** 设置为 false，隐藏分 */
        minute?: boolean;
        /** 设置为 false，隐藏秒 */
        second?: boolean;
        range?: {
            /** @deprecated 新版无用 */
            format?: string;
        };
    };
    /** 自定义规则 */
    rules?: {
        range?: [TDate | void, TDate | void];
        maxRange?: any;
        minRange?: any;
    };
    /** 状态 */
    status?: 'default' | 'error';
    /** placeholder */
    placeholder?: [string | undefined, string | undefined] | [string | undefined] | [];
    /** picker 类型 */
    type?: 'date' | 'month';
    /** 面板快捷内容 */
    shortcuts?: [TShortcut[] | null, TShortcut[] | null] | [TShortcut[] | null];
    /** 控件尺寸 */
    size?: 'sm' | 'md' | 'lg';
    /** 是否禁用 */
    disabled?: boolean;
    /** 弹出层的 z-index */
    zIndex?: number;
    /** 自定义默认选项 props */
    selectProps?: any;
    /** 自定义时间选择框弹出层props */
    popoverProps?: any;
    /** 自定义渲染 */
    customRender?: {
        /** 自定义渲染只读时（非自定义选项）的展示内容（时间区域） */
        readonlyDisplay?: (value: [TDate | null, TDate | null]) => ReactNode;
    };
    /**
     * @ignore
     * 自定义 datePicker 的 props
     */
    // datePickerProps?: any;
    /** 提示信息,展示在时间选择弹窗中 */
    rangeTip?: ReactNode;
    /** @ignore */
    locale?: typeof LOCALE;
}

type RangeValue = [TDate | null, TDate | null];
type CallbackRangeValue = [Moment | null, Moment | null];

const formatValue = (v: TDate | null, nullable = false, defaultV: TDate) => {
    return v == null ? (nullable ? null : moment(+defaultV)) : moment(+v);
};

const formatRangeValue = (
    value: RangeValue,
    nullable: RangeProps['nullable'] = [],
    d: TDate
): [Moment | null, Moment | null] => {
    return [formatValue(value[0], nullable[0], d), formatValue(value[1], nullable[1], d)];
};

const getDateFromOption = (option: TDate | any) => {
    if (option === null) return null;
    if (moment.isDate(option) || moment.isMoment(option) || isNumber(option)) {
        return moment(option);
    } else {
        return moment().add(option);
    }
};

const getValueFromOption = (options: RangeProps['options'] = [], optionValue: string): CallbackRangeValue => {
    const option = options.find(option => option.value === optionValue);
    const { range = {} } = option || {};
    const s = getDateFromOption(range.start);
    const e = getDateFromOption(range.end);

    return [s, e];
};

const Range = ({
    options: _options,
    option: _option,
    defaultOption,
    onOptionChange: _onOptionChange,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hideOptions,
    value: _value,
    defaultValue,
    onChange: _onChange,
    onInitialChange,
    nullable,
    size = 'md',
    display = {},
    format,
    rules = {},
    type = 'date',
    disabled,
    zIndex,
    locale: _locale,
    selectProps,
    popoverProps: _popoverProps,
    rangeTip,
    status,
    placeholder,
    shortcuts,
    customRender,
    ...rest
}: RangeProps) => {
    const d = useMemo(() => new Date(), []);
    const locale = useLocale(LOCALE, 'DatePicker', _locale);
    const [option, onOptionChange] = useUncontrolled(_option, defaultOption || 'custom', _onOptionChange);
    const options = useMemo(
        () =>
            _options
                ? _options.concat({
                      label: locale.custom,
                      value: 'custom'
                  })
                : [],
        [_options, locale.custom]
    );
    const [value, onChange, updateValueWithoutCallOnChange] = useUncontrolled<RangeValue, CallbackRangeValue>(
        _value,
        defaultValue || [null, null],
        _onChange
    );
    const [cacheValue, setCacheValue] = useState(() => formatRangeValue(value, nullable, d));
    const [rangeError, setRangeError] = useState<string>();
    const inputRefS = useRef<RangePickerRef>();
    const inputRefE = useRef<RangePickerRef>();
    const actionRefS = useRef<RangeActionRef>();
    const actionRefE = useRef<RangeActionRef>();
    // 0 没有编辑中 1 第一个编辑中 2 非第一个编辑中
    const [isFirstEditing, setIsFirstEditing] = useState<0 | 1 | 2>(0);
    const { status: contextStatus } = useContext(ControllerContext);

    const readonly = option !== 'custom';
    const [nullableS, nullableE] = isArray(nullable) ? nullable : [];
    const precision = type === 'month' ? 'month' : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { range: rangeDisplay, ...pickerDisplay } = display;
    const [shortcutsS, shortcutsE] = isArray(shortcuts) ? shortcuts : [];
    const startRangeInputRef = useRef<HTMLDivElement>(null);
    const [startRangeInputWidth, setStartRangeInputWidth] = useState(200);

    useDidMount(() => {
        const [valueS, valueE] = isArray(value) ? value : [null, null];
        let initialValue: CallbackRangeValue;
        if (option !== 'custom') {
            initialValue = getValueFromOption(options, option);
        } else {
            initialValue = [formatValue(valueS, nullableS, d), formatValue(valueE, nullableE, d)];
        }
        onInitialChange && onInitialChange(initialValue);
        updateValueWithoutCallOnChange(initialValue);
    });

    const handleStartChange = useCallback(
        (value: Moment | null, isClear?: boolean) => {
            const [, valueE] = cacheValue;
            const newValue: CallbackRangeValue = [value, valueE];
            const rangeDateValidResult = isRangeDateValid(newValue, rules, precision);
            setRangeError(undefined);
            if (isClear) {
                onChange(newValue);
                actionRefS.current?.hide();
                actionRefE.current?.hide();
            } else if (rangeDateValidResult !== true) {
                inputRefE.current?.focus();
                if (rangeDateValidResult === 'startGreaterThanEnd') {
                    actionRefE.current?.clear();
                } else {
                    setRangeError(locale[(rangeDateValidResult + 'Tip') as keyof typeof locale]);
                }
                newValue[1] = null;
            } else if (isFirstEditing === 1) {
                inputRefE.current?.focus();
            } else {
                onChange(newValue);
            }
            setCacheValue(formatRangeValue(newValue, nullable, d));
        },
        [cacheValue, rules, precision, isFirstEditing, locale, onChange, nullable, d]
    );
    const handleEndChange = useCallback(
        (value: Moment | null, isClear?: boolean) => {
            const [valueS] = cacheValue;
            const newValue: CallbackRangeValue = [valueS, value];
            const rangeDateValidResult = isRangeDateValid(newValue, rules, precision);
            setRangeError(undefined);
            if (isClear) {
                onChange(newValue);
                actionRefS.current?.hide();
                actionRefE.current?.hide();
            } else if (rangeDateValidResult !== true) {
                inputRefS.current?.focus();
                if (rangeDateValidResult === 'startGreaterThanEnd') {
                    actionRefS.current?.clear();
                } else {
                    setRangeError(locale[(rangeDateValidResult + 'Tip') as keyof typeof locale]);
                }
                newValue[0] = null;
            } else if (isFirstEditing === 1) {
                inputRefS.current?.focus();
            } else {
                onChange(newValue);
            }
            setCacheValue(formatRangeValue(newValue, nullable, d));
        },
        [cacheValue, rules, precision, isFirstEditing, locale, onChange, nullable, d]
    );

    const onClearS = useCallback(() => {
        handleStartChange(null, true);
    }, [handleStartChange]);

    const onClearE = useCallback(() => {
        handleEndChange(null, true);
    }, [handleEndChange]);

    const handleOptionChange = useCallback(
        (value: string) => {
            if (value !== 'custom') onChange(getValueFromOption(options, value));
            onOptionChange(value);
        },
        [onChange, onOptionChange, options]
    );

    const handleInputMouseDown = useCallback((e: MouseEvent) => {
        if (e.target === e.currentTarget) e.preventDefault();
    }, []);

    const sharedPickerProps = {
        size,
        format,
        display: pickerDisplay,
        disabled,
        popoverProps: _popoverProps,
        zIndex,
        type,
        rules,
        status
    };
    const [valueS, valueE] = cacheValue;
    const [placeholderS = locale.placeholderRangeStart, placeholderE = locale.placeholderRangeEnd] = isArray(
        placeholder
    )
        ? placeholder
        : [];

    const [
        inputPropsS,
        inputWrapPropsS,
        calendarPropsS,
        footerPropsS,
        { active: activeS, error: errorS },
        popoverProps,
        popupProps,
        { hasTime, isMonth }
    ] = useRangePicker({
        value: valueS,
        onChange: handleStartChange,
        nullable: nullableS,
        placeholder: placeholderS,
        shortcuts: shortcutsS,
        actionRef: actionRefS,
        onClear: onClearS,
        ...sharedPickerProps,
        rules: isFirstEditing === 2 ? { ...rules, range: [rules.range?.[0], cacheValue[1]] } : rules,
        prefix: true,
        suffix: locale.to
    });

    const [
        inputPropsE,
        inputWrapPropsE,
        calendarPropsE,
        footerPropsE,
        { active: activeE, error: errorE }
    ] = useRangePicker({
        value: valueE,
        onChange: handleEndChange,
        nullable: nullableE,
        placeholder: placeholderE,
        shortcuts: shortcutsE,
        actionRef: actionRefE,
        onClear: onClearE,
        ...sharedPickerProps,
        rules: isFirstEditing === 2 ? { ...rules, range: [cacheValue[0], rules.range?.[1]] } : rules
    });

    useEffect(() => {
        if (activeS || activeE) return;
        setCacheValue(formatRangeValue(value, nullable, d));
    }, [activeE, activeS, d, nullable, value]);

    useEffect(() => {
        if (!activeS && !activeE) {
            setIsFirstEditing(0);
        } else {
            setIsFirstEditing(v => (v === 0 ? 1 : 2));
        }
    }, [activeE, activeS]);

    useEffect(() => {
        if (activeE) {
            setStartRangeInputWidth(startRangeInputRef.current?.offsetWidth || 200);
        }
    }, [activeE]);

    const CalendarComp = isMonth ? Calendar.Month : hasTime ? Calendar : TwoSide;

    return (
        <RangeContainer {...rest} disabled={disabled}>
            {!!options.length && (
                <RangeSelect
                    {...selectProps}
                    options={options.map(option => pick(option, ['label', 'value', 'disabled']))}
                    size={size}
                    value={option}
                    disabled={disabled}
                    onChange={handleOptionChange}
                />
            )}
            {readonly && customRender?.readonlyDisplay ? (
                customRender.readonlyDisplay(cacheValue)
            ) : (
                <SRangeInputWrap
                    size={size}
                    disabled={disabled}
                    focused={activeS || activeE}
                    readonly={readonly}
                    onMouseDown={handleInputMouseDown}
                    status={status || contextStatus}
                >
                    <Popover
                        {...popoverProps}
                        visible={activeS}
                        key={"activeS"}
                        popup={
                            <SPopup {...popupProps} endInputHighlight={activeE}>
                                {/* <Arrow style={{ left: activeE ? startRangeInputWidth + 'px' : '20px' }} /> */}
                                <RangeCalendarWrap visible={activeS}>
                                    <CalendarComp
                                        {...calendarPropsS}
                                        rangeValue={[calendarPropsS.value, cacheValue?.[1]]}
                                        value={null}
                                    />
                                    <Footer
                                        {...footerPropsS}
                                        tip={rangeError || errorS || rangeTip}
                                        isError={!!rangeError || !!errorS}
                                    />
                                </RangeCalendarWrap>
                            </SPopup>
                        }
                    >
                        {readonly ? (
                            <span className={readonlyInputCls}>{inputPropsS.value}</span>
                        ) : (
                            <RangeInputWrap {...inputWrapPropsS} ref={startRangeInputRef}>
                                <Input {...inputPropsS} ref={inputRefS} />
                            </RangeInputWrap>
                        )}
                    </Popover>
                    <Popover
                        {...popoverProps}
                        visible={activeE}
                        key={"activeE"}
                        popup={
                            <SPopup {...popupProps} endInputHighlight={activeE}>
                                {/* <Arrow style={{ left: activeE ? startRangeInputWidth + 'px' : '20px' }} /> */}

                                <RangeCalendarWrap visible={activeE}>
                                    <CalendarComp
                                        {...calendarPropsE}
                                        rangeValue={[cacheValue?.[0], calendarPropsE.value]}
                                        value={null}
                                    />
                                    <Footer
                                        {...footerPropsE}
                                        tip={rangeError || errorE || rangeTip}
                                        isError={!!rangeError || !!errorE}
                                    />
                                </RangeCalendarWrap>
                            </SPopup>
                        }
                    >
                        {readonly ? (
                            <>
                                <span className={dateSeparatorCls}>-</span>
                                <span className={readonlyInputCls}>{inputPropsE.value}</span>
                            </>
                        ) : (
                            <RangeInputWrap {...inputWrapPropsE} isEnd>
                                <Input {...inputPropsE} ref={inputRefE} />
                            </RangeInputWrap>
                        )}
                    </Popover>
                </SRangeInputWrap>
            )}
        </RangeContainer>
    );
};

export default memo(Range);
