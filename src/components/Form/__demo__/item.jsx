import React from 'react';
import Form from 'components/Form';
import Upload from 'components/Upload';

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
const verticalLayout = {};
const Demo = () => (
    <Form>
        <Item label="横向布局" {...horizontalLayout}>
            <Upload style={{ marginBottom: 5 }} />
            <Upload />
        </Item>
        <Item label="竖向布局" {...verticalLayout}>
            <Upload style={{ marginBottom: 5 }} />
            <Upload />
        </Item>
    </Form>
);
// demo end

export default Demo;
