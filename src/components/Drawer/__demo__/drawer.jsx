import React from 'react';

import Drawer from 'src/components/Drawer';
import Button from 'src/components/Button';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';
import NumberInput from 'src/components/NumberInput';

// demo start
const { Placement, defaultProps } = Drawer;
class Container extends React.Component {
    constructor(props) {
        super(props);
        console.log('new container');
    }
    componentWillUnmount() {
        console.log('ummount');
    }
    render() {
        return <div {...this.props} />;
    }
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        const { visible, mask, maskClosable, keyboard, placement, zIndex } = defaultProps;
        this.state = {
            visible,
            mask,
            maskClosable,
            keyboard,
            placement,
            zIndex,
            closeHandler: true
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
        const { visible, zIndex, mask, maskClosable, keyboard, destroyOnClose, placement, closeHandler } = this.state;
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
                    <Form.Item label="closeHandler" {...itemLayout}>
                        <Switch checked={closeHandler} onChange={closeHandler => this.setState({ closeHandler })} />
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
                        closeHandler={closeHandler ? undefined : false}
                        onClose={() => this.close()}
                    >
                        <Container>content</Container>
                    </Drawer>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
