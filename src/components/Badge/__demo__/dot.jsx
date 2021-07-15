import React from 'react';

import Badge from 'src/components/Badge';
import demoUtil from 'shared/demoUtil';

// demo start
const { DemoWrap, DemoBlock } = demoUtil;
const Demo = () => (
    <DemoWrap>
        <DemoBlock>
            <Badge value={100}>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
        <DemoBlock>
            <Badge value={100} dot>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
    </DemoWrap>
);
// demo end

export default Demo;
