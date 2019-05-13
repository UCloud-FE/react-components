import React from 'react';
import Form from 'components/Form';
import Radio from 'components/Radio';
import Switch from 'components/Switch';
import Input from 'components/Input';
import Select from 'components/Select';

// demo start
const { Item, Size } = Form;
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
                            options={Size.map(value => ({ value }))}
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
