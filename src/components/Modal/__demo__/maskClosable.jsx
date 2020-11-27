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
                        Modal.alert({ maskClosable: true, customStyle: { contentPadding: true } }, 'This is a modal')
                    }
                >
                    maskClosable=true
                </Button>
                <Button
                    onClick={() =>
                        Modal.alert({ maskClosable: false, customStyle: { contentPadding: true } }, 'This is a modal')
                    }
                >
                    maskClosable=false
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
