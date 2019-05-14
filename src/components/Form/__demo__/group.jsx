import React from 'react';
import Form from 'components/Form';
import Upload from 'components/Upload';
import Switch from 'components/Switch';
import Slider from 'components/Slider';
import Input from 'components/Input';

// demo start
const { Group, Item } = Form;
const horizontalLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const Demo = () => (
    <Form>
        <Group title="Group 1">
            <Item label="upload" {...horizontalLayout}>
                <Upload />
            </Item>
            <Item label="switch" {...horizontalLayout}>
                <Switch />
            </Item>
        </Group>
        <Group title="Group 2">
            <Item label="slider" {...horizontalLayout}>
                <Slider defaultValue={10} />
            </Item>
            <Item label="input" {...horizontalLayout}>
                <Input />
            </Item>
        </Group>
    </Form>
);
// demo end

export default Demo;
