import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';
import classnames from 'classnames';

import itemDecorator from 'src/decorators/selectableWithStore/item';
import uncontrolledDecorator from 'src/decorators/uncontrolled';
import SvgIcon from 'src/components/SvgIcon';

import {
    CheckboxWrap,
    CheckboxCardWrap,
    iconWrapCls,
    iconCls,
    contentCls,
    checkedCls,
    disabledCls,
    prefixCls,
    indeterminateCls
} from './style';

const Size = ['sm', 'md', 'lg'];
const StyleType = ['default', 'card'];

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
        /** 一般用于全选，部分选中的状态 */
        indeterminate: PropTypes.bool,
        /** @ignore */
        onClick: PropTypes.func,
        /** checkbox的值 */
        value: PropTypes.any,
        /** 尺寸，styleType为card时无效 */
        size: PropTypes.oneOf(Size),
        /** 样式风格 */
        styleType: PropTypes.oneOf(StyleType),
        /** 标题，styleType为card时使用 */
        title: PropTypes.node,
        /** 禁用标识，styleType为card时使用 */
        disabledLabel: PropTypes.node,
        /** @ignore */
        multiple: PropTypes.bool
    };
    static defaultProps = {
        onChange: () => {},
        onClick: () => {}
    };
    onClick = (props, e) => {
        const { onChange, onClick, checked, disabled } = props;

        if (disabled) return;
        onClick(e);
        onChange(!checked);
    };
    renderCheckbox(props) {
        /* eslint-disable no-unused-vars */
        const {
            checked,
            disabled,
            children,
            title,
            disabledLabel,
            onChange,
            className,
            indeterminate,
            ...rest
        } = props;
        /* eslint-enable no-unused-vars */

        return (
            <CheckboxWrap
                checked={checked}
                disabled={disabled}
                {...rest}
                className={classnames({
                    [className]: className,
                    [prefixCls]: true,
                    [checkedCls]: checked,
                    [disabledCls]: disabled,
                    [indeterminateCls]: indeterminate
                })}
                onClick={(...args) => this.onClick(props, ...args)}
            >
                <span className={iconWrapCls}>
                    {indeterminate ? (
                        <SvgIcon className={iconCls} type="horz" size="14px" />
                    ) : (
                        <SvgIcon className={iconCls} type="smallTick" size="14px" />
                    )}
                </span>
                {children != null && <span className={contentCls}>{children}</span>}
            </CheckboxWrap>
        );
    }
    renderCheckboxCard(props) {
        /* eslint-disable no-unused-vars */
        const { onChange, ...rest } = props;
        /* eslint-enable no-unused-vars */
        return <CheckboxCardWrap {...rest} onClick={(...args) => this.onClick(props, ...args)} multiple />;
    }
    render() {
        return (
            <CheckboxContext.Consumer>
                {context => {
                    /* eslint-disable no-unused-vars */
                    const { defaultChecked, value, multiple, ...restProps } = this.props;
                    /* eslint-enable no-unused-vars */
                    const props = {
                        size: 'md',
                        ...context,
                        ...restProps
                    };
                    const { styleType, ...rest } = props;
                    switch (styleType) {
                        case 'card':
                            return this.renderCheckboxCard(rest);
                        default:
                            return this.renderCheckbox(rest);
                    }
                }}
            </CheckboxContext.Consumer>
        );
    }
}
Checkbox.Size = Size;
Checkbox.StyleType = StyleType;
export default Checkbox;
