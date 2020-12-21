import React from 'react';

import Badge from 'src/components/Badge';
import Combine from 'src/components/Combine';
import demoUtil from 'tests/shared/demoUtil';

// demo start
const { DemoWrap } = demoUtil;

const Demo = () => (
    <>
        <DemoWrap>
            <Combine>
                <span>文本</span>
                <Badge value={100} />
            </Combine>
        </DemoWrap>
        <DemoWrap>
            <Combine>
                <span>文本</span>
                <Badge value={100} dot color="primary" />
            </Combine>
        </DemoWrap>
    </>
);
// demo end

export default Demo;
