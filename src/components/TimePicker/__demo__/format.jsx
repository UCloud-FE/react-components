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
                <TimePicker format="H:m:s" />
            </DemoWrap>
            <DemoWrap>
                <TimePicker format="HH - mm - ss" />
            </DemoWrap>
            <DemoWrap>
                <TimePicker format="HH:mm" />
            </DemoWrap>
            <DemoWrap>
                <TimePicker format="HH" />
            </DemoWrap>
        </div>
    );
};
// demo end

export default Demo;
