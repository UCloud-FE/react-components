import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={() => Modal.alert({ keyboard: true }, <Modal.Content>This is a modal</Modal.Content>)}>
                    keyboard=true
                </Button>
                <Button
                    onClick={() => Modal.alert({ keyboard: false }, <Modal.Content>This is a modal</Modal.Content>)}
                >
                    keyboard=false
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
