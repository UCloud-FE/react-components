import React from 'react';

import Calendar from 'src/components/Calendar';

// demo start
const Demo = () => (
    <div>
        <Calendar
            type="month"
            onSelect={v => console.log('select', v)}
            onChange={v => console.log('change', v)}
            rules={{ range: [Date.now() - 3 * 30 * 24 * 60 * 60 * 1000, Date.now() + 3 * 30 * 24 * 60 * 60 * 1000] }}
        />
    </div>
);
// demo end

export default Demo;
