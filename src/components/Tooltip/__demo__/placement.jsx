import React from 'react';

import Tooltip from 'src/components/Tooltip';
import Button from 'src/components/Button';

// demo start
const { Placement } = Tooltip;

const Demo = () => (
    <div>
        {Placement.map(placement => (
            <div key={placement} style={{ margin: '40px 80px', display: 'inline-block', position: 'relative' }}>
                <Tooltip placement={placement} popup={placement} visible>
                    <Button icon="ai">Button</Button>
                </Tooltip>
            </div>
        ))}
    </div>
);
// demo end

export default Demo;
