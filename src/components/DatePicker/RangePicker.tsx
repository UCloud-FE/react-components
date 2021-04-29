import React, { createRef, forwardRef, memo, useEffect, useImperativeHandle, Ref, ReactNode } from 'react';

import Popover from 'src/components/Popover';
import Input from 'src/components/Input';
import Calendar from 'src/components/Calendar';
import Notice from 'src/components/Notice';
import Time from 'src/components/TimePicker/Time';
import usePopoverContainer from 'src/hooks/usePopoverContainer';

import { DatePickerProps, displayToFormatAndTimeMode } from './DatePicker';
import { displayToFormatAndTimeMode as displayToFormatAndTimeModeM } from './Month';
import { PickerIcon, SPopup, readonlyInputCls } from './style';
import usePicker from './usePicker';
import Footer from './Footer';

export type RangePickerRef = { focus: () => void } | undefined;

const RangePickerWithoutMemo = forwardRef(
    (
        {
            value,
            onChange,
            rules,
            size,
            format,
            nullable,
            display,
            disabled,
            popoverProps: _popoverProps,
            zIndex,
            prefix,
            onActiveChange,
            type = 'date',
            readonly,
            tip,
            error,
            placeholder
        }: DatePickerProps & {
            prefix?: boolean;
            onActiveChange: (active: boolean) => void;
            type?: 'date' | 'month';
            readonly?: boolean;
            tip?: ReactNode;
            error?: ReactNode;
        },
        ref: Ref<RangePickerRef>
    ) => {
        const [
            inputProps,
            ,
            popoverProps,
            popupProps,
            calendarProps,
            timeProps,
            footerProps,
            { error: pickerError, active }
        ] = usePicker(
            {
                value,
                onChange,
                rules,
                size,
                format,
                nullable,
                display,
                disabled,
                popoverProps: _popoverProps,
                zIndex,
                placeholder
            },
            type === 'month' ? displayToFormatAndTimeModeM : displayToFormatAndTimeMode,
            type
        );

        const inputRef = createRef<HTMLInputElement>();

        useImperativeHandle(
            ref,
            () => {
                return {
                    focus: () => inputRef?.current?.focus()
                };
            },
            [inputRef]
        );
        useEffect(() => {
            onActiveChange(active);
        }, [active, onActiveChange]);
        const popoverContainerProps = usePopoverContainer();

        const CalendarComp = type === 'month' ? Calendar.Month : Calendar;

        return readonly ? (
            <span className={readonlyInputCls}>{inputProps.value}</span>
        ) : (
            <Popover
                {...popoverProps}
                {...popoverContainerProps}
                popup={
                    <SPopup {...popupProps}>
                        <CalendarComp
                            {...calendarProps}
                            sidebar={type === 'month' ? null : timeProps.mode.length ? <Time {...timeProps} /> : null}
                        />
                        {pickerError && (
                            <Notice styleType="error" closable={false}>
                                {pickerError}
                            </Notice>
                        )}
                        {error && (
                            <Notice styleType="error" closable={false}>
                                {error}
                            </Notice>
                        )}
                        {tip && <Notice closable={false}>{tip}</Notice>}
                        <Footer {...footerProps} />
                    </SPopup>
                }
            >
                <Input
                    {...inputProps}
                    prefix={prefix ? <PickerIcon type="calendar" color="blue" /> : null}
                    customStyle={{ border: 'none', boxShadow: 'none', background: 'none' }}
                    ref={inputRef}
                />
            </Popover>
        );
    }
);

export default memo(RangePickerWithoutMemo);
