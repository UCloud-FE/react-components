import React from 'react';

import Tree from 'src/components/Tree';
import Button from 'src/components/Button';
import Combine from 'src/components/Combine';
import Box from 'src/components/Box';
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

const Demo = () => {
    const ref = React.useRef();
    const handleSearch = React.useCallback(async (searchValue, dataSource) => {
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
    }, []);
    return (
        <>
            <DemoWrap>
                <Tree
                    dataSource={_dataSource}
                    multiple
                    onChange={console.log}
                    collapseProps={{
                        onChange: console.log
                    }}
                    search
                />
            </DemoWrap>
            <DemoWrap>
                <h2>自定义模拟后端搜索</h2>
                <Tree
                    dataSource={_dataSource}
                    multiple
                    onChange={console.log}
                    collapseProps={{
                        onChange: console.log
                    }}
                    search={{ handleSearch }}
                />
            </DemoWrap>
            <DemoWrap>
                <h2>搜索+全选等，搜索结果页面后的全选、反选、取消选择针对的是当前搜索结果</h2>
                <Box container spacing="md" direction="column">
                    <Combine>
                        <Button styleType="primary" onClick={() => ref.current.selectAll()}>
                            全选
                        </Button>
                        <Button onClick={() => ref.current.inverse()}>反选</Button>
                        <Button onClick={() => ref.current.unSelectAll()}>取消选择</Button>
                    </Combine>
                    <Tree
                        dataSource={_dataSource}
                        multiple
                        onChange={console.log}
                        collapseProps={{
                            onChange: console.log
                        }}
                        search
                        ref={ref}
                    />
                </Box>
            </DemoWrap>
        </>
    );
};

// demo end

export default Demo;
