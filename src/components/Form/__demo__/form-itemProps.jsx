import React from 'react';

import Form from 'src/components/Form';
import Upload from 'src/components/Upload';
import Switch from 'src/components/Switch';
import Slider from 'src/components/Slider';
import Input from 'src/components/Input';

// demo start
const { Group, Item } = Form;
const sharedItemProps = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const Demo = () => (
    <Form itemProps={sharedItemProps}>
        <Group title="Group 1">
            <Item label="upload">
                <Upload />
            </Item>
            <Item label="switch">
                <Switch />
            </Item>
        </Group>
        <Group title="Group 2">
            <Item label="slider">
                <Slider defaultValue={10} />
            </Item>
            <Item label="input">
                <Input />
            </Item>
        </Group>
    </Form>
);
// demo end

export default Demo;
