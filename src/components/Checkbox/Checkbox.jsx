import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';

import itemDecorator from 'src/decorators/selectableWithStore/item';
import uncontrolledDecorator from 'src/decorators/uncontrolled';

import { CheckboxWrap, CheckboxIcon, CheckboxCardWrap } from './style';

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
    onClick = e => {
        const { onChange, onClick, checked, disabled } = this.props;

        if (disabled) return;
        onClick(e);
        onChange(!checked);
    };
    renderCheckbox(props) {
        /* eslint-disable no-unused-vars */
        const { checked, disabled, children, title, disabledLabel, ...rest } = props; /* eslint-enable no-unused-vars */
        /* eslint-enable no-unused-vars */

        return (
            <CheckboxWrap checked={checked} disabled={disabled} {...rest} onClick={this.onClick}>
                <CheckboxIcon disabled={disabled} type={checked ? 'checkbox-ed' : 'checkbox'} />
                {children}
            </CheckboxWrap>
        );
    }
    renderCheckboxCard(props) {
        return <CheckboxCardWrap {...props} onClick={this.onClick} multiple />;
    }
    render() {
        return (
            <CheckboxContext.Consumer>
                {context => {
                    /* eslint-disable no-unused-vars */
                    const { defaultChecked, onChange, onClick, value, multiple, ...restProps } = this.props;
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
