import React from 'react';

import Tree from 'src/components/Tree';

// demo start
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, _isParent) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        const isParent = Math.random() > 0.5;
        return {
            key: key,
            title: key,
            isParent: _isParent || isParent,
            disabled: Math.random() > 0.8
        };
    });
};

const generateGroupData = prefix => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, true);
    return menuItems;
};

const initDataSource = generateGroupData('root');

const delay = t => new Promise(resolve => setTimeout(() => resolve(), t));
const loadData = async key => {
    await delay(1000);
    return generateItems(generateNumber(0, 5), key);
};

const Demo = () => {
    const [dataSource, setDataSource] = React.useState(initDataSource);
    // 由于存在多个组同时展开的情况，此处因为直接在原引用上修改，不存在问题，如果是重新构建数据，需要注意同步修改 dataSource 导致数据被覆盖的问题
    const _loadData = React.useCallback(
        async parentKey => {
            const children = await loadData(parentKey);
            const loop = arr => {
                let result;
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i];
                    if (item.key === parentKey) {
                        result = item;
                    }
                    if (item.children) {
                        result = loop(item.children);
                    }
                    if (result) {
                        break;
                    }
                }
                return result;
            };
            const target = loop(dataSource);
            if (target) target.children = children;
            setDataSource([...dataSource]);
        },
        [dataSource]
    );

    return (
        <>
            <Tree dataSource={dataSource} onChange={console.log} loadData={_loadData} />
        </>
    );
};
// demo end

export default Demo;
