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
            size: 'md'
        };
    }
    render() {
        const { size } = this.state;
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            options={['md', 'lg'].map(value => ({ value }))}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Form size={size}>
                        <Item label="Input" {...itemLayout}>
                            <Input size={size} />
                        </Item>
                        <Item label="Switch" {...itemLayout}>
                            <Switch size={size} />
                        </Item>
                        <Item label="上传文件" {...itemLayout}>
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
