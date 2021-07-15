import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import storeDecorator from 'src/decorators/selectableWithStore/store';
import uncontrolledDecorator from 'src/decorators/uncontrolled';

import Radio, { StoreContext, RadioContext } from './Radio';
import { RadioGroupWrap } from './style';

@uncontrolledDecorator({})
@storeDecorator({
    StoreContext,
    getValue: v => (v === undefined ? [] : [v]),
    setValue: v => v[0]
})
class Group extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** 当前值，controlled */
        value: PropTypes.any,
        /** 默认值，uncontrolled */
        defaultValue: PropTypes.any,
        /** 修改时的回调 */
        onChange: PropTypes.func,
        /** 快速选项 */
        options: PropTypes.array,
        /** 禁用 */
        disabled: PropTypes.bool,
        /** 尺寸 */
        size: PropTypes.oneOf(Radio.Size),
        /** 样式风格 */
        styleType: PropTypes.oneOf(Radio.StyleType),
        /** @ignore */
        selectable: PropTypes.bool,
        /** @ignore */
        multiple: PropTypes.bool
    };
    static defaultProps = {
        onChange: () => {},
        multiple: false,
        selectable: true
    };
    renderOptions = () => {
        const { options, children } = this.props;
        if (options) {
            return options.map(option => {
                const { label, ...restOptionProps } = option;
                return (
                    <Radio key={option.value} {...restOptionProps}>
                        {label !== undefined ? label : option.value}
                    </Radio>
                );
            });
        } else {
            return children;
        }
    };
    render() {
        /* eslint-disable no-unused-vars */
        const {
            value,
            defaultValue,
            onChange,
            options,
            children,
            disabled,
            size,
            styleType,
            selectable,
            multiple,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        return (
            <RadioContext.Provider value={{ ..._.pick(this.props, ['disabled', 'size', 'styleType']) }}>
                <RadioGroupWrap {...rest}>{this.renderOptions()}</RadioGroupWrap>
            </RadioContext.Provider>
        );
    }
}

export default Group;
