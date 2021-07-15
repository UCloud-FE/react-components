import React from 'react';
import Radio from 'src/components/Radio';

// demo start
const { Size } = Radio;
const options = [1, 2, 3];
const Demo = () => (
    <div>
        {Size.map(size => (
            <div className="demo-wrap" key={size}>
                <Radio.Group size={size} options={options.map(v => ({ value: v, styleType: 'button' }))} />
            </div>
        ))}
    </div>
);
// demo end

export default Demo;
