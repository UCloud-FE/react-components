import React from 'react';
import Badge from 'components/Badge';

// demo start
const Demo = () => (
    <div className="demo-wrap">
        <Badge value={10} style={{ marginTop: 10, marginRight: 50, display: 'inline-block' }}>
            <div style={{ width: 50, height: 50, background: '#ddd' }} />
        </Badge>
        <Badge value={10} style={{ marginTop: 10, marginRight: 50, display: 'inline-block' }} maxValue={9}>
            <div style={{ width: 50, height: 50, background: '#ddd' }} />
        </Badge>
    </div>
);
// demo end

export default Demo;
