import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import _ from 'lodash';

import Button from 'src/components/Button';
import { getRuntimeTheme } from 'src/components/ThemeProvider/runtime';

import Modal from './Modal';

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
            <ThemeProvider theme={getRuntimeTheme()}>
                <Modal {...rest} visible {...this.state} />
            </ThemeProvider>
        );
    }
}

const pop = props => {
    let container = document.createElement('div');
    document.body.appendChild(container);
    const destroy = () => {
        const result = ReactDOM.unmountComponentAtNode(container);
        if (result && container.parentElement) {
            container.parentElement.removeChild(container);
        }
    };

    let update = null;
    ReactDOM.render(<ModalWrap {...props} reportUpdate={_update => (update = _update)} />, container);

    return {
        destory: () => {
            console.error(`Warning: wrong name of destory, please use destroy to instead`);
            destroy();
        },
        destroy,
        update
    };
};

const openModal = modal => {
    let container = document.createElement('div');
    document.body.appendChild(container);
    const destroy = () => {
        const result = ReactDOM.unmountComponentAtNode(container);
        if (result && container.parentElement) {
            container.parentElement.removeChild(container);
        }
    };

    ReactDOM.render(<ThemeProvider theme={getRuntimeTheme()}>{modal}</ThemeProvider>, container);

    return {
        destroy
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

export { alert, confirm, open, openModal };
