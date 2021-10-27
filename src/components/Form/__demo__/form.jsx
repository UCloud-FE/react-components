import React from 'react';

import Form from 'src/components/Form';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Input from 'src/components/Input';
import Select from 'src/components/Select';

// demo start
const { Item } = Form;
const itemLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            useGrid: true
        };
    }
    render() {
        const { size, useGrid } = this.state;
        return (
            <div>
                <Form className="demo-form" itemProps={{ ...itemLayout }}>
                    <Form.Item label="size">
                        <Radio.Group
                            value={size}
                            options={['md', 'lg'].map(value => ({ value }))}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="useGrid">
                        <Switch checked={useGrid} onChange={useGrid => this.setState({ useGrid })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Form size={size} itemProps={{ ...(useGrid ? itemLayout : {}) }}>
                        <Item label="Input" help="Please input" required tip="Help content">
                            <Input size={size} />
                        </Item>
                        <Item label="Switch">
                            <Switch size={size} />
                        </Item>
                        <Item label="Select">
                            <Select size={size} options={[{ value: '123' }, { value: '1231' }, { value: '1232' }]} />
                        </Item>
                    </Form>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
