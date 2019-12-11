import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { IconWrap, prefixCls } from './style';

/** 图标控件 */
export default class Icon extends PureComponent {
    static propTypes = {
        /** 图标类型 */
        type: PropTypes.string.isRequired,
        /** 是否旋转 */
        spin: PropTypes.bool,
        /** 自定义 icon 类名前缀，使用自定义图标库时使用 */
        prefix: PropTypes.string,
        /** @ignore */
        className: PropTypes.string
    };
    static defaultProps = {
        prefix: 'icon__'
    };
    render() {
        const { type, spin, className, prefix, ...rest } = this.props;
        return (
            <IconWrap
                className={classnames(prefixCls, `${prefix}${type}`, spin && `${prefixCls}-spin`, className)}
                spin={spin}
                {...rest}
            />
        );
    }
}
