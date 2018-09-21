import React from 'react';
import ReactDOM from 'react-dom';

import Message from './Message';

import MessageContainer from './MessageContainer';

const config = {
    duration: 3000,
    getContainer: () => document.body,
    top: 20
};

let messageContainerDom = document.createElement('div');

const mainContainerDom = config.getContainer();
let containerRef;
ReactDOM.render(
    <MessageContainer ref={ref => (containerRef = ref)} id="uc-message-content-wrap" top={config.top} />,
    messageContainerDom
);

mainContainerDom.appendChild(messageContainerDom);

const showMessage = (styleType, content, duration = config.duration, onClose = () => {}, option = {}) => {
    const { zIndex, style, className } = option;
    let newStyle = {
        ...style
    };
    if ('zIndex' in option) {
        newStyle.zIndex = zIndex;
    }
    const messageUid = containerRef.appendMessage(
        <Message styleType={styleType} style={newStyle} className={className}>
            {content}
        </Message>
    );
    const destory = () => {
        containerRef.removeMessage(messageUid) && onClose();
    };
    if (duration) {
        setTimeout(() => {
            destory();
        }, duration);
    }
    return {
        destory
    };
};

const message = (...args) => showMessage('default', ...args);
const warning = (...args) => showMessage('warning', ...args);
const info = (...args) => showMessage('info', ...args);
const error = (...args) => showMessage('error', ...args);

export { message, warning, info, error };
