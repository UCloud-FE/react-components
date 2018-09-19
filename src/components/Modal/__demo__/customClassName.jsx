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
                        Modal.alert({ className: 'test_cls', wrapClassName: 'test_cls_wrap' }, 'This is a modal')
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
