import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';

import itemDecorator from 'decorators/selectableWithStore/item';
import uncontrolledDecorator from 'decorators/uncontrolled';
import { RadioWrap, RadioIcon, RadioButtonWrap, RadioTagWrap } from 'components/Radio/style';
import Card from './Card';

export const StoreContext = createReactContext();
export const RadioContext = createReactContext();

const Size = ['sm', 'md', 'lg'];
const StyleType = ['default', 'button', 'tag', 'card'];

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
        /** 尺寸，styleType为card时无效 */
        size: PropTypes.oneOf(Size),
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
            disabled,
            title,
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
        const { title, disabledLabel, ...rest } = props;
        /* eslint-enable no-unused-vars */

        return <RadioButtonWrap {...rest} onClick={this.onClick} />;
    }
    renderRadioTag(props) {
        /* eslint-disable no-unused-vars */
        const { title, disabledLabel, ...rest } = props;
        /* eslint-enable no-unused-vars */

        return <RadioTagWrap {...rest} onClick={this.onClick} />;
    }
    renderRadioCard(props) {
        return <Card {...props} onClick={this.onClick} />;
    }
    render() {
        return (
            <RadioContext.Consumer>
                {context => {
                    /* eslint-disable no-unused-vars */
                    const { defaultChecked, value, onChange, onClick, multiple, ...restProps } = this.props;
                    /* eslint-enable no-unused-vars */
                    const props = {
                        size: 'md',
                        styleType: 'default',
                        ...context,
                        ...restProps
                    };

                    const { styleType } = props;
                    switch (styleType) {
                        case 'button':
                            return this.renderRadioButton(props);
                        case 'tag':
                            return this.renderRadioTag(props);
                        case 'card':
                            return this.renderRadioCard(props);
                        default:
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
