import React from 'react';

import Tree from 'src/components/Tree';

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
            title: key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const dataSource = generateGroupData(generateNumber(2, 4), 'root');
const Demo = () => <Tree dataSource={dataSource} multiple />;
// demo end

export default Demo;
