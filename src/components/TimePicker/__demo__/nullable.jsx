import React from 'react';

import demoUtil from 'tests/shared/demoUtil';
import TimePicker from 'src/components/TimePicker';

// demo start
const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            <DemoWrap>
                <TimePicker />
            </DemoWrap>
            <DemoWrap>
                <TimePicker nullable />
            </DemoWrap>
        </div>
    );
};
// demo end

export default Demo;
