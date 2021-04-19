import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
    TagWrapper,
    CloseIcon,
    CloseIconWrapper,
    ContentWrapper,
    PrefixIcon,
    PrefixIconWrapper,
    styleMap
} from './style';

const StyleType = Object.keys(styleMap);

class Tag extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /**
         * 样式风格
         */
        styleType: PropTypes.oneOf(StyleType),
        /**
         * 是否显示关闭按钮
         */
        closable: PropTypes.bool,
        /**
         * 关闭回调
         */
        onClose: PropTypes.func,
        /**
         * 自定义前置 icon
         */
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        /**
         * 是否禁用
         */
        disabled: PropTypes.bool,
        /**
         * 自定义样式
         */
        customStyle: PropTypes.shape({
            /** 字色/图标色 */
            color: PropTypes.string,
            /** 边框色 */
            borderColor: PropTypes.string,
            /** 背景色 */
            background: PropTypes.string,
            /** 关闭按钮 hover 背景色 */
            closeIconHoverBackground: PropTypes.string
        })
    };
    static defaultProps = {
        styleType: 'default'
    };
    render() {
        const { children, styleType, closable, icon, disabled, onClose, ...rest } = this.props;
        return (
            <TagWrapper styleType={styleType} disabled={disabled} {...rest}>
                {icon && (
                    <PrefixIconWrapper>
                        {typeof icon === 'string' ? <PrefixIcon type={icon} /> : icon}
                    </PrefixIconWrapper>
                )}
                <ContentWrapper>{children}</ContentWrapper>
                {closable && (
                    <CloseIconWrapper onClick={disabled ? undefined : onClose}>
                        <CloseIcon type="cross" />
                    </CloseIconWrapper>
                )}
            </TagWrapper>
        );
    }
}

export default Tag;

export { StyleType };

Tag.StyleType = StyleType;
