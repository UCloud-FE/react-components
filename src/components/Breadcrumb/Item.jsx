import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ItemWrapA, ItemWrapSpan } from './style';

export default class Item extends Component {
    static propTypes = {
        /**
         * @ignore
         * 禁用
         */
        disabled: PropTypes.bool,
        /** 标明当前路由 */
        current: PropTypes.bool,
        /** 标明节点无点击跳转事件 */
        noAction: PropTypes.bool,
        /** @ignore */
        className: PropTypes.string
    };
    static __IS_BREADCRUMB_ITEM = true;
    render() {
        const { ...rest } = this.props;
        const ItemWrap = 'href' in this.props ? ItemWrapA : ItemWrapSpan;
        return <ItemWrap {...rest} />;
    }
}
