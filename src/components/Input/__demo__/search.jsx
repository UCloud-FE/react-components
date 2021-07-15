import React from 'react';
import Input from 'src/components/Input';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';

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
        const { size, disabled } = this.state;
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
                            options={Sizes.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Input.Search size={size} disabled={disabled} onSearch={console.log} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
