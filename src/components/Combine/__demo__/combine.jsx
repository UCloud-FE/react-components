import React from 'react';

import Combine from 'src/components/Combine';
import Select from 'src/components/Select';
import Input from 'src/components/Input';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';

// demo start
const { Size } = Input;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            spacing: 'smart'
        };
    }
    render() {
        const { size, disabled, spacing } = this.state;
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
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="spacing" {...itemLayout}>
                        <Radio.Group
                            value={spacing}
                            onChange={spacing => this.setState({ spacing })}
                            options={['smart', 'compact', 'sm', 'md', 'lg'].map(spacing => ({
                                value: spacing
                            }))}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Combine sharedProps={{ size, disabled }} spacing={spacing}>
                        <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                        <Input />
                    </Combine>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
