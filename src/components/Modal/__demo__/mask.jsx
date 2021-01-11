import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={() => Modal.alert({ mask: true }, <Modal.Content>This is a modal</Modal.Content>)}>
                    mask=true
                </Button>
                <Button onClick={() => Modal.alert({ mask: false }, <Modal.Content>This is a modal</Modal.Content>)}>
                    mask=false
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
