import React from 'react';

import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    open() {
        this.modal = Modal.open(
            {
                title: '测试',
                customStyle: { contentPadding: true },
                onClose: () => console.log('close'),
                onOk: () => console.log('ok')
            },
            <div style={{ height: '300px' }}>
                <Button onClick={() => this.update()}>测试</Button>
            </div>
        );
    }
    update() {
        if (!this.modal) return;
        this.modal.update({
            title: `测试 - ${Math.random()}`,
            customStyle: { contentPadding: true },
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
                                customStyle: { contentPadding: true },
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
                                customStyle: { contentPadding: true },
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
                                customStyle: { contentPadding: true },
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
                                customStyle: { contentPadding: true },
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
                                customStyle: { contentPadding: true },
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
                    promise open
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
