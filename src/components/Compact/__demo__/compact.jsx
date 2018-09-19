import React from 'react';
import Compact from 'components/Compact';
import Select from 'components/Select';
import Input from 'components/Input';
import Radio from 'components/Radio';
import Form from 'components/Form';
import Switch from 'components/Switch';

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
                            options={Size.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Compact sharedProps={{ size, disabled }}>
                        <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                        <Input />
                    </Compact>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
