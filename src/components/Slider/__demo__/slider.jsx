import React from 'react';
import Slider from 'components/Slider';
import Radio from 'components/Radio';
import NumberInput from 'components/NumberInput';
import Switch from 'components/Switch';
import Form from 'components/Form';

// demo start
const itemLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const { Size } = Slider;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            disabled: false,
            min: 0,
            max: 100,
            step: 1
        };
    }
    render() {
        const { disabled, size, min, max, step, isSensitive, hideNumberInput } = this.state;
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Size.map(size => ({ value: size }))}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })}>
                            disabled
                        </Switch>
                    </Form.Item>
                    <Form.Item label="isSensitive" {...itemLayout}>
                        <Switch checked={isSensitive} onChange={isSensitive => this.setState({ isSensitive })}>
                            isSensitive
                        </Switch>
                    </Form.Item>
                    <Form.Item label="hideNumberInput" {...itemLayout}>
                        <Switch
                            checked={hideNumberInput}
                            onChange={hideNumberInput => this.setState({ hideNumberInput })}
                        >
                            hideNumberInput
                        </Switch>
                    </Form.Item>
                    <Form.Item label="min" {...itemLayout}>
                        <NumberInput value={min} onChange={v => this.setState({ min: v })} />
                    </Form.Item>
                    <Form.Item label="max" {...itemLayout}>
                        <NumberInput value={max} onChange={v => this.setState({ max: v })} />
                    </Form.Item>
                    <Form.Item label="step" {...itemLayout}>
                        <NumberInput min={0.0001} value={step} onNumberChange={v => this.setState({ step: v })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Slider
                        defaultValue={10}
                        {...this.state}
                        numberInput={hideNumberInput ? null : {}}
                        onChange={console.log}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
