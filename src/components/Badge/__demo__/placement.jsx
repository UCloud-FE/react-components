import React from 'react';

import Badge from 'src/components/Badge';
import demoUtil from 'shared/demoUtil';

// demo start
const { DemoWrap, DemoBlock } = demoUtil;
const { Placement } = Badge;
const Demo = () => (
    <DemoWrap>
        {Placement.map(placement => (
            <DemoBlock key={placement} lg>
                <Badge value={100} placement={placement}>
                    <div style={{ width: 50, height: 50, background: '#ddd' }} />
                </Badge>
            </DemoBlock>
        ))}
    </DemoWrap>
);
// demo end

export default Demo;
