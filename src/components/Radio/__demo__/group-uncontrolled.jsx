import React from 'react';
import Radio from 'components/Radio';

// demo start
const options = [1, 2, 3];
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Radio.Group onChange={console.log} value={2} options={options.map(v => ({ value: v }))} />
        </div>
        <div className="demo-wrap">
            <Radio.Group onChange={console.log} defaultValue={2} options={options.map(v => ({ value: v }))} />
        </div>
    </div>
);
// demo end

export default Demo;
