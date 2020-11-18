import React from 'react';

import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import NumberInput from 'src/components/NumberInput';
import Box from 'src/components/Box';

// demo start
const { Size } = Modal;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            visible: false,
            zIndex: 100,
            closable: true,
            mask: true,
            maskClosable: true,
            keyboard: true,
            destroyOnClose: false
        };
    }
    toggle(visible) {
        this.setState({
            visible: visible == null ? !this.state.visible : visible
        });
    }
    open() {
        this.toggle(true);
    }
    close() {
        this.toggle(false);
    }
    render() {
        const { size, visible, zIndex, closable, mask, maskClosable, keyboard, destroyOnClose } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={Size.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="visible" {...itemLayout}>
                        <Switch checked={visible} onChange={visible => this.setState({ visible })} />
                    </Form.Item>
                    <Form.Item label="closable" {...itemLayout}>
                        <Switch checked={closable} onChange={closable => this.setState({ closable })} />
                    </Form.Item>
                    <Form.Item label="mask" {...itemLayout}>
                        <Switch checked={mask} onChange={mask => this.setState({ mask })} />
                    </Form.Item>
                    <Form.Item label="maskClosable" {...itemLayout}>
                        <Switch checked={maskClosable} onChange={maskClosable => this.setState({ maskClosable })} />
                    </Form.Item>
                    <Form.Item label="keyboard" {...itemLayout}>
                        <Switch checked={keyboard} onChange={keyboard => this.setState({ keyboard })} />
                    </Form.Item>
                    <Form.Item label="destroyOnClose" {...itemLayout}>
                        <Switch
                            checked={destroyOnClose}
                            onChange={destroyOnClose => this.setState({ destroyOnClose })}
                        />
                    </Form.Item>
                    <Form.Item label="zIndex" {...itemLayout}>
                        <NumberInput value={zIndex} onNumberChange={zIndex => this.setState({ zIndex })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Button onClick={() => this.toggle()}>Toggle Visible</Button>
                    <Modal
                        {...this.state}
                        onClose={() => this.close()}
                        afterClose={() => console.log('afterClose')}
                        onOk={() => console.log('onOk')}
                        title="this is title"
                    >
                        <Box padding="lg">this is content</Box>
                    </Modal>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
