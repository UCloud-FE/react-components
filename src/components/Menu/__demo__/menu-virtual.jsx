import React from 'react';

import Menu from 'src/components/Menu';

// demo start

const generateItems = (count, prefix, need) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (need && i === 5) {
            subItems = generateItems(6, key);
        }
        const item = {
            key: key,
            title: key
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = 100000;
    const menuItems = generateItems(itemCount, prefix, true);
    return menuItems;
};

const dataSource = generateGroupData(0, 'root');

const render = children => {
    return children.map(item =>
        item.children ? (
            <Menu.SubMenu key={item.key} title={item.title}>
                {render(item.children)}
            </Menu.SubMenu>
        ) : (
            <Menu.Item key={item.key}>{item.title}</Menu.Item>
            // <div key={item.key}>{item.title}</div>
        )
    );
};

const Demo = () => (
    <div>
        <h3>不支持 collapse 类 SubMenu，子菜单目前不支持虚拟列表</h3>
        <div className="demo-wrap">
            <h3>为了防止滚动时由于渲染内容宽度不一致导致的宽度变化，可以加上固定宽度</h3>
            <Menu multiple showSelectAll onChange={console.log} style={{ width: 150 }} virtualList>
                {render(dataSource)}
            </Menu>
        </div>
        <div className="demo-wrap">
            <h3>指定滚动高度</h3>
            <Menu multiple showSelectAll onChange={console.log} style={{ width: 150 }} virtualList={{ height: 500 }}>
                {render(dataSource)}
            </Menu>
        </div>
        <div className="demo-wrap">
            <h3>简易模式，不会关注元素高度变化，会有更好的性能</h3>
            <Menu multiple showSelectAll onChange={console.log} style={{ width: 150 }} virtualList={{ simple: true }}>
                {render(dataSource)}
            </Menu>
        </div>
    </div>
);
// demo end

export default Demo;
