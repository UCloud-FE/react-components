import React from 'react';
import DatePicker from 'src/components/DatePicker';

// demo start
const Demo = () => (
    <div>
        {['date', 'month'].map(type => (
            <div className="demo-wrap" key={type}>
                <DatePicker.Range type={type} onChange={v => console.log(v)} />
            </div>
        ))}
    </div>
);
// demo end

export default Demo;
