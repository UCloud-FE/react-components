import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';

import { getRuntimeTheme } from 'src/components/ThemeProvider/runtime';

import Message from './Message';
import MessageContainer from './MessageContainer';

const config = {
    duration: 4500,
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
    let props = {
        children: content
    };
    let newStyle = {
        ...style
    };
    if ('zIndex' in option) {
        newStyle.zIndex = zIndex;
    }
    if (!React.isValidElement(content) && Object.prototype.toString.call(content) === '[object Object]') {
        props = content;
    }
    let destroy = () => {};
    const message = (
        <Message styleType={styleType} style={newStyle} className={className} {...props} onClose={() => destroy()} />
    );
    const instance = popupMessage(message, duration, onClose, option);
    destroy = instance.destroy;
    return instance;
};

const message = (...args) => showMessage('default', ...args);
const info = (...args) => showMessage('default', ...args);
const success = (...args) => showMessage('success', ...args);
const warning = (...args) => showMessage('warning', ...args);
const error = (...args) => showMessage('error', ...args);
const loading = (...args) => showMessage('loading', ...args);

const popup = (...args) => popupMessage(...args);

const changeConfig = (options = {}) => {
    if ('duration' in options) {
        config.duration = options.duration;
    }
    if ('top' in options) {
        config.top = options.top;
        containerRef && containerRef.setTop(options.top);
    }
};

export { success, info, message, warning, error, loading, popup, changeConfig as config };
