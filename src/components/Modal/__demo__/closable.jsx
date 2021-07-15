import React from 'react';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={() => Modal.alert({ closable: true }, <Modal.Content>This is a modal</Modal.Content>)}>
                    closable=true
                </Button>
                <Button
                    onClick={() => Modal.alert({ closable: false }, <Modal.Content>This is a modal</Modal.Content>)}
                >
                    closable=false
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
