import React from 'react';

import Tree from 'src/components/Tree';

// demo start
const values = [];

const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 5), key, depth - 1);
        }
        if (!subItems.length) values.push(key);
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

const dataSource = generateGroupData(generateNumber(2, 6), 'root');

const Demo = () => {
    return (
        <>
            <h2>Controlled</h2>
            <Tree dataSource={dataSource} multiple onChange={console.log} selectedKeys={[values[0]]} />
            <h2>UnControlled</h2>
            <Tree dataSource={dataSource} multiple onChange={console.log} />
        </>
    );
};
// demo end

export default Demo;
