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
const Demo = () => (
    <Form itemProps={{ ...horizontalLayout }}>
        <Item help="帮助内容" label="label" required>
            <Input />
        </Item>
    </Form>
);
// demo end

export default Demo;
