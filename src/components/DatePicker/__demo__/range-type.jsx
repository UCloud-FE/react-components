import React from 'react';
import DatePicker from 'components/DatePicker';

// demo start
const { Type } = DatePicker.Range;
const Demo = () => (
    <div>
        {Type.map(type => (
            <div className="demo-wrap" key={type}>
                <DatePicker.Range type={type} onChange={v => console.log(v)} />
            </div>
        ))}
    </div>
);
// demo end

export default Demo;
