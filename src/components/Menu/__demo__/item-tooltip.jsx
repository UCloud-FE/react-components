import React from 'react';
import Menu from 'components/Menu';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Menu onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2" disabled tooltip="提示">
                    Menu 2 - disabled
                </Menu.Item>
                <Menu.Item itemKey="3" tooltip="提示">
                    Menu 3
                </Menu.Item>
                <Menu.Item
                    itemKey="4"
                    tooltip={
                        <span>
                            node 提示：
                            <a href="./" target="_blank">
                                地址
                            </a>
                        </span>
                    }
                >
                    Menu 4
                </Menu.Item>
                <Menu.Item
                    itemKey="5"
                    tooltip={{
                        theme: 'dark',
                        popup: '自定义 tooltip 提示'
                    }}
                >
                    Menu 5
                </Menu.Item>
            </Menu>
        </div>
    </div>
);
// demo end

export default Demo;
