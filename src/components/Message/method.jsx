import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { getRuntimeTheme } from 'src/components/ThemeProvider/runtime';

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
    <MessageContainer ref={ref => (containerRef = ref)} id="uc-fe-message-content-wrap" top={config.top} />,
    messageContainerDom
);

mainContainerDom.appendChild(messageContainerDom);

const popupMessage = (message, duration = config.duration, onClose = () => {}) => {
    const messageUid = containerRef.appendMessage(<ThemeProvider theme={getRuntimeTheme()}>{message}</ThemeProvider>);
    const destroy = () => {
        containerRef.removeMessage(messageUid) && onClose();
    };
    if (duration) {
        setTimeout(() => {
            destroy();
        }, duration);
    }
    return {
        destory: () => {
            console.error(`Wraning: wrong name of destory, please use destroy to instead`);
            destroy();
        },
        destroy
    };
};

const showMessage = (styleType, content, duration = config.duration, onClose = () => {}, option = {}) => {
    const { zIndex, style, className } = option;
    let newStyle = {
        ...style
    };
    if ('zIndex' in option) {
        newStyle.zIndex = zIndex;
    }
    const message = (
        <Message styleType={styleType} style={newStyle} className={className}>
            {content}
        </Message>
    );
    return popupMessage(message, duration, onClose, option);
};

const message = (...args) => showMessage('default', ...args);
const warning = (...args) => showMessage('warning', ...args);
const info = (...args) => showMessage('info', ...args);
const success = (...args) => showMessage('success', ...args);
const error = (...args) => showMessage('error', ...args);
const popup = (...args) => popupMessage(...args);

export { message, warning, success, info, error, popup };
