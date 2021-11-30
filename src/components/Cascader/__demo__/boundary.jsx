import React from 'react';

import Cascader from 'src/components/Cascader';

// demo start

const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 3), key, depth - 1);
        }
        const item = {
            key: key,
            title: '✨ ' + key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(10, 20);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const dataSource = generateGroupData(generateNumber(2, 4), 'root');
const loadDataDataSource = new Array(10).fill(null).map((item, i) => {
    return {
        key: i,
        title: '✨ ' + i,
        disabled: Math.random() > 0.8,
        isParent: true
    };
});
const emptyChildrenDataSource = new Array(10).fill(null).map((item, i) => {
    return {
        key: i,
        title: '✨ ' + i,
        disabled: Math.random() > 0.8,
        children: []
    };
});

const handleSearch = () => {
    throw new Error('search error');
};
const loadData = () => {
    throw new Error('load error');
};

const Demo = () => {
    return (
        <>
            <h3>dataSource 为 null</h3>
            <Cascader dataSource={null} />
            <h3>dataSource 为空数组</h3>
            <Cascader dataSource={[]} />
            <h3>无 dataSource</h3>
            <Cascader />
            <h3>value 为 null</h3>
            <Cascader dataSource={dataSource} value={null} />
            <h3>value 为空数组</h3>
            <Cascader dataSource={dataSource} value={[]} />
            <h3>value 为不存在的项</h3>
            <Cascader dataSource={dataSource} value={['root-xxxxxxx']} />
            <h3>搜索报错</h3>
            <Cascader dataSource={dataSource} search={{ handleSearch }} />
            <h3>加载报错</h3>
            <Cascader dataSource={loadDataDataSource} loadData={loadData} />
            <h3>子菜单为空</h3>
            <Cascader dataSource={emptyChildrenDataSource} />
        </>
    );
};
// demo end

export default Demo;
