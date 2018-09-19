import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ItemWrapA, ItemWrapSpan } from './style';

export default class Item extends Component {
    static propTypes = {
        /** 禁用 */
        disabled: PropTypes.bool,
        /** 标明当前路由 */
        current: PropTypes.bool,
        /** @ignore */
        className: PropTypes.string
    };
    static __IS_BREADCRUMB_ITEM = true;
    render() {
        const { ...rest } = this.props;
        return 'href' in this.props ? <ItemWrapA {...rest} /> : <ItemWrapSpan {...rest} />;
    }
}
