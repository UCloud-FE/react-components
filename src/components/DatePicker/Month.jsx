import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MonthCalendar from 'src/components/Calendar/Month';
import placements from 'src/components/Popover/placements';
import uncontrolledDecorator from 'src/decorators/uncontrolled';
import { animationPrefixCls } from 'src/style/globalAnimation';
import { Consumer } from 'src/components/Popover/ContainerContext';

import { monthPickerPrefixCls, PickerWrap, PickerContainer, DateWrap, DateSpan, PickerIcon } from './style';
import { Size } from './DatePicker';

@uncontrolledDecorator({})
class Month extends Component {
    static propTypes = {
        /** 当前值，受控 */
        value: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        /** 默认值，非受控 */
        defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        /** 修改回调，返回moment对象 */
        onChange: PropTypes.func,
        /** 自定义规则，参考Calendar */
        rules: PropTypes.object,
        /** 展示格式 */
        display: PropTypes.shape({
            date: PropTypes.shape({
                format: PropTypes.string
            })
        }),
        /** 控件尺寸 */
        size: PropTypes.oneOf(Size),
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
    render() {
        const {
            rules,
            value: _v,
            // eslint-disable-next-line no-unused-vars
            defaultValue,
            size,
            display = {},
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
                    <PickerContainer isMonth {...rest}>
                        <PickerWrap
                            prefixCls={monthPickerPrefixCls}
                            transitionName={`${animationPrefixCls}-fade`}
                            calendar={<MonthCalendar rules={rules} />}
                            getCalendarContainer={
                                getCalendarContainer || getPopupContainer || (triggerNode => triggerNode.parentNode)
                            }
                            value={value}
                            align={placements.bottomLeft}
                            onChange={onChange}
                            zIndex={zIndex}
                            isMonth
                        >
                            {({ value }) => {
                                return (
                                    <DateWrap size={size}>
                                        <DateSpan>{value.format(date.format || 'YYYY-MM')}</DateSpan>
                                        <PickerIcon type="calendar" color="blue" />
                                    </DateWrap>
                                );
                            }}
                        </PickerWrap>
                    </PickerContainer>
                )}
            </Consumer>
        );
    }
}

export default Month;
