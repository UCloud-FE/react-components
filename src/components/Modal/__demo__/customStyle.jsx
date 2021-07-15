import React from 'react';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                style: { background: 'red' },
                                bodyStyle: {
                                    background: 'yellow'
                                },
                                maskStyle: {
                                    background: 'blue'
                                }
                            },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    custom style
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
