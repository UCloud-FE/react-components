import React from 'react';

import Form from 'src/components/Form';
import Input from 'src/components/Input';

// demo start
const { Item } = Form;
const horizontalLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const horizontalLayout6 = {
    labelCol: {
        span: 6
    },
    controllerCol: {
        span: 6
    }
};
const Demo = () => (
    <Form>
        <Item label="横向布局 3-9" {...horizontalLayout}>
            <Input block />
        </Item>
        <Item label="横向布局 6-6" {...horizontalLayout6}>
            <Input block />
        </Item>
        <Item label="默认布局">
            <Input block />
        </Item>
    </Form>
);
// demo end

export default Demo;
