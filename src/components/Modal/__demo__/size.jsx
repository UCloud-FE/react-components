import React from 'react';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
const { Size } = Modal;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <Button
                        key={size}
                        onClick={() => Modal.alert({ size }, <Modal.Content>This is a modal</Modal.Content>)}
                    >
                        {size}
                    </Button>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
