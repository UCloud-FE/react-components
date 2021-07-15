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
                            { className: 'test_cls', wrapClassName: 'test_cls_wrap' },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    custom className
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
