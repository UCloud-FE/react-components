import React from 'react';

import Calendar from 'src/components/Calendar';

// demo start
const Demo = () => (
    <div>
        <Calendar
            value={null}
            onSelect={v => console.log('select', v)}
            onChange={v => console.log('change', v)}
            rangeValue={[
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            ]}
        />
    </div>
);
// demo end

export default Demo;
