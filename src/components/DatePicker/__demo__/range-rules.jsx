import React from 'react';
import DatePicker from 'components/DatePicker';
import moment from 'moment';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <DatePicker.Range
                onChange={console.log}
                rules={{
                    range: [
                        moment()
                            .set({ hour: 0, minute: 0, second: 0 })
                            .add({ month: -4 }),
                        moment()
                            .set({ hour: 0, minute: 0, second: 0 })
                            .add({ month: 4 })
                    ]
                }}
            />
        </div>
    </div>
);
// demo end

export default Demo;
