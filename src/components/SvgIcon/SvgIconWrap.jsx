import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { SvgIconWrapper } from './style';

class SvgIconWrap extends PureComponent {
    static propTypes = {
        /** 图标颜色，值为 css color 支持属性值 */
        color: PropTypes.string,
        /** 是否旋转 */
        spin: PropTypes.bool,
        /** 图标的尺寸大小 */
        size: PropTypes.string,
        /** icon */
        children: PropTypes.node
    };
    static defaultProps = {
        size: '12px'
    };
    render() {
        const { children, ...rest } = this.props;
        return (
            <SvgIconWrapper {...rest} viewBox="0 0 24 24">
                {children}
            </SvgIconWrapper>
        );
    }
}

export default SvgIconWrap;
