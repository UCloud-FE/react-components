import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from 'src/components/Button';
import ThemeProvider from 'src/components/ThemeProvider';
import LocaleProvider from 'src/components/LocaleProvider';
import { getRuntimeTheme } from 'src/components/ThemeProvider/runtime';
import { getRuntimeLocale } from 'src/components/LocaleProvider/runtime';
import warning from 'src/utils/warning';

import Modal from './Modal';

const methodWarning = () => warning(`You're using a method to call a Modal, this may cause a lot of problems.`);
const destroyWarning = () => warning(`Wrong name of destory, please use destroy to instead`);

let i = 0;
const getCallUID = () => '_modal_id_' + i++;
const queueMap = {};

const cleanModal = id => {
    const modal = queueMap[id];
    if (modal && modal.destroy) {
        modal.destroy();
    }
    delete queueMap[id];
};
const addModal = modal => {
    const id = getCallUID();
    queueMap[id] = modal;
    return id;
};
const cleanAllModal = () => {
    const remainModalCount = Object.keys(queueMap).length;
    if (remainModalCount) {
        Object.keys(queueMap).forEach(cleanModal);
        return remainModalCount;
    }
};

const ContextWrap = ({ children }) => {
    return (
        <ThemeProvider theme={getRuntimeTheme()}>
            <LocaleProvider locale={getRuntimeLocale()}>{children}</LocaleProvider>
        </ThemeProvider>
    );
};
ContextWrap.propTypes = { children: PropTypes.node };

class ModalWrap extends PureComponent {
    static propTypes = {
        reportUpdate: PropTypes.func
    };
    componentWillMount() {
        this.props.reportUpdate(this.update);
    }
    update = props => {
        this.setState({ ...props });
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { reportUpdate, ...rest } = this.props;
        return (
            <ContextWrap>
                <Modal {...rest} visible {...this.state} />
            </ContextWrap>
        );
    }
}

const pop = props => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const destroy = () => {
        const result = ReactDOM.unmountComponentAtNode(container);
        if (result && container.parentElement) {
            container.parentElement.removeChild(container);
        }
    };

    let update = null;
    ReactDOM.render(<ModalWrap {...props} reportUpdate={_update => (update = _update)} />, container);

    methodWarning();

    const callID = addModal({ destroy });

    return {
        destory: () => {
            cleanModal(callID);
            destroyWarning();
        },
        destroy: () => cleanModal(callID),
        update
    };
};

const openModal = modal => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const destroy = () => {
        const result = ReactDOM.unmountComponentAtNode(container);
        if (result && container.parentElement) {
            container.parentElement.removeChild(container);
        }
    };

    ReactDOM.render(<ContextWrap>{modal}</ContextWrap>, container);

    methodWarning();

    const callID = addModal({ destroy });
    return {
        destroy: () => cleanModal(callID)
    };
};

const isPromise = promiseLike => {
    return promiseLike && promiseLike.then && _.isFunction(promiseLike.then);
};

const promiseJudgeHandle = (promiseLike, handle) => {
    if (isPromise(promiseLike)) {
        promiseLike.then(res => {
            handle();
            return res;
        });
    } else {
        handle();
    }
};
const alert = ({ onOk = () => {}, onClose = () => {}, ...rest }, content) => {
    const _onClose = () => promiseJudgeHandle(onClose(), () => modal.destroy());
    const _onOk = () => promiseJudgeHandle(onOk(), () => modal.destroy());
    const AlertFooter = ({ locale }) => (
        <Button size="lg" styleType="primary" onClick={_onOk}>
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
        onClose: _onClose,
        footer: AlertFooter
    };

    const modal = pop({
        ...options,
        ...rest
    });
    return modal;
};

const confirm = ({ onOk = () => {}, onClose = () => {}, ...rest }, content) => {
    const _onClose = () => promiseJudgeHandle(onClose(), () => modal.destroy());
    const _onOk = () => promiseJudgeHandle(onOk(), () => modal.destroy());

    const options = {
        children: content,
        maskClosable: false,
        size: 'sm',
        title: 'Confirm',
        onClose: _onClose,
        onOk: _onOk
    };

    const modal = pop({
        ...options,
        ...rest
    });
    return modal;
};

const open = ({ onOk = () => {}, onClose = () => {}, ...rest }, content) => {
    const _onClose = () => promiseJudgeHandle(onClose(), () => modal.destroy());
    const _onOk = () => promiseJudgeHandle(onOk(), () => modal.destroy());

    const options = {
        children: content,
        onClose: _onClose,
        onOk: _onOk,
        ...rest
    };

    const modal = pop(options);
    return modal;
};

export { alert, confirm, open, openModal, cleanAllModal as destroyAll };
