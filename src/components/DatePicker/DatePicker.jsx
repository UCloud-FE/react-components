import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import NumberInput from 'components/NumberInput';
import Calendar from 'components/Calendar/Calendar';
import placements from 'components/Popover/placements';
import uncontrolledDecorator from 'decorators/uncontrolled';
import { animationPrefixCls } from 'src/style/globalAnimation';

import { isDateDisabled, getValidDate } from './utils';
import {
    prefixCls,
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
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.state.cache = this.state.value;
    }
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
        zIndex: PropTypes.number
    };
    static defaultProps = {
        defaultValue: moment(),
        onChange: () => {},
        size: 'md',
        zIndex: 100
    };
    componentWillReceiveProps = nextProps => {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    };
    handleChange = value => {
        const { onChange, rules } = this.props;

        if (isDateDisabled(value, this.state.value, rules)) {
            return;
        }
        value = getValidDate(value, rules);

        if (!('value' in this.props)) {
            this.setState({
                value
            });
        }
        this.setState({
            cache: value
        });
        onChange(value);
    };
    handleCache = value => {
        this.setState({
            cache: value
        });
    };
    togglePopup = visible => {
        this.setState({
            visible: visible
        });
        if (!visible) {
            this.setState({
                cache: this.state.value
            });
        }
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
        // eslint-disable-next-line no-unused-vars
        const { rules, value: _v, defaultValue, display = {}, size, onChange, zIndex, ...rest } = this.props;
        const { date = {} } = display;
        const value = moment(_v);

        return (
            <PickerContainer {...rest}>
                {date.show !== false && (
                    <PickerWrap
                        prefixCls={prefixCls}
                        transitionName={`${animationPrefixCls}-fade`}
                        calendar={<Calendar rules={rules} />}
                        getCalendarContainer={triggerNode => triggerNode.parentNode}
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
        );
    }
}

export default DatePicker;

DatePicker.Size = Size;
