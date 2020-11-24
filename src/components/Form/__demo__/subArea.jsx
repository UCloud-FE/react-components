import React from 'react';

import Form from 'src/components/Form';
import Upload from 'src/components/Upload';
import Switch from 'src/components/Switch';
import Slider from 'src/components/Slider';
import Input from 'src/components/Input';

// demo start
const { SubArea, Item } = Form;
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
            <SubArea>
                <Item label="slider" {...horizontalLayout}>
                    <Slider defaultValue={10} />
                </Item>
                <Item label="input" {...horizontalLayout}>
                    <Input />
                </Item>
            </SubArea>
        </Item>
        <Item label="test" {...horizontalLayout}>
            <SubArea>
                <Item label="slider" {...horizontalLayout}>
                    <Slider defaultValue={10} />
                </Item>
                <Item label="input" {...horizontalLayout}>
                    <Input />
                </Item>
            </SubArea>
        </Item>
    </Form>
);
// demo end

export default Demo;
