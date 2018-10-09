import React from 'react';
import Badge from 'components/Badge';

// demo start
const Demo = () => (
    <div className="demo-wrap">
        <Badge value="string" style={{ marginTop: 10, marginRight: 50, display: 'inline-block' }}>
            <div style={{ width: 50, height: 50, background: '#ddd' }} />
        </Badge>
        <Badge
            value={<span style={{ fontWeight: 'bolder' }}>node</span>}
            style={{ marginTop: 10, marginRight: 50, display: 'inline-block' }}
            hideWhenZero
        >
            <div style={{ width: 50, height: 50, background: '#ddd' }} />
        </Badge>
    </div>
);
// demo end

export default Demo;
