import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import _ from 'lodash';

import { MessageContentWrap, animationName, animationDuration } from './style';

class MessageContainer extends Component {
    static propTypes = {
        /** 顶部的间距 */
        top: PropTypes.number
    };
    state = {
        messages: []
    };
    appendMessage = message => {
        const uid = _.uniqueId('uc_message_');
        console.log(uid);
        this.setState({
            messages: this.state.messages.concat({
                message,
                uid
            })
        });
        return uid;
    };
    removeMessage = uid => {
        const newMessages = this.state.messages.filter(info => info.uid !== uid);
        this.setState({
            messages: newMessages
        });
    };
    render() {
        const { messages } = this.state;
        const { top, ...rest } = this.props;
        return (
            <MessageContentWrap style={{ marginTop: top }} {...rest}>
                {messages.map(info => (
                    <CSSTransition key={info.uid} timeout={animationDuration} classNames={animationName}>
                        {info.message}
                    </CSSTransition>
                ))}
            </MessageContentWrap>
        );
    }
}

export default MessageContainer;
