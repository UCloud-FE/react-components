import React from 'react';

import Badge from 'src/components/Badge';
import demoUtil from 'shared/demoUtil';

// demo start
const { DemoWrap, DemoBlock } = demoUtil;
const Demo = () => (
    <DemoWrap>
        <DemoBlock>
            <Badge value={100} badgeStyle={{ background: 'white', color: 'black', border: '1px solid #ddd' }}>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
        <DemoBlock>
            <Badge value={100} dot badgeStyle={{ background: 'blue' }}>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
    </DemoWrap>
);
// demo end

export default Demo;
