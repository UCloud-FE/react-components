import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import NumberInput from 'src/components/NumberInput';
import Calendar from 'src/components/Calendar/Calendar';
import placements from 'src/components/Popover/placements';
import uncontrolledDecorator from 'src/decorators/uncontrolled';
import { animationPrefixCls } from 'src/style/globalAnimation';
import { Consumer } from 'src/components/Popover/ContainerContext';

import { isDateDisabled, getValidDate } from './utils';
import {
    pickerPrefixCls,
    PickerWrap,
    PickerContainer,
    DateWrap,
    DateSpan,
    PickerIcon,
    TimeWrap,
    TimeSeparator
} from './style';

export const Size = ['sm', 'md', 'lg'];

@uncontrolledDecorator({})
class DatePicker extends Component {
    static propTypes = {
        /** 当前值，受控 */
        value: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        /** 默认值，非受控 */
        defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        /** 修改回调，返回moment对象 */
        onChange: PropTypes.func,
        /** 自定义规则，参考Calendar */
        rules: PropTypes.object,
        /** 控件尺寸 */
        size: PropTypes.oneOf(Size),
        /** 展示格式 */
        display: PropTypes.shape({
            date: PropTypes.shape({
                format: PropTypes.string,
                display: PropTypes.bool
            }),
            hour: PropTypes.bool,
            minute: PropTypes.bool,
            second: PropTypes.bool
        }),
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 弹出层的z-index */
        zIndex: PropTypes.number,
        /** 弹出层容器，参考popover.getPopupContainer */
        getCalendarContainer: PropTypes.func
    };
    static defaultProps = {
        onChange: () => {},
        size: 'md',
        zIndex: 100
    };
    handleChange = value => {
        const { onChange, rules } = this.props;

        if (isDateDisabled(value, this.props.value, rules)) {
            return;
        }
        value = getValidDate(value, rules);

        onChange(value);
    };
    renderTimePicker = (value, display) => {
        const { size, disabled } = this.props;
        const { hour, minute, second } = display;
        const picker = [];
        if (hour !== false) {
            picker.push(
                <NumberInput
                    size={size}
                    disabled={disabled}
                    key="hour-input"
                    value={value.hour()}
                    styleType="pagination"
                    hideHandler
                    onNumberChange={hour => this.handleChange(moment(value).set('hour', hour))}
                />
            );
        }
        if (minute !== false) {
            if (picker.length) {
                picker.push(<TimeSeparator key="separator-1">:</TimeSeparator>);
            }
            picker.push(
                <NumberInput
                    size={size}
                    disabled={disabled}
                    key="minute-input"
                    value={value.minute()}
                    styleType="pagination"
                    hideHandler
                    onNumberChange={minute => this.handleChange(moment(value).set('minute', minute))}
                />
            );
        }
        if (second !== false) {
            if (picker.length) {
                picker.push(<TimeSeparator key="separator-2">:</TimeSeparator>);
            }
            picker.push(
                <NumberInput
                    size={size}
                    disabled={disabled}
                    key="second-input"
                    value={value.second()}
                    styleType="pagination"
                    hideHandler
                    onNumberChange={second => this.handleChange(moment(value).set('second', second))}
                />
            );
        }
        return <TimeWrap>{picker}</TimeWrap>;
    };
    render() {
        const {
            rules,
            value: _v,
            // eslint-disable-next-line no-unused-vars
            defaultValue,
            display = {},
            size,
            onChange,
            zIndex,
            getCalendarContainer,
            ...rest
        } = this.props;
        const { date = {} } = display;
        const value = moment(_v);

        return (
            <Consumer>
                {({ getPopupContainer } = {}) => (
                    <PickerContainer {...rest}>
                        {date.show !== false && (
                            <PickerWrap
                                prefixCls={pickerPrefixCls}
                                transitionName={`${animationPrefixCls}-fade`}
                                calendar={<Calendar rules={rules} />}
                                getCalendarContainer={
                                    getCalendarContainer || getPopupContainer || (triggerNode => triggerNode.parentNode)
                                }
                                value={value}
                                align={placements.bottomLeft}
                                onChange={onChange}
                                zIndex={zIndex}
                            >
                                {({ value }) => {
                                    return (
                                        <DateWrap size={size}>
                                            <DateSpan>{value.format(date.format || 'YYYY-MM-DD')}</DateSpan>
                                            <PickerIcon type="calendar" color="blue" />
                                        </DateWrap>
                                    );
                                }}
                            </PickerWrap>
                        )}
                        {this.renderTimePicker(value, display)}
                    </PickerContainer>
                )}
            </Consumer>
        );
    }
}

export default DatePicker;

DatePicker.Size = Size;
