import React, { ReactNode, MutableRefObject, useImperativeHandle } from 'react';

import SvgIcon from 'src/components/SvgIcon';
import Time from 'src/components/TimePicker/Time';

import { DatePickerProps, displayToFormatAndTimeMode } from './DatePicker';
import { displayToFormatAndTimeMode as displayToFormatAndTimeModeM } from './Month';
import usePicker from './usePicker';

export type RangeActionRef = { clear: () => void };
export type RangePickerRef = { focus: () => void; clear: () => void } | undefined;

const inputCustomStyle = { border: 'none', boxShadow: 'none', background: 'none' };

const useRangePicker = ({
    prefix,
    type = 'date',
    suffix,
    actionRef,
    ...pickProps
}: DatePickerProps & {
    prefix?: boolean;
    type?: 'date' | 'month';
    suffix?: ReactNode;
    actionRef: MutableRefObject<RangeActionRef | undefined>;
}) => {
    const isMonth = type === 'month';
    const [inputProps, , popoverProps, popupProps, calendarProps, timeProps, footerProps, status, actions] = usePicker(
        {
            ...pickProps
        },
        isMonth ? displayToFormatAndTimeModeM : displayToFormatAndTimeMode,
        type
    );

    const hasTime = !!timeProps.mode?.length;
    useImperativeHandle(
        actionRef,
        () => {
            return {
                clear: actions.clear
            };
        },
        [actions.clear]
    );

    return [
        // inputProps
        {
            ...inputProps,
            customStyle: inputCustomStyle,
            block: true,
            prefix: prefix ? <SvgIcon type="calendar" /> : null,
            suffix
        },
        // inputWrapProps
        {
            isMonth,
            hasTime,
            hasPrefix: prefix,
            hasSuffix: !!suffix,
            disabled: inputProps.disabled,
            status: inputProps.status,
            clearable: inputProps.clearable
        },
        // calendarProps
        {
            ...calendarProps,
            sidebar: isMonth ? null : hasTime ? <Time {...timeProps} /> : null
        },
        footerProps,
        status,
        popoverProps,
        // popupProps
        popupProps,
        { hasTime, isMonth }
    ];
};

export default useRangePicker;
