import React from 'react';

import Cascader from 'src/components/Cascader';
import demoUtil from 'shared/demoUtil';

// demo start

const { DemoWrap } = demoUtil;
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
            width: depth === 3 ? 500 : 100
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(2, 4);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(3, 3), 'root');

const Demo = () => {
    return (
        <>
            <DemoWrap>
                <Cascader dataSource={_dataSource} onChange={console.log} search />
            </DemoWrap>
        </>
    );
};

// demo end

export default Demo;
