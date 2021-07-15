import React from 'react';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button
                    onClick={() => Modal.alert({ maskClosable: true }, <Modal.Content>This is a modal</Modal.Content>)}
                >
                    maskClosable=true
                </Button>
                <Button
                    onClick={() => Modal.alert({ maskClosable: false }, <Modal.Content>This is a modal</Modal.Content>)}
                >
                    maskClosable=false
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
