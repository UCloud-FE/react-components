import React from 'react';
import Radio from 'src/components/Radio';

// demo start
const options = [1, 2, 3];
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Radio.Group options={options.map(v => ({ value: v }))} />
        </div>
        <div className="demo-wrap">
            <Radio.Group disabled options={options.map(v => ({ value: v }))} />
        </div>
    </div>
);
// demo end

export default Demo;
