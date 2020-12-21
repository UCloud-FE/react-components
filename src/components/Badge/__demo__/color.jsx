import React from 'react';

import Badge from 'src/components/Badge';
import demoUtil from 'tests/shared/demoUtil';

// demo start
const { DemoWrap, DemoBlock } = demoUtil;
const { Color } = Badge;
const Demo = () => (
    <DemoWrap>
        {Color.map(color => (
            <DemoBlock key={color}>
                <Badge value={100} color={color}>
                    <div style={{ width: 50, height: 50, background: '#ddd' }} />
                </Badge>
            </DemoBlock>
        ))}
        {Color.map(color => (
            <DemoBlock key={color}>
                <Badge value={100} dot color={color}>
                    <div style={{ width: 50, height: 50, background: '#ddd' }} />
                </Badge>
            </DemoBlock>
        ))}
    </DemoWrap>
);
// demo end

export default Demo;
