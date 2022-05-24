import React, { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import { TDate } from '@z-r/calendar';

import Input from 'src/components/Input';
import Popover from 'src/components/Popover';
import Box from 'src/components/Box';
// import Combine from 'src/components/Combine';
import Button from 'src/components/Button';
import SvgIcon from 'src/components/SvgIcon';
import useLocale from 'src/components/LocaleProvider/useLocale';
import { animationPrefixCls } from 'src/style/globalAnimation';
import useUncontrolled from 'src/hooks/useUncontrolled';
import { Size } from 'src/style';
import usePopoverConfig from 'src/hooks/usePopoverConfig';

import { footerCls, SPopup, SWrap } from './style';
import Time from './Time';
import LOCALE from './locale/zh_CN';

interface TimeProps {
    /** 当前值，受控 */
    value?: TDate | null;
    /** 默认值，非受控 */
    defaultValue?: TDate | null;
    /** 修改回调 */
    onChange?: (value: Moment | null) => void;
    /** 自定义 Popover 的 props */
    popoverProps?: any;
    /** 是否可为空 */
    nullable?: boolean;
    /** 自定义展示格式 */
    format?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 尺寸 */
    size?: Size;
    /** @ignore */
    locale?: typeof LOCALE;
}

const FooterWithoutMemo = ({
    onConfirm,
    disabled,
    locale: _locale
}: {
    onConfirm: () => void;
    disabled: boolean;
    locale?: typeof LOCALE;
}) => {
    const locale = useLocale(LOCALE, 'DatePicker', _locale);
    return (
        <Box className={footerCls} container justifyContent="space-between" alignItems="center">
            {/* <Combine>
                {shortcuts.map((shortcut, i) => (
                    <Shortcut index={i} key={i} shortcut={shortcut} onShortcutClick={handleShortcutClick} />
                ))}
            </Combine> */}
            <span></span>
            <Button styleType="primary" onClick={onConfirm} disabled={disabled}>
                {locale.confirm}
            </Button>
        </Box>
    );
};

const Footer = memo(FooterWithoutMemo);

const inputToTime = (v: string, format: string): Moment | null => {
    if (v == '') return null;
    v = v.replace(/：/g, ':').trim();
    return moment(v, format.trim(), true);
};
const timeToInput = (v: TDate | null | void, format: string): string => {
    if (v == null) return '';
    return moment(+v).format(format);
};

type TimeMode = ('HH' | 'mm' | 'ss')[];
const formatToTimeMode = (format: string): TimeMode => {
    const timeMode: TimeMode = [];
    if (format.indexOf('H') >= 0) timeMode.push('HH');
    if (format.indexOf('m') >= 0) timeMode.push('mm');
    if (format.indexOf('s') >= 0) timeMode.push('ss');
    return timeMode;
};

const DefaultFormat = 'HH:mm:ss';

const TimePicker = ({
    value: _value,
    defaultValue,
    onChange: _onChange,
    format: _format = DefaultFormat,
    nullable,
    size,
    disabled,
    popoverProps,
    locale
}: TimeProps) => {
    const [value, onChange] = useUncontrolled(_value, defaultValue, _onChange);
    const [inputValue, setInputValue] = useState('');
    const [timeValue, setTimeValue] = useState(value);
    const [useInputValue, setUseInputValue] = useState(true);
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(false);
    const defaultTime = useMemo(() => moment().startOf('date'), []);
    const avoidBlur = useCallback(e => e.preventDefault(), []);
    const format = _format || DefaultFormat;
    const handleConfirm = useCallback(() => {
        setVisible(false);
        let finalValue = timeValue;
        if (useInputValue) {
            const inputTime = inputToTime(inputValue, format);
            if (inputTime) {
                finalValue = inputTime;
                if (inputTime.isValid()) return;
            } else {
                finalValue = null;
            }
        }
        if (finalValue == null && !nullable) return;
        onChange(finalValue == null ? null : moment(+finalValue));
    }, [format, inputValue, nullable, onChange, timeValue, useInputValue]);
    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const s = e.target.value;
            setInputValue(s);
            const inputTime = inputToTime(s, format);
            if (inputTime && inputTime.isValid()) setTimeValue(inputTime);
            setUseInputValue(true);
        },
        [format]
    );
    const handleTimeChange = useCallback(
        (v: Date) => {
            setTimeValue(v);
            setInputValue(timeToInput(v, format));
            setUseInputValue(false);
        },
        [format]
    );
    const handleInputFocus = useCallback(() => setActive(true), []);
    const handleInputBlur = useCallback(() => setActive(false), []);

    const formatTimeValue = useMemo(() => {
        return new Date(+(timeValue == null ? defaultTime : timeValue));
    }, [defaultTime, timeValue]);

    const isValid = useMemo(() => {
        if (useInputValue) {
            const inputTime = inputToTime(inputValue, format);
            if (inputTime) return inputTime.isValid();
            return nullable;
        }
        return true;
    }, [format, inputValue, nullable, useInputValue]);

    const timeMode = useMemo(() => formatToTimeMode(format), [format]);
    const popoverConfigProps = usePopoverConfig();

    useEffect(() => {
        if (!active) {
            setTimeValue(value);
            setInputValue(
                value == null ? (nullable ? '' : timeToInput(defaultTime, format)) : timeToInput(value, format)
            );
        }
    }, [active, defaultTime, format, nullable, value]);

    return (
        <Popover
            transitionName={`${animationPrefixCls}-fade`}
            {...popoverConfigProps}
            {...popoverProps}
            trigger={[]}
            showAction={['click', 'focus']}
            hideAction={['blur']}
            visible={visible}
            onVisibleChange={setVisible}
            popup={
                <SPopup onMouseDown={avoidBlur}>
                    <Time value={formatTimeValue} onChange={handleTimeChange} mode={timeMode} />
                    <Footer onConfirm={handleConfirm} disabled={!isValid} locale={locale} />
                </SPopup>
            }
        >
            <SWrap>
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    size={size}
                    disabled={disabled}
                    prefix={<SvgIcon type="clock" />}
                />
            </SWrap>
        </Popover>
    );
};

export default memo(TimePicker);
