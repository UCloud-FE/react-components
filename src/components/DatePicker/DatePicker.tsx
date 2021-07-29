import React from 'react';
import { Moment } from 'moment';
import { TDate } from '@z-r/calendar/types/interface';

import Input from 'src/components/Input';
import Calendar from 'src/components/Calendar';
import Popover from 'src/components/Popover';
import Notice from 'src/components/Notice';
import Time from 'src/components/TimePicker/Time';
import SvgIcon from 'src/components/SvgIcon';
import { Size } from 'src/type';

import { PickerContainer, SPopup } from './style';
import Footer, { TShortcut } from './Footer';
import usePicker from './usePicker';
import { formatToShort } from './utils';

export type DatePickerProps = {
    /** 值，受控 */
    value?: TDate | null;
    /** 默认值，非受控 */
    defaultValue?: TDate | null;
    /** 修改回调 */
    onChange?: (v: Moment | null) => void;
    /** 自定义规则 */
    rules?: any;
    /** 尺寸 */
    size?: Size;
    /** 输入和展示的字符串格式，为数组时，第一个用作展示，并影响时间面板 */
    format?: string | string[];
    /** 是否可为空，为空时不传或传入空值会默认为当前时刻 */
    nullable?: boolean;
    /**
     * 设置操作面板，时分秒
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
    };
    /** 是否禁用 */
    disabled?: boolean;
    /** 状态 */
    status?: 'default' | 'error';
    /** placeholder */
    placeholder?: string;
    /** 面板快捷内容 */
    shortcuts?: TShortcut[] | null;
    /** 自定义 popover，参考 popover */
    popoverProps?: any;
    /**
     * @deprecated 使用 popoverProps 替换
     * 弹出层的 z-index
     */
    zIndex?: number;
    /**
     * @deprecated 使用 popoverProps 替换
     * 弹出层容器，参考 popover.getPopupContainer
     */
    getCalendarContainer?: (triggerNode: Element) => Element;
};

type Time = 'HH' | 'mm' | 'ss';

export const displayToFormatAndTimeMode = (display: DatePickerProps['display']): [string[], Time[]] => {
    let format = 'YYYY-MM-DD HH:mm:ss';
    let timeFormatA: Time[] = ['HH', 'mm', 'ss'];
    if (display) {
        let dateFormat = 'YYYY-MM-DD';
        if (display.date && display.date.format) {
            dateFormat = display.date.format;
        }
        timeFormatA = [];
        if (display.hour !== false) {
            timeFormatA.push('HH');
        }
        if (display.minute !== false) {
            timeFormatA.push('mm');
        }
        if (display.second !== false) {
            timeFormatA.push('ss');
        }
        format = timeFormatA.length ? dateFormat + ' ' + timeFormatA.join(':') : dateFormat;
    }
    return [[format, formatToShort(format)], timeFormatA];
};

const DatePicker = (props: DatePickerProps) => {
    const [
        inputProps,
        containerProps,
        popoverProps,
        popupProps,
        calendarProps,
        timeProps,
        footerProps,
        { error }
    ] = usePicker<DatePickerProps['display']>(props, displayToFormatAndTimeMode, 'date');

    return (
        <PickerContainer {...containerProps}>
            <Popover
                {...popoverProps}
                popup={
                    <SPopup {...popupProps}>
                        <Calendar {...calendarProps} sidebar={timeProps.mode.length ? <Time {...timeProps} /> : null} />
                        {error && (
                            <Notice styleType="error" closable={false}>
                                {error}
                            </Notice>
                        )}
                        <Footer {...footerProps} />
                    </SPopup>
                }
            >
                <Input {...inputProps} prefix={<SvgIcon type="calendar" />} />
            </Popover>
        </PickerContainer>
    );
};

export default React.memo(DatePicker);
