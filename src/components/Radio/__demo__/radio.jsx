import React from 'react';
import Radio from 'components/Radio';
import Form from 'components/Form';
import Switch from 'components/Switch';

// demo start
const { Size, StyleType } = Radio;
class Demo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            styleType: StyleType[0],
            size: 'md',
            disabled: false,
            checked: false
        };
    }
    render() {
        const { size, disabled, styleType, checked } = this.state;
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
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
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
                    <Radio
                        {...this.state}
                        title={this.state.styleType}
                        onChange={checked => this.setState({ checked })}
                    >
                        checked
                    </Radio>
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
