import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';

import itemDecorator from 'decorators/selectableWithStore/item';
import uncontrolledDecorator from 'decorators/uncontrolled';

import { CheckboxWrap, CheckboxIcon } from './style';

const Size = ['sm', 'md', 'lg'];

export const StoreContext = createReactContext();
export const CheckboxContext = createReactContext();

@uncontrolledDecorator({ valueName: 'checked' })
@itemDecorator({ StoreContext })
class Checkbox extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        className: PropTypes.string,
        /** 是否选中 */
        checked: PropTypes.bool,
        /** 默认是否选中 */
        defaultChecked: PropTypes.bool,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 点选时的回调 */
        onChange: PropTypes.func,
        /** @ignore */
        onClick: PropTypes.func,
        /** checkbox的值 */
        value: PropTypes.any,
        /** 尺寸 */
        size: PropTypes.oneOf(Size),
        /** @ignore */
        multiple: PropTypes.bool
    };
    static defaultProps = {
        onChange: () => {},
        onClick: () => {}
    };
    onClick = e => {
        const { onChange, onClick, checked, disabled } = this.props;

        if (disabled) return;
        onClick(e);
        onChange(!checked);
    };
    render() {
        return (
            <CheckboxContext.Consumer>
                {context => {
                    const props = {
                        size: 'md',
                        ...context,
                        ...this.props
                    };
                    /* eslint-disable no-unused-vars */
                    const {
                        children,
                        checked,
                        defaultChecked,
                        disabled,
                        onChange,
                        onClick,
                        value,
                        size,
                        multiple,
                        ...rest
                    } = props;
                    /* eslint-enable no-unused-vars */
                    return (
                        <CheckboxWrap
                            checked={checked}
                            disabled={disabled}
                            size={size}
                            onClick={this.onClick}
                            {...rest}
                        >
                            <CheckboxIcon disabled={disabled} type={checked ? 'checkbox-ed' : 'checkbox'} />
                            {children}
                        </CheckboxWrap>
                    );
                }}
            </CheckboxContext.Consumer>
        );
    }
}
Checkbox.Size = Size;
export default Checkbox;
