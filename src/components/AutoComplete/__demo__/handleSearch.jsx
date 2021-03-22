import React from 'react';

import AutoComplete from 'src/components/AutoComplete';

// demo start
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
const handleSearch = (item, searchValue) => {
    return item.value.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0;
};
const Demo = () => {
    return (
        <>
            <h2>自定义搜索，忽略大小写匹配</h2>
            <AutoComplete options={options} onChange={console.log} defaultValue={'item'} handleSearch={handleSearch} />
            <h2>关闭筛选，展示所有选项</h2>
            <AutoComplete options={options} onChange={console.log} defaultValue={'test'} handleSearch={false} />
        </>
    );
};
// demo end

export default Demo;
