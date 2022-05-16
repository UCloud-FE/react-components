import React, { createRef, forwardRef, memo, useEffect, useImperativeHandle, Ref, ReactNode } from 'react';
import { TDate } from '@z-r/calendar';

import Popover from 'src/components/Popover';
import Input from 'src/components/Input';
import Calendar, { TwoSide } from 'src/components/Calendar';
import Time from 'src/components/TimePicker/Time';
import SvgIcon from 'src/components/SvgIcon';

import { DatePickerProps, displayToFormatAndTimeMode } from './DatePicker';
import { displayToFormatAndTimeMode as displayToFormatAndTimeModeM } from './Month';
import { SPopup, readonlyInputCls, RangeInputWrap, errorTipCls, tipCls, tipIconCls } from './style';
import usePicker from './usePicker';
import Footer from './Footer';

export type RangePickerRef = { focus: () => void; clear: () => void } | undefined;

export const TipIcon = React.memo(function TipIcon() {
    return <SvgIcon type="exclamation-circle-filled" className={tipIconCls} />;
});

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
            rangeValue,
            isFirst,
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
            rangeValue?: [TDate | null, TDate | null];
            isFirst?: boolean;
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
            { error: pickerError, active },
            { clear }
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
                    focus: () => inputRef?.current?.focus(),
                    clear: clear
                };
            },
            [clear, inputRef]
        );
        useEffect(() => {
            onActiveChange(active);
        }, [active, onActiveChange]);

        const hasTime = !!timeProps.mode?.length;

        const CalendarComp = isMonth ? Calendar.Month : hasTime ? Calendar : TwoSide;

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
                                rangeValue={
                                    isFirst
                                        ? [calendarProps.value, rangeValue?.[1]]
                                        : [rangeValue?.[0], calendarProps.value]
                                }
                                value={null}
                                sidebar={isMonth ? null : hasTime ? <Time {...timeProps} /> : null}
                            />
                            {pickerError && (
                                <div className={errorTipCls}>
                                    <TipIcon />
                                    {pickerError}
                                </div>
                            )}
                            {error && (
                                <div className={errorTipCls}>
                                    <TipIcon />
                                    {error}
                                </div>
                            )}
                            {tip && (
                                <div className={tipCls}>
                                    <TipIcon />
                                    {tip}
                                </div>
                            )}
                            <Footer {...footerProps} tip={footerTip} />
                        </SPopup>
                    }
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
