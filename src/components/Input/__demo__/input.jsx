import React from 'react';
import Input from 'src/components/Input';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';
import Icon from 'src/components/Icon';

// demo start
const { Size } = Input;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md'
        };
    }
    render() {
        const { size, disabled, prefix, suffix } = this.state;
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
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Size.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="prefix" {...itemLayout}>
                        <Switch checked={prefix} onChange={prefix => this.setState({ prefix })} />
                    </Form.Item>
                    <Form.Item label="suffix" {...itemLayout}>
                        <Switch checked={suffix} onChange={suffix => this.setState({ suffix })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Input
                        {...{
                            size,
                            disabled,
                            prefix: prefix && <Icon type="circle" />,
                            suffix: suffix && <Icon type="circle" />
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
