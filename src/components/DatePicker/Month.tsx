import React from 'react';
import { Moment } from 'moment';
import { TDate } from '@z-r/calendar/types/interface';

import Input from 'src/components/Input';
import Calendar from 'src/components/Calendar';
import Popover from 'src/components/Popover';
import Notice from 'src/components/Notice';
import usePopoverContainer from 'src/hooks/usePopoverContainer';
import { Size } from 'src/type';

import { PickerContainer, PickerIcon, SPopup } from './style';
import Footer, { TShortcut } from './Footer';
import usePicker from './usePicker';
import { formatToShort } from './utils';

export type MonthProps = {
    /** 值，受控 */
    value?: TDate | null;
    /** 默认值，非受控 */
    defaultValue?: TDate | null;
    /** 修改回调 */
    onChange?: (v: Moment | null) => void;

    rules?: any;
    /** 尺寸 */
    size?: Size;
    /** 输入和展示的字符串格式，为数组时，第一个 */
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
        };
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

export const displayToFormatAndTimeMode = (display: MonthProps['display']): [string[]] => {
    let format = 'YYYY-MM';
    if (display) {
        if (display.date && display.date.format) {
            format = display.date.format;
        }
    }
    return [[format, formatToShort(format)]];
};

const Month = (props: MonthProps) => {
    const [inputProps, containerProps, popoverProps, popupProps, calendarProps, , footerProps, { error }] = usePicker<
        MonthProps['display']
    >(props, displayToFormatAndTimeMode, 'month');
    const popoverContainerProps = usePopoverContainer();

    return (
        <PickerContainer isMonth {...containerProps}>
            <Popover
                {...popoverProps}
                {...popoverContainerProps}
                popup={
                    <SPopup {...popupProps}>
                        <Calendar.Month {...calendarProps} />
                        {error && (
                            <Notice styleType="error" closable={false}>
                                {error}
                            </Notice>
                        )}
                        <Footer {...footerProps} />
                    </SPopup>
                }
            >
                <Input {...inputProps} prefix={<PickerIcon type="calendar" color="blue" />} />
            </Popover>
        </PickerContainer>
    );
};

export default React.memo(Month);
