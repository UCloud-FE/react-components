import React from 'react';
import Badge from 'components/Badge';

// demo start
const { Placement } = Badge;
const Demo = () => (
    <div className="demo-wrap">
        {Placement.map(placement => (
            <Badge
                value={100}
                style={{ marginTop: 10, marginRight: 50, display: 'inline-block' }}
                placement={placement}
                key={placement}
            >
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        ))}
    </div>
);
// demo end

export default Demo;
