import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { IconTagWrapper, IconTag } from './style';
import { StyleType } from './Tag';

class Icon extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /**
         * 自定义 icon
         */
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        /** 同 Icon 组件 prefix */
        prefix: PropTypes.string,
        /**
         * 样式风格
         */
        styleType: PropTypes.oneOf(StyleType),
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
        borderType: PropTypes.oneOf(['default', 'circle']),
        /**
         * 自定义样式
         */
        customStyle: PropTypes.shape({
            /** 字色/图标色 */
            color: PropTypes.string,
            /** 边框色 */
            borderColor: PropTypes.string,
            /** 背景色 */
            background: PropTypes.string
        })
    };
    static defaultProps = {
        borderType: 'default',
        iconSize: 'sm',
        border: true
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { children, icon, prefix, borderType, iconSize, border, ...rest } = this.props;
        return (
            <IconTagWrapper borderType={borderType} iconSize={iconSize} border={border} {...rest}>
                {typeof icon === 'string' ? <IconTag type={icon} prefix={prefix} /> : icon}
            </IconTagWrapper>
        );
    }
}

export default Icon;
