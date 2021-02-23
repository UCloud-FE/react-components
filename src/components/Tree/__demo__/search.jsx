import React from 'react';

import Tree from 'src/components/Tree';
import demoUtil from 'tests/shared/demoUtil';
import Input from 'src/components/Input';

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
            key: key,
            title: key,
            children: subItems,
            disabled: Math.random() > 0.8
        };
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(2, 4);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(3, 3), 'root');

const { DemoWrap } = demoUtil;
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            multiple: false,
            disabled: false,
            dataSource: _dataSource,
            dataSourceAfterSearch: _dataSource,
            expandedKeys: []
        };
    }
    onSearch(searchValue) {
        const { dataSource, expandedKeys } = this.state;
        const finalExpandedKeyMap = {};
        expandedKeys.forEach(key => (finalExpandedKeyMap[key] = 1));
        const handle = children => {
            let childrenHit = false;
            const newChildren = children.map(child => {
                const { title, key, children } = child;
                const override = {};
                const index = title.indexOf(searchValue);
                let searchHit = index >= 0;
                if (searchHit) {
                    const beforeStr = title.substr(0, index);
                    const afterStr = title.substr(index + searchValue.length);
                    override.title = (
                        <span>
                            {beforeStr}
                            <span style={{ background: 'yellow' }}>{searchValue}</span>
                            {afterStr}
                        </span>
                    );
                }
                if (children) {
                    const [_children, _searchHit] = handle(children);
                    override.children = _children;
                    searchHit = _searchHit || searchHit;
                    if (_searchHit) finalExpandedKeyMap[key] = 1;
                }
                if (searchHit) childrenHit = true;
                return {
                    ...child,
                    ...override
                };
            });
            return [newChildren, childrenHit];
        };
        const dataSourceAfterSearch = handle(dataSource)[0];
        console.log(finalExpandedKeyMap);
        this.setState({ dataSourceAfterSearch, expandedKeys: Object.keys(finalExpandedKeyMap) });
    }
    render() {
        const { dataSourceAfterSearch, expandedKeys } = this.state;
        console.log(expandedKeys);
        return (
            <DemoWrap>
                <Input.Search block onSearch={v => this.onSearch(v)} />
                <Tree
                    dataSource={dataSourceAfterSearch}
                    multiple
                    onChange={console.log}
                    collapseProps={{
                        onChange: expandedKeys => this.setState({ expandedKeys }),
                        openKeys: expandedKeys
                    }}
                />
            </DemoWrap>
        );
    }
}
// demo end

export default Demo;
