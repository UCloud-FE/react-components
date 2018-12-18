import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';

import itemDecorator from 'decorators/selectableWithStore/item';
import uncontrolledDecorator from 'decorators/uncontrolled';
import { RadioWrap, RadioIcon, RadioButtonWrap, RadioTagWrap } from 'components/Radio/style';

export const StoreContext = createReactContext();
export const RadioContext = createReactContext();

const Size = ['sm', 'md', 'lg'];
const StyleType = ['default', 'button', 'tag'];

@uncontrolledDecorator({ valueName: 'checked' })
@itemDecorator({ StoreContext })
class Radio extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
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
        /** radio的值 */
        value: PropTypes.any,
        /** 样式风格 */
        styleType: PropTypes.oneOf(StyleType),
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
        const { onChange, onClick, disabled, checked } = this.props;

        if (disabled) return;

        onClick(e);

        if (!checked) onChange(true);
    };
    renderRadio(props) {
        /* eslint-disable no-unused-vars */
        const {
            children,
            checked,
            defaultChecked,
            value,
            onChange,
            onClick,
            multiple,
            styleType,
            disabled,
            ...rest
        } = props;
        /* eslint-enable no-unused-vars */

        return (
            <RadioWrap checked={checked} disabled={disabled} {...rest} onClick={this.onClick}>
                <RadioIcon type={checked ? 'cbox-ed' : 'circle'} disabled={disabled} />
                {children}
            </RadioWrap>
        );
    }
    renderRadioButton(props) {
        /* eslint-disable no-unused-vars */
        const { defaultChecked, value, onChange, onClick, multiple, styleType, ...rest } = props;
        /* eslint-enable no-unused-vars */

        return <RadioButtonWrap {...rest} onClick={this.onClick} />;
    }
    renderRadioTag(props) {
        /* eslint-disable no-unused-vars */
        const { defaultChecked, value, onChange, onClick, multiple, styleType, ...rest } = props;
        /* eslint-enable no-unused-vars */

        return <RadioTagWrap {...rest} onClick={this.onClick} />;
    }
    render() {
        return (
            <RadioContext.Consumer>
                {context => {
                    const props = {
                        size: 'md',
                        styleType: 'default',
                        ...context,
                        ...this.props
                    };

                    const { styleType } = props;
                    if (styleType === 'button') {
                        return this.renderRadioButton(props);
                    } else if (styleType === 'tag') {
                        return this.renderRadioTag(props);
                    } else {
                        return this.renderRadio(props);
                    }
                }}
            </RadioContext.Consumer>
        );
    }
}

Radio.Size = Size;
Radio.StyleType = StyleType;

export default Radio;
