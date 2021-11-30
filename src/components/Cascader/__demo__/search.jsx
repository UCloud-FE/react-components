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
            disabled: Math.random() > 0.8
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

const wait = t => new Promise(resolve => setTimeout(resolve, t));

const handleSearch = async (searchValue, dataSource) => {
    if (!searchValue) return { dataSource, count: null };
    await wait(2000);
    let count = 0;
    const finalExpandedKeyMap = {};
    const handle = children => {
        let childrenHit = false;
        const newChildren = [];
        children.forEach(child => {
            const { title, key, children } = child;
            const override = {};
            let searchHit = false;
            if (typeof title === 'string') {
                searchHit = index >= 0;
                const index = (Math.random() * title.length) | 0;
                searchHit = index + searchValue.length < title.length;
                if (searchHit) {
                    count++;
                    const beforeStr = title.substr(0, index);
                    const afterStr = title.substr(index + searchValue.length);
                    override.title = (
                        <>
                            {beforeStr}
                            <span style={{ background: 'red' }}>{searchValue}</span>
                            {afterStr}
                        </>
                    );
                }
            }
            if (children) {
                const [_children, _searchHit] = handle(children);
                override.children = _children;
                searchHit = _searchHit || searchHit;
                if (_searchHit) finalExpandedKeyMap[key] = 1;
            }
            if (searchHit) {
                childrenHit = true;
                newChildren.push({ ...child, ...override });
            }
        });
        return [newChildren, childrenHit];
    };
    const dataSourceAfterSearch = handle(dataSource)[0];
    return {
        dataSource: dataSourceAfterSearch,
        count,
        openKeys: Object.keys(finalExpandedKeyMap)
    };
};

const Demo = () => {
    return (
        <>
            <DemoWrap>
                <h2>使用默认搜索逻辑</h2>
                <Cascader dataSource={_dataSource} onChange={console.log} search />
            </DemoWrap>
            <DemoWrap>
                <h2>自定义模拟后端搜索</h2>
                <Cascader dataSource={_dataSource} onChange={console.log} search={{ handleSearch }} />
            </DemoWrap>
        </>
    );
};

// demo end

export default Demo;
