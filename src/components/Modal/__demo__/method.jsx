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
                                title: 'this is alert',
                                onClose: () => console.log('close'),
                                onOk: () => console.log('ok')
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
                                onClose: () => console.log('close'),
                                onOk: () => console.log('ok')
                            },
                            <div>this is content</div>
                        )
                    }
                >
                    confirm
                </Button>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                title: 'this is promise alert',
                                onClose: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    }),
                                onOk: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    })
                            },
                            <div>this is content</div>
                        )
                    }
                >
                    promise alert
                </Button>
                <Button
                    onClick={() =>
                        Modal.confirm(
                            {
                                title: 'this is promise confirm',
                                onClose: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    }),
                                onOk: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    })
                            },
                            <div>this is content</div>
                        )
                    }
                >
                    promise confirm
                </Button>
                <Button
                    onClick={() =>
                        Modal.open(
                            {
                                title: 'this is promise confirm',
                                onClose: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    }),
                                onOk: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    })
                            },
                            <div>this is content</div>
                        )
                    }
                ></Button>
            </div>
        );
    }
}
// demo end

export default Demo;
