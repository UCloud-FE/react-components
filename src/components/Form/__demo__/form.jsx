import React from 'react';
import Form from 'components/Form';
import Upload from 'components/Upload';

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
const Demo = () => (
    <Form>
        <Item label="上传文件" {...itemLayout}>
            <Upload style={{ marginBottom: 5 }} />
            <Upload />
        </Item>
    </Form>
);
// demo end

export default Demo;
