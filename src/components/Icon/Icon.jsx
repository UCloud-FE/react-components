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
        /** @ignore */
        className: PropTypes.string
    };
    render() {
        const { type, spin, className, ...rest } = this.props;
        return (
            <IconWrap
                className={classnames(prefixCls, `icon__${type}`, spin && `${prefixCls}-spin`, className)}
                spin={spin}
                {...rest}
            />
        );
    }
}
