import React from 'react';

import demoUtil from 'shared/demoUtil';
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
            subItems = generateItems(generateNumber(0, 5), key, depth - 1);
        }
        const item = {
            key: key,
            title: ' ✨ ' + key,
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

const _dataSource = generateGroupData(generateNumber(2, 6), 'root');

const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <DemoWrap>
            <Cascader
                dataSource={_dataSource}
                topExtraRender={({ index, items, parents }) => {
                    console.log('items', items);
                    console.log('parents', parents);
                    return index;
                }}
            />
        </DemoWrap>
    );
};
// demo end

export default Demo;
