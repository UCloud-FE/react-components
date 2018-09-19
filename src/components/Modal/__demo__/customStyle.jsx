import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';

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
                            'This is a modal'
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
