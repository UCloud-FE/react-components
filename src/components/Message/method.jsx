import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ThemeProvider from 'src/components/ThemeProvider';
import LocaleProvider from 'src/components/LocaleProvider';
import { getRuntimeTheme } from 'src/components/ThemeProvider/runtime';
import { getRuntimeLocale } from 'src/components/LocaleProvider/runtime';

import Message from './Message';
import MessageContainer from './MessageContainer';

const config = {
    duration: 4500,
    getContainer: () => document.body,
    top: 20
};

const messageContainerDom = document.createElement('div');

const mainContainerDom = config.getContainer();
let containerRef;

function MessageRefComponent() {
    const myRef = React.useRef(null);
    React.useEffect(() => {
        containerRef = myRef.current;
    }, [myRef.current]);
    return <MessageContainer ref={ref => (myRef.current = ref)} id="uc-fe-message-content-wrap" top={config.top} />;
}

mainContainerDom.appendChild(messageContainerDom);

ReactDOM.render(<MessageRefComponent />, messageContainerDom);

const ContextWrap = ({ children }) => {
    return (
        <ThemeProvider theme={getRuntimeTheme()}>
            <LocaleProvider locale={getRuntimeLocale()}>{children}</LocaleProvider>
        </ThemeProvider>
    );
};
ContextWrap.propTypes = { children: PropTypes.node };

const popupMessage = (message, duration = config.duration, onClose = () => {}, option, messageDomId) => {
    if (!containerRef) {
        console.error(`Error: containerRef is not ready , please check`);
        return;
    }
    const messageUid = containerRef.appendMessage(<ContextWrap>{message}</ContextWrap>);
    const destroy = () => {
        containerRef.removeMessage(messageUid, messageDomId) && onClose();
    };
    if (duration) {
        setTimeout(() => {
            destroy();
        }, duration);
    }
    return {
        destory: () => {
            console.error(`Warning: wrong name of destory, please use destroy to instead`);
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
    const newStyle = {
        ...style
    };
    if ('zIndex' in option) {
        newStyle.zIndex = zIndex;
    }
    if (!React.isValidElement(content) && Object.prototype.toString.call(content) === '[object Object]') {
        props = content;
    }
    let destroy = () => {};
    const uid = _.uniqueId('uc_message_dom');
    const message = (
        <Message
            styleType={styleType}
            style={newStyle}
            className={className}
            {...props}
            onClose={() => destroy()}
            id={uid}
        />
    );

    const instance = popupMessage(message, duration, onClose, option, uid);
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
