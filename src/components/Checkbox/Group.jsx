import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import storeDecorator from 'src/decorators/selectableWithStore/store';
import uncontrolledDecorator from 'src/decorators/uncontrolled';

import Checkbox, { StoreContext, CheckboxContext } from './Checkbox';
import { CheckboxGroupWrap } from './style';

@uncontrolledDecorator({ valueName: 'value' })
@storeDecorator({ StoreContext })
class Group extends Component {
    static propTypes = {
        /** 当前值，controlled */
        value: PropTypes.array,
        /** 默认值，uncontrolled */
        defaultValue: PropTypes.array,
        /** 修改时的回调 */
        onChange: PropTypes.func,
        /** 快速定义选项 */
        options: PropTypes.array,
        /** 禁用 */
        disabled: PropTypes.bool,
        /** 尺寸 */
        size: PropTypes.oneOf(Checkbox.Size),
        /** 样式风格 */
        styleType: PropTypes.oneOf(Checkbox.StyleType),
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        selectable: PropTypes.bool,
        /** @ignore */
        multiple: PropTypes.bool
    };
    static defaultProps = {
        defaultValue: [],
        onChange: () => {},
        multiple: true,
        selectable: true
    };
    renderOptions = () => {
        const { options, children } = this.props;
        if (options) {
            return options.map(option => {
                const { label, ...restOptionProps } = option;
                return (
                    <Checkbox key={option.value} {...restOptionProps}>
                        {label !== undefined ? label : option.value}
                    </Checkbox>
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
            selectable,
            multiple,
            disabled,
            size,
            styleType,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        return (
            <CheckboxContext.Provider value={{ ..._.pick(this.props, ['disabled', 'size', 'styleType']) }}>
                <CheckboxGroupWrap {...rest}>{this.renderOptions()}</CheckboxGroupWrap>
            </CheckboxContext.Provider>
        );
    }
}
export default Group;
