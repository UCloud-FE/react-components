import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'src/components/SvgIcon';
import {
    TagWrapper,
    CloseIcon,
    CloseIconWrapper,
    ContentWrapper,
    PrefixIcon,
    SvgIconWrapper,
    PrefixIconWrapper,
    SuffixIconWrapper,
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
         * icon 大小
         */
        iconSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
        /**
         * 是否开启border样式
         */
        border: PropTypes.bool,
        /**
         * border 类型
         */
        borderType: PropTypes.oneOf(['default', 'circle', 'corner']),

        /**
         * 后缀
         */
        suffix: PropTypes.node,
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
        styleType: 'default',
        borderType: 'default',
        iconSize: 'sm',
        border: true
    };
    render() {
        const {
            children,
            styleType,
            closable,
            icon,
            disabled,
            onClose,
            iconSize,
            border,
            borderType,
            suffix,

            ...rest
        } = this.props;
        return (
            <TagWrapper
                styleType={styleType}
                disabled={disabled}
                border={border}
                borderType={borderType}
                closable={closable}
                {...rest}
            >
                {icon && (
                    <PrefixIconWrapper>
                        {typeof icon === 'string' ? (
                            icon === 'loading' ? (
                                <SvgIconWrapper size={iconSize}>
                                    <SvgIcon type="loading-line" spin />{' '}
                                </SvgIconWrapper>
                            ) : (
                                <PrefixIcon type={icon} size={iconSize} />
                            )
                        ) : (
                            icon
                        )}
                    </PrefixIconWrapper>
                )}
                <ContentWrapper>{children}</ContentWrapper>
                {suffix && <SuffixIconWrapper>{suffix}</SuffixIconWrapper>}
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
