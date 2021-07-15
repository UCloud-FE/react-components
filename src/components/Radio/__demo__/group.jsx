import React from 'react';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';

// demo start
const { Size, StyleType } = Radio;
class Demo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            styleType: StyleType[0],
            size: 'md',
            disabled: false
        };
    }
    render() {
        const { size, disabled, styleType, value } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const options = [1, 2, 3];
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
                    <Form.Item label="value" {...itemLayout}>
                        <Radio.Group
                            options={options.map(option => ({ value: option }))}
                            value={value}
                            onChange={value => this.setState({ value })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Radio.Group onChange={value => this.setState({ value })} {...this.state}>
                        {options.map(v => (
                            <Radio key={v} value={v}>
                                {v}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
