import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import Button from 'src/components/Button';
import { getRuntimeTheme } from 'src/components/ThemeProvider/runtime';

import Modal from './Modal';

const pop = props => {
    let container = document.createElement('div');
    document.body.appendChild(container);
    const destory = () => {
        const result = ReactDOM.unmountComponentAtNode(container);
        if (result && container.parentElement) {
            container.parentElement.removeChild(container);
        }
    };

    ReactDOM.render(
        <ThemeProvider theme={getRuntimeTheme()}>
            <Modal {...props} visible />
        </ThemeProvider>,
        container
    );

    return {
        destory
    };
};

const alert = (props, content) => {
    const AlertFooter = ({ locale }) => (
        <Button size="lg" styleType="primary" onClick={() => modal.destory()}>
            {locale.confirm}
        </Button>
    );
    AlertFooter.propTypes = {
        locale: PropTypes.object.isRequired
    };

    const options = {
        children: content,
        maskClosable: false,
        size: 'sm',
        title: 'Alert',
        onClose: () => {
            modal.destory();
        },
        footer: AlertFooter
    };

    const modal = pop({
        ...options,
        ...props
    });
    return modal;
};

const confirm = ({ onOk = () => {}, ...rest }, content) => {
    const options = {
        children: content,
        maskClosable: false,
        size: 'sm',
        title: 'Confirm',
        onClose: () => {
            modal.destory();
        },
        onOk: () => {
            modal.destory();
            onOk();
        }
    };

    const modal = pop({
        ...options,
        ...rest
    });
    return modal;
};

export { alert, confirm };
