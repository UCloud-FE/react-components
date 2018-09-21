import React from 'react';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Switch from 'components/Switch';
import Form from 'components/Form';

// demo start
const { Size } = Checkbox;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            size: 'md',
            disabled: false
        };
    }
    render() {
        const { checked, size, disabled } = this.state;
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
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="checked" {...itemLayout}>
                        <Switch checked={checked} onChange={checked => this.setState({ checked })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Checkbox
                        checked={checked}
                        size={size}
                        disabled={disabled}
                        onChange={checked => {
                            console.log(checked);
                            this.setState({ checked });
                        }}
                    >
                        checkbox
                    </Checkbox>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
