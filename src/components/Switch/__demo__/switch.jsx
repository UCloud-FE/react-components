import React from 'react';
import Switch from 'src/components/Switch';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import Input from 'src/components/Input';

// demo start
const { Sizes } = Switch;
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
            disabled: false,
            loading: false
        };
    }
    render() {
        const { checked, size, disabled, onText, offText, loading } = this.state;
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={Sizes.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="loading" {...itemLayout}>
                        <Switch checked={loading} onChange={loading => this.setState({ loading })} />
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
                        loading={loading}
                        onChange={checked => this.setState({ checked })}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
