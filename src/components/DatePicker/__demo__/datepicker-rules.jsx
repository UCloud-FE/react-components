import React from 'react';
import DatePicker from 'src/components/DatePicker';
import moment from 'moment';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <DatePicker
                onChange={v => console.log(v.format())}
                rules={{
                    range: [
                        moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: -7 }),
                        moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: 7 })
                    ]
                }}
            />
        </div>
    </div>
);
// demo end

export default Demo;
