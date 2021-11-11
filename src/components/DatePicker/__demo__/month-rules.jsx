import React from 'react';
import DatePicker from 'src/components/DatePicker';
import moment from 'moment';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <DatePicker
                type="month"
                onChange={console.log}
                rules={{
                    range: [
                        moment().set({ hour: 0, minute: 0, second: 0 }).add({ month: -4 }),
                        moment().set({ hour: 0, minute: 0, second: 0 }).add({ month: 4 })
                    ]
                }}
            />
        </div>
    </div>
);
// demo end

export default Demo;
