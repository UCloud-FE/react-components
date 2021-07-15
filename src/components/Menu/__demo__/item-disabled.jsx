import React from 'react';
import Menu from 'src/components/Menu';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Menu onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2" disabled>
                    Menu 2 - disabled
                </Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
            </Menu>
        </div>
    </div>
);
// demo end

export default Demo;
