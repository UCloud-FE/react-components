import React from 'react';

import Form from 'src/components/Form';
import Upload from 'src/components/Upload';
import Switch from 'src/components/Switch';
import Slider from 'src/components/Slider';
import Input from 'src/components/Input';

// demo start
const { SubGroup, Item } = Form;
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
        <Item label="upload" {...horizontalLayout}>
            <Upload />
        </Item>
        <Item label="switch" {...horizontalLayout}>
            <Switch />
            <SubGroup>
                <Item label="slider" {...horizontalLayout}>
                    <Slider defaultValue={10} />
                </Item>
                <Item label="input" {...horizontalLayout}>
                    <Input />
                </Item>
            </SubGroup>
        </Item>
        <Item label="test" {...horizontalLayout}>
            <SubGroup>
                <Item label="slider" {...horizontalLayout}>
                    <Slider defaultValue={10} />
                </Item>
                <Item label="input" {...horizontalLayout}>
                    <Input />
                </Item>
            </SubGroup>
        </Item>
    </Form>
);
// demo end

export default Demo;
