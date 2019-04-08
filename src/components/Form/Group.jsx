import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GroupWrap, GroupTitle } from './style';

export default class Group extends Component {
    static propTypes = {
        // 标题项
        title: PropTypes.node.isRequired,
        children: PropTypes.node
    };

    render() {
        const { title, children, ...rest } = this.props;
        return (
            <GroupWrap {...rest}>
                <GroupTitle>{title}</GroupTitle>
                <div>{children}</div>
            </GroupWrap>
        );
    }
}
