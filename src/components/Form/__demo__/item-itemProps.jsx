import React from 'react';

import Form from 'src/components/Form';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';

// demo start
const { Item, SubArea, Group } = Form;
const horizontalLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const groupLayout = {
    labelCol: {
        span: 2
    },
    controllerCol: {
        span: 10
    }
};
const subAreaLayout = {
    labelCol: {
        span: 6
    },
    controllerCol: {
        span: 6
    }
};
const Demo = () => (
    <Form itemProps={{ ...horizontalLayout, shareStatus: true }}>
        <Item label={`tip`} status="error" tip="自定义提示">
            <Input />
        </Item>
        <Item label="tip - subarea" tip="自定义提示">
            <SubArea>
                <Item label="test-1" status="error" tip="报错了">
                    <Input />
                </Item>
                <Item label="tet-2">
                    <Input />
                </Item>
            </SubArea>
        </Item>
        <Group title="覆盖布局与状态共享" itemProps={{ ...groupLayout }}>
            <Item
                label={`tip - custom`}
                status="error"
                tip={{ icon: <Icon type="arrow-left" />, content: `自定义提示` }}
            >
                <Input />
            </Item>
            <Item label="tip - subarea" tip="覆盖布局">
                <SubArea itemProps={{ ...subAreaLayout }}>
                    <Item label="test-1" status="error" tip="报错了">
                        <Input />
                    </Item>
                    <Item label="tet-2">
                        <Input />
                    </Item>
                </SubArea>
            </Item>
        </Group>
    </Form>
);
// demo end

export default Demo;
