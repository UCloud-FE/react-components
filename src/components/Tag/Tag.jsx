import React, { Component } from 'react';
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

class Tag extends Component {
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
        disabled: PropTypes.bool
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
                    <CloseIconWrapper onClick={!disabled && onClose}>
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
