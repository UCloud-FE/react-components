import React from 'react';

import AutoComplete from 'src/components/AutoComplete';
import Input from 'src/components/Input';

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
            <h2>自定义宽度</h2>
            <AutoComplete style={{ width: 50 }} />
            <AutoComplete style={{ width: 400 }} />
            <h2>块展示</h2>
            <AutoComplete block />
            <h2>对齐</h2>
            <div>
                <AutoComplete />
                <Input />
            </div>
            <h2>placeholder</h2>
            <AutoComplete placeholder="xxxxxx" />
        </>
    );
};
// demo end

export default Demo;
