import React, { createRef, forwardRef, memo, useEffect, useImperativeHandle, Ref, ReactNode } from 'react';

import Popover from 'src/components/Popover';
import Input from 'src/components/Input';
import Calendar from 'src/components/Calendar';
import Notice from 'src/components/Notice';
import Time from 'src/components/TimePicker/Time';
import SvgIcon from 'src/components/SvgIcon';
import usePopoverConfig from 'src/hooks/usePopoverConfig';

import { DatePickerProps, displayToFormatAndTimeMode } from './DatePicker';
import { displayToFormatAndTimeMode as displayToFormatAndTimeModeM } from './Month';
import { SPopup, readonlyInputCls, RangeInputWrap } from './style';
import usePicker from './usePicker';
import Footer from './Footer';

export type RangePickerRef = { focus: () => void } | undefined;

const RangePickerWithoutMemo = forwardRef(
    (
        {
            prefix,
            onActiveChange,
            type = 'date',
            readonly,
            tip,
            error,
            footerTip,
            suffix,
            ...pickProps
        }: DatePickerProps & {
            prefix?: boolean;
            onActiveChange: (active: boolean) => void;
            type?: 'date' | 'month';
            readonly?: boolean;
            tip?: ReactNode;
            error?: ReactNode;
            footerTip?: ReactNode;
            suffix?: ReactNode;
        },
        ref: Ref<RangePickerRef>
    ) => {
        const isMonth = type === 'month';
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
                ...pickProps
            },
            isMonth ? displayToFormatAndTimeModeM : displayToFormatAndTimeMode,
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
        const popoverConfigProps = usePopoverConfig();

        const hasTime = !!timeProps.mode?.length;

        const CalendarComp = isMonth ? Calendar.Month : Calendar;

        return readonly ? (
            <span className={readonlyInputCls}>{inputProps.value}</span>
        ) : (
            <RangeInputWrap
                isMonth={isMonth}
                hasTime={hasTime}
                hasPrefix={prefix}
                hasSuffix={!!suffix}
                disabled={inputProps.disabled}
                status={inputProps.status}
            >
                <Popover
                    popup={
                        <SPopup {...popupProps}>
                            <CalendarComp
                                {...calendarProps}
                                sidebar={isMonth ? null : hasTime ? <Time {...timeProps} /> : null}
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
                            <Footer {...footerProps} tip={footerTip} />
                        </SPopup>
                    }
                    {...popoverConfigProps}
                    {...popoverProps}
                >
                    <Input
                        {...inputProps}
                        customStyle={{ border: 'none', boxShadow: 'none', background: 'none' }}
                        ref={inputRef}
                        block
                        prefix={prefix ? <SvgIcon type="calendar" /> : null}
                        suffix={suffix}
                    />
                </Popover>
            </RangeInputWrap>
        );
    }
);

export default memo(RangePickerWithoutMemo);
