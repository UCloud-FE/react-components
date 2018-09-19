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
                                title: 'this is alert'
                            },
                            <div>this is content</div>
                        )
                    }
                >
                    alert
                </Button>
                <Button
                    onClick={() =>
                        Modal.confirm(
                            {
                                title: 'this is confirm',
                                onOk: () => console.log('ok')
                            },
                            <div>this is content</div>
                        )
                    }
                >
                    confirm
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
