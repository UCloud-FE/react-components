import React from 'react';
import Checkbox from 'src/components/Checkbox';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';

// demo start
const { Group, Size, StyleType } = Checkbox;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ['1'],
            size: 'md',
            styleType: 'default',
            disabled: false,
            options: [1, 2, 3, 4]
        };
    }
    render() {
        const { size, styleType, disabled, options, value } = this.state;
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
                    <Form.Item label="value" {...itemLayout}>
                        <Checkbox.Group
                            options={options.map(value => ({ value }))}
                            value={value}
                            onChange={value => this.setState({ value })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Group
                        value={value}
                        onChange={value => {
                            console.log(value);
                            this.setState({ value });
                        }}
                        disabled={disabled}
                        size={size}
                        styleType={styleType}
                        options={options.map(v => ({
                            value: v
                        }))}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
