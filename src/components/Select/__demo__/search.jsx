import React from 'react';

import Select from 'src/components/Select';

// demo start
const { Option } = Select;

const Demo = () => {
    const [searchValue, setSearchValue] = React.useState('1');
    const handleSearchChange = React.useCallback(v => {
        Math.random() > 0.5 && setSearchValue(v);
    }, []);
    return (
        <div>
            <div className="demo-wrap">
                <Select defaultValue={1} search>
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </div>
            <h2>自定义搜索</h2>
            <div className="demo-wrap">
                <Select defaultValue={1} search={{ handleSearch: (s, v) => v < s }}>
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </div>
            <h2>搜索值受控</h2>
            <div className="demo-wrap">
                <Select
                    defaultValue={1}
                    search={{ handleSearch: (s, v) => v < s, onSearchValueChange: handleSearchChange, searchValue }}
                >
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </div>
            <h2>options search</h2>
            <div className="demo-wrap">
                <Select
                    search
                    options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option ${i}` }))}
                ></Select>
            </div>
        </div>
    );
};
// demo end

export default Demo;
