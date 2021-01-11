import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';

// demo start
class Demo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            visible: false
        };
    }
    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button
                    onClick={() =>
                        this.setState({
                            visible: !visible
                        })
                    }
                >
                    click
                </Button>
                <Modal
                    visible={visible}
                    onClose={() =>
                        this.setState({
                            visible: false
                        })
                    }
                    destroyOnClose
                >
                    <Modal.Content>This is a modal</Modal.Content>
                </Modal>
            </div>
        );
    }
}
// demo end

export default Demo;
