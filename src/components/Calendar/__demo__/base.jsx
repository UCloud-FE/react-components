import React from 'react';

import Calendar from 'src/components/Calendar';

// demo start
const Demo = () => (
    <div>
        <Calendar
            onSelect={v => console.log('select', v)}
            onChange={v => console.log('change', v)}
            rules={{ range: [Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now() + 7 * 24 * 60 * 60 * 1000] }}
        />
    </div>
);
// demo end

export default Demo;
