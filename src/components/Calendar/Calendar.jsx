import React, { Component } from 'react';
import PropTypes from 'prop-types';

import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';

import { isDateDisabled, getValidDate } from './utils';
import { CalendarWrap, prefixCls } from './style';
import LOCALE from './locale/zh_CN';

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Calendar', publicFn: ['focus'] })
class Calendar extends Component {
    static propTypes = {
        /** 选中的时间，受控，Moment 类型 */
        value: PropTypes.object,
        /** 默认选中的时间，非受控，Moment 类型  */
        defaultValue: PropTypes.object,
        /** 实际选中时间修改的回调 */
        onSelect: PropTypes.func,
        /** 变化时的回调，键盘操作快速切换等操作时触发 */
        onChange: PropTypes.func,
        /** 自定义规则 */
        rules: PropTypes.shape({
            /** 可选时间范围，格式为[start, end]，数据格式可以为moment实例、Date实例、时间戳 */
            range: PropTypes.array,
            /**
             * 自定义禁用日期函数，返回true时该日期不可选
             * @param current - 日期
             * @param value - 日历当前选中值
             */
            custom: PropTypes.func
        })
    };
    static defaultProps = {};
    onSelect = value => {
        const { rules, onSelect } = this.props;
        value = getValidDate(value, rules);
        if (onSelect) {
            onSelect(value);
        }
    };
    focus = () => {
        this.calendar && this.calendar.focus();
    };
    render() {
        /* eslint-disable-next-line no-unused-vars */
        const { rules = {}, onSelect, ...rest } = this.props;

        return (
            <CalendarWrap
                innerRef={ref => (this.calendar = ref)}
                onSelect={this.onSelect}
                {...calCalendarProps({ rules })}
                {...rest}
            />
        );
    }
}

const calCalendarProps = ({ rules }) => {
    return {
        prefixCls: prefixCls,
        showDateInput: false,
        showToday: false,
        disabledDate: (date, currentValue) => {
            return isDateDisabled(date, currentValue, rules);
        }
    };
};

export default Calendar;

export { calCalendarProps };
