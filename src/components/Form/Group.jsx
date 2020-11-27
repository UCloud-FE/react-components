import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GroupWrap, GroupTitle } from './style';
import ItemPropsWrap from './ItemPropsWrap';

export default class Group extends Component {
    static propTypes = {
        /** 标题项 */
        title: PropTypes.node,
        /** @ignore */
        children: PropTypes.node,
        /**
         * 如果存在会在所有包裹的 item 上附加该 props，会覆盖来自上层包裹的 itemProps
         */
        itemProps: PropTypes.shape({
            /** 具体见 item 文档 */
            labelCol: PropTypes.object,
            /** 具体见 item 文档 */
            controllerCol: PropTypes.object,
            /** 具体见 item 文档 */
            shareStatus: PropTypes.bool
        })
    };

    render() {
        const { title, itemProps, children, ...rest } = this.props;
        return (
            <GroupWrap {...rest}>
                <GroupTitle>{title}</GroupTitle>
                <ItemPropsWrap itemProps={itemProps}>
                    <div>{children}</div>
                </ItemPropsWrap>
            </GroupWrap>
        );
    }
}
