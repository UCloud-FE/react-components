import React from 'react';
import Radio from 'src/components/Radio';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Radio checked={false}>common</Radio>
        </div>
        <div className="demo-wrap">
            <Radio checked>checked</Radio>
        </div>
    </div>
);
// demo end

export default Demo;
