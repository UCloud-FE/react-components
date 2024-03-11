// @ts-nocheck
import { Form, Input, Radio, Select, Slider, Switch, Upload } from '@ucloud-fe/react-components';
import React from 'react';
const { Group, Item, SubArea } = Form;

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
                <Form>
                    <Group title="Group 1">
                        <Item label="upload" {...itemLayout}>
                            <Upload />
                        </Item>
                        <Item label="switch" {...itemLayout}>
                            <Switch />
                        </Item>
                    </Group>
                    <Group title="Group 2">
                        <Item label="slider" {...itemLayout}>
                            <Slider defaultValue={10} />
                        </Item>
                        <Item label="input" {...itemLayout}>
                            <Input />
                        </Item>
                    </Group>
                </Form>

                <Group title="status - 状态">
                    <Form>
                        {['default', 'success', 'warning', 'error', 'loading'].map(status => (
                            <Item
                                key={status}
                                label={`tip - ${status}`}
                                status={status}
                                {...itemLayout}
                                tip={{ content: `${status} - 提示` }}
                            >
                                <Input />
                            </Item>
                        ))}
                    </Form>
                </Group>
                <Group title="SubArea">
                    <Form>
                        <Item label="upload" {...itemLayout}>
                            <Upload />
                        </Item>
                        <Item label="switch" {...itemLayout}>
                            <Switch />
                            <SubArea>
                                <Item label="slider" {...itemLayout}>
                                    <Slider defaultValue={10} />
                                </Item>
                                <Item label="input" {...itemLayout}>
                                    <Input />
                                </Item>
                            </SubArea>
                        </Item>
                        <Item label="test" {...itemLayout}>
                            <SubArea>
                                <Item label="slider" {...itemLayout}>
                                    <Slider defaultValue={10} />
                                </Item>
                                <Item label="input" {...itemLayout}>
                                    <Input />
                                </Item>
                            </SubArea>
                        </Item>
                    </Form>
                </Group>
            </div>
        );
    }
}
// demo end

export default Demo;
