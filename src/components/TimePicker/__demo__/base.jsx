import React from 'react';

import TimePicker from 'src/components/TimePicker';
import Popover from 'src/components/Popover';

// demo start
const Demo = () => {
    const [v, setV] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    const handleChange = v => {
        setV(v);
        console.log(v);
    };
    return (
        <>
            <Popover trigger={['click']} popup={<TimePicker onChange={handleChange} />}>
                <span>XXX: {v + ''}</span>
            </Popover>
            <span onClick={() => setVisible(true)}>click</span>
            {visible && <TimePicker onChange={handleChange} />}
        </>
    );
};
// demo end

export default Demo;
