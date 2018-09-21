import React from 'react';
import Badge from 'components/Badge';

// demo start
const Demo = () => (
    <div className="demo-wrap">
        <Badge
            value={100}
            style={{ marginTop: 10, marginRight: 50, display: 'inline-block' }}
            badgeStyle={{ background: 'white', color: 'black', border: '1px solid #ddd' }}
        >
            <div style={{ width: 50, height: 50, background: '#ddd' }} />
        </Badge>
        <Badge
            value={100}
            style={{ marginTop: 10, marginRight: 50, display: 'inline-block' }}
            dot
            badgeStyle={{ background: 'blue' }}
        >
            <div style={{ width: 50, height: 50, background: '#ddd' }} />
        </Badge>
    </div>
);
// demo end

export default Demo;
