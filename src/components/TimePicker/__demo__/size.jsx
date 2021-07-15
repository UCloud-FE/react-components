import React from 'react';

import demoUtil from 'shared/demoUtil';
import TimePicker from 'src/components/TimePicker';

// demo start
const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            {['sm', 'md', 'lg'].map(size => (
                <DemoWrap key={size}>
                    <TimePicker size={size} />
                </DemoWrap>
            ))}
        </div>
    );
};
// demo end

export default Demo;
