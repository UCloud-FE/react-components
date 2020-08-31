import React from 'react';

import SvgIcon from 'src/components/SvgIcon';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';
import Input from 'src/components/Input';
import Radio from 'src/components/Radio';

// demo start
const { Type } = SvgIcon;
const itemLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: Type[0],
            color: '#333333',
            size: SvgIcon.defaultProps.size
        };
    }
    render() {
        const { type, spin, color, size } = this.state;
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="type" {...itemLayout}>
                        <Radio.Group
                            options={Type.map(type => ({ value: type }))}
                            value={type}
                            onChange={type => this.setState({ type })}
                        />
                    </Form.Item>
                    <Form.Item label="spin" {...itemLayout}>
                        <Switch checked={spin} onChange={spin => this.setState({ spin })} />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Input value={size} onChange={e => this.setState({ size: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="color" {...itemLayout}>
                        <input type="color" value={color} onChange={e => this.setState({ color: e.target.value })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <SvgIcon {...this.state} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
