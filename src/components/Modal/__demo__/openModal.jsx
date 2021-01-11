import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
class CreateModal extends React.Component {
    confirm() {
        this.props.onEnd('confirm');
    }
    cancel() {
        this.props.onEnd('cancel');
    }
    render() {
        console.log(this.props);
        return (
            <Modal
                visible
                footer={
                    <div>
                        <Button styleType="primary" onClick={() => this.confirm()}>
                            确认创建
                        </Button>
                        <Button onClick={() => this.cancel()}>取消</Button>
                    </div>
                }
                onClose={this.props.onEnd}
            >
                <Modal.Content>This is a modal</Modal.Content>
            </Modal>
        );
    }
}
CreateModal.propTypes = {
    onEnd: PropTypes.func.isRequired
};
class Demo extends React.Component {
    create() {
        this.modal = Modal.openModal(<CreateModal onEnd={result => this.onEnd(result)} />);
    }
    onEnd(result) {
        if (!this.modal) return;
        console.log(result);
        this.modal.destroy();
    }
    render() {
        return (
            <div>
                <Button onClick={() => this.create()}>openModal</Button>
            </div>
        );
    }
}
// demo end

export default Demo;
