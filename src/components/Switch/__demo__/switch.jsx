import React from 'react';
import Switch from 'components/Switch';
import Radio from 'components/Radio';
import Form from 'components/Form';
import Input from 'components/Input';

// demo start
const { Size } = Switch;
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
            checked: true,
            size: 'md',
            onText: 'ON',
            offText: 'OFF',
            disabled: false
        };
    }
    render() {
        const { checked, size, disabled, onText, offText } = this.state;
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
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="checked" {...itemLayout}>
                        <Switch checked={checked} onChange={checked => this.setState({ checked })} />
                    </Form.Item>
                    <Form.Item label="onText" {...itemLayout}>
                        <Input value={onText} onChange={e => this.setState({ onText: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="offText" {...itemLayout}>
                        <Input value={offText} onChange={e => this.setState({ offText: e.target.value })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Switch
                        checked={checked}
                        size={size}
                        disabled={disabled}
                        onText={onText}
                        offText={offText}
                        onChange={checked => this.setState({ checked })}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
