import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { hoverDisplayAreaCls } from './style';

export default class HoverDisplayArea extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        className: PropTypes.string
    };
    render() {
        const { children, className } = this.props;
        return <div className={classnames(hoverDisplayAreaCls, className)}>{children}</div>;
    }
}
