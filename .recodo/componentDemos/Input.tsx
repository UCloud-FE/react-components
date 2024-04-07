// @ts-nocheck
import { Form, Icon, Input, Radio, Switch } from '@ucloud-fe/react-components';
import React from 'react';

// demo start
const { Sizes } = Input;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md'
        };
    }
    render() {
        const { size, disabled, prefix, suffix, block, clearable, error } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const props = {
            size,
            disabled,
            block,
            clearable,
            prefix: prefix && <Icon type="circle" />,
            suffix: suffix && <Icon type="circle" />
        };
        if (error) {
            props.status = 'error';
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Sizes.map(size => ({
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
                    <Form.Item label="clearable" {...itemLayout}>
                        <Switch checked={clearable} onChange={clearable => this.setState({ clearable })} />
                    </Form.Item>
                    <Form.Item label="status error" {...itemLayout}>
                        <Switch checked={error} onChange={error => this.setState({ error })} />
                    </Form.Item>
                    <Form.Item label="block" {...itemLayout}>
                        <Switch checked={block} onChange={block => this.setState({ block })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Input {...props} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
