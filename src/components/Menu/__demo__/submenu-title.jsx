import React from 'react';
import Menu from 'components/Menu';
import Icon from 'components/Icon';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Menu>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
                <Menu.SubMenu subMenuKey="1" title={'SubMenu 1'}>
                    <Menu.Item itemKey="1-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="1-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="1-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="1-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu subMenuKey="2" title={<Icon type="loading" spin />}>
                    <Menu.Item itemKey="2-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="2-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="2-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="2-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    </div>
);
// demo end

export default Demo;
