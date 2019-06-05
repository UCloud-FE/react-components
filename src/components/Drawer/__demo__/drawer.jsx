import React from 'react';
import Drawer from 'components/Drawer';
import Button from 'components/Button';
import Radio from 'components/Radio';
import Switch from 'components/Switch';
import Form from 'components/Form';
import NumberInput from 'components/NumberInput';

// demo start
const { Placement } = Drawer;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            mask: true,
            maskClosable: true,
            keyboard: false,
            placement: Placement[1]
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
        const { visible, zIndex, mask, maskClosable, keyboard, destroyOnClose, placement } = this.state;
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
                    <Form.Item label="placement" {...itemLayout}>
                        <Radio.Group
                            value={placement}
                            onChange={placement => this.setState({ placement })}
                            options={Placement.map(placement => ({
                                value: placement
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="visible" {...itemLayout}>
                        <Switch checked={visible} onChange={visible => this.setState({ visible })} />
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
                    <Button onClick={() => this.toggle()}>Toggle</Button>
                    <Drawer
                        {...(placement === 'left' || placement === 'right' ? { width: 200 } : { height: 200 })}
                        {...this.state}
                        onClose={() => this.close()}
                    >
                        content
                    </Drawer>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
