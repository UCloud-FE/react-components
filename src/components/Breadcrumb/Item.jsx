import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ItemSpan, ItemA } from './style';

export default class Item extends Component {
    static propTypes = {
        /**
         * 禁用
         */
        disabled: PropTypes.bool,
        /** 标明当前路由 */
        current: PropTypes.bool,
        /** 标明节点无点击跳转事件 */
        noAction: PropTypes.bool,
        /** 点击事件 */
        onClick: PropTypes.func,
        /** @ignore */
        className: PropTypes.string
    };
    static __IS_BREADCRUMB_ITEM = true;
    render() {
        // eslint-disable-next-line no-unused-vars
        const { onClick, ...rest } = this.props;
        const props = this.props.disabled ? rest : this.props;
        return 'href' in this.props ? <ItemA {...props} /> : <ItemSpan {...props} />;
    }
}
