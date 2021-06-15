import React from 'react';

import Tree from 'src/components/Tree';
import Button from 'src/components/Button';
import Combine from 'src/components/Combine';
import Box from 'src/components/Box';

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

const dataSource = generateGroupData(generateNumber(2, 6), 'root');

const Demo = () => {
    const ref = React.useRef();
    return (
        <>
            <Box container spacing="md" direction="column">
                <Combine>
                    <Button styleType="primary" onClick={() => ref.current.selectAll()}>
                        全选
                    </Button>
                    <Button onClick={() => ref.current.inverse()}>反选</Button>
                    <Button onClick={() => ref.current.unSelectAll()}>取消选择</Button>
                </Combine>
                <Tree key={Math.random()} dataSource={dataSource} multiple onChange={console.log} ref={ref} />
            </Box>
        </>
    );
};
// demo end

export default Demo;
