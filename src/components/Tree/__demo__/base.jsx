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
        return {
            value: key,
            title: key,
            children: subItems,
            disabled: Math.random() > 0.8
        };
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const dataSource = generateGroupData(generateNumber(2, 4), 'root');
const Demo = () => <Tree dataSource={dataSource} multiple onOpenKeysChange={console.log} />;
// demo end

export default Demo;
