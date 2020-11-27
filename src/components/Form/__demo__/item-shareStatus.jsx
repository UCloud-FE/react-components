import React from 'react';

import Form from 'src/components/Form';
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
const Demo = () => (
    <Form>
        {['default', 'success', 'warning', 'error', 'loading'].map(status => (
            <Item
                key={status}
                label={`tip - ${status}`}
                shareStatus
                status={status}
                {...horizontalLayout}
                tip={{ content: `${status} - 提示` }}
            >
                <Input />
            </Item>
        ))}
    </Form>
);
// demo end

export default Demo;
