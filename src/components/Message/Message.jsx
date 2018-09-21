import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

import { MessageWrap, IconWrap, ContentWrap } from './style';

const StyleType = ['default', 'info', 'warning', 'error'];

class Message extends Component {
    static propTypes = {
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        styleType: PropTypes.oneOf(StyleType)
    };
    static defaultProps = {
        styleType: 'default'
    };
    render() {
        const { children, ...rest } = this.props;
        return (
            <MessageWrap {...rest}>
                <IconWrap>
                    <Icon type="circle-mark2" />
                </IconWrap>
                <ContentWrap>{children}</ContentWrap>
            </MessageWrap>
        );
    }
}

Message.StyleType = StyleType;

export default Message;
