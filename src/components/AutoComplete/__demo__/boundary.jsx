import React from 'react';

import AutoComplete from 'src/components/AutoComplete';

// demo start
const Demo = () => {
    return (
        <>
            <h2>最小宽度</h2>
            <AutoComplete options={[{ value: 'short' }]} />
            <h2>最大宽度</h2>
            <AutoComplete options={[{ value: new Array(100).fill('long').join('-') }]} />
            <h2>滚动</h2>
            <AutoComplete options={new Array(1000).fill('').map((v, i) => ({ value: `Item ${i}` }))} />
            <h2>无 options</h2>
            <AutoComplete />
            <h2>错误 options</h2>
            <AutoComplete options={[{}, '', null]} />
        </>
    );
};
// demo end

export default Demo;
