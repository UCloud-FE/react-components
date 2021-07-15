import React from 'react';
import Radio from 'src/components/Radio';

// demo start
const { Size } = Radio;
const Demo = () => (
    <div>
        {Size.map(size => (
            <div className="demo-wrap" key={size}>
                <Radio size={size}>{size}</Radio>
            </div>
        ))}
    </div>
);
// demo end

export default Demo;
