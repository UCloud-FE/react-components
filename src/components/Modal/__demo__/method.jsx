import React from 'react';

import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    open() {
        this.modal = Modal.open(
            {
                title: '测试',
                onClose: () => console.log('close'),
                onOk: () => console.log('ok')
            },
            <Modal.Content>
                <div style={{ height: '300px' }}>
                    <Button onClick={() => this.update()}>测试</Button>
                </div>
            </Modal.Content>
        );
    }
    update() {
        if (!this.modal) return;
        this.modal.update({
            title: `测试 - ${Math.random()}`,
            size: ['sm', 'md', 'lg'][(Math.random() * 3) | 0]
        });
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Button onClick={() => this.open()}>open</Button>
                </div>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                title: 'this is alert',
                                onClose: () => console.log('close'),
                                onOk: () => console.log('ok')
                            },
                            <Modal.Content>this is content</Modal.Content>
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
                            <Modal.Content>this is content</Modal.Content>
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
                            <Modal.Content>this is content</Modal.Content>
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
                            <Modal.Content>This is a modal</Modal.Content>
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
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    promise open
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
