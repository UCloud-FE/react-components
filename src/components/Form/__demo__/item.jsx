import React from 'react';

import Form from 'src/components/Form';
import Upload from 'src/components/Upload';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';

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
        {['default', 'success', 'warning', 'error', 'loading'].map(status => (
            <Item
                key={status}
                label={`tip - ${status}`}
                tip={{ status, content: `${status} - 提示` }}
                {...horizontalLayout}
            >
                <Input />
            </Item>
        ))}
        <Item
            label={`tip - custom`}
            tip={{ icon: <Icon type="arrow-left" />, status: 'error', content: `自定义提示` }}
            {...horizontalLayout}
        >
            <Input />
        </Item>
    </Form>
);
// demo end

export default Demo;
