import React from 'react';
import Radio from 'src/components/Radio';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Radio>common</Radio>
        </div>
        <div className="demo-wrap">
            <Radio disabled>disabled</Radio>
        </div>
    </div>
);
// demo end

export default Demo;
