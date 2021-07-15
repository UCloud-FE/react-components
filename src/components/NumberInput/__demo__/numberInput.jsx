import React from 'react';
import NumberInput from 'src/components/NumberInput';
import Switch from 'src/components/Switch';
import Radio from 'src/components/Radio';
import Input from 'src/components/Input';
import Form from 'src/components/Form';

// demo start
const { Size, StyleType } = NumberInput;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            styleType: StyleType[0],
            readOnly: false,
            hideHandler: false,
            size: 'md',
            suffix: null
        };
    }
    render() {
        const { disabled, styleType, readOnly, size, hideHandler } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
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
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                            options={StyleType.map(styleType => ({
                                value: styleType
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })}>
                            disabled
                        </Switch>
                    </Form.Item>
                    <Form.Item label="readonly" {...itemLayout}>
                        <Switch checked={readOnly} onChange={readOnly => this.setState({ readOnly })}>
                            readOnly
                        </Switch>
                    </Form.Item>
                    <Form.Item label="max" {...itemLayout}>
                        <NumberInput onNumberChange={value => this.setState({ max: value })} placeholder="max" />
                    </Form.Item>
                    <Form.Item label="min" {...itemLayout}>
                        <NumberInput onNumberChange={value => this.setState({ min: value })} placeholder="min" />
                    </Form.Item>
                    <Form.Item label="step" {...itemLayout}>
                        <NumberInput onNumberChange={value => this.setState({ step: value })} placeholder="step" />
                    </Form.Item>
                    <Form.Item label="hideHandler" {...itemLayout}>
                        <Switch checked={hideHandler} onChange={hideHandler => this.setState({ hideHandler })} />
                    </Form.Item>
                    <Form.Item label="suffix" {...itemLayout}>
                        <Input onChange={e => this.setState({ suffix: e.target.value })} placeholder="suffix" />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <NumberInput {...this.state} />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
