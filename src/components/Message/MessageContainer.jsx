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
        messages: [],
        top: this.props.top,
        deleteIds: []
    };
    componentDidMount() {
        this.setTop(this.props.top);
    }
    appendMessage = message => {
        const uid = _.uniqueId('uc_message_');
        this.setState({
            messages: this.state.messages.concat({
                message,
                uid
            })
        });
        return uid;
    };
    sleep = duration => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, duration);
        });
    };
    removeMessage = async (uid, messageDomId) => {
        const { deleteIds } = this.state;

        this.setState({
            deleteIds: [...deleteIds, uid]
        });
        const willDeleteMessage = document.getElementById(messageDomId);

        willDeleteMessage.style.minHeight = '0';
        willDeleteMessage.style.height = '0';
        willDeleteMessage.style.padding = '0';
        willDeleteMessage.style.marginBottom = '0';
        willDeleteMessage.style.marginTop = '0';
        willDeleteMessage.style.border = '0';
        willDeleteMessage.style.overflow = 'hidden';
        willDeleteMessage.style.opacity = '0';

        _.debounce(() => {
            this.refreshMessage();
        }, 1000)();
    };
    refreshMessage = () => {
        const { messages, deleteIds } = this.state;
        const newMessages = messages.filter(info => !deleteIds.includes(info.uid));
        const removed = newMessages.length !== messages.length;

        this.setState({
            messages: newMessages,
            deleteIds: []
        });

        return removed;
    };
    setTop = top => {
        this.setState({
            top
        });
    };
    render() {
        const { messages, top } = this.state;
        // eslint-disable-next-line no-unused-vars
        const { top: _top, ...rest } = this.props;
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
