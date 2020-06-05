import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconTagWrapper, IconTag } from './style';
import { StyleType } from './Tag';

class Icon extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /**
         * 自定义 icon
         */
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        /**
         * 样式风格
         */
        styleType: PropTypes.oneOf(StyleType)
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { children, icon, ...rest } = this.props;
        return <IconTagWrapper {...rest}>{typeof icon === 'string' ? <IconTag type={icon} /> : icon}</IconTagWrapper>;
    }
}

export default Icon;
