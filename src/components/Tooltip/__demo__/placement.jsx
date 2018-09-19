import React from 'react';
import Tooltip from 'components/Tooltip';
import Button from 'components/Button';

// demo start
const { Placement } = Tooltip;

const Demo = () => (
    <div>
        {Placement.map(placement => (
            <div key={placement} style={{ margin: '40px 80px', display: 'inline-block', position: 'relative' }}>
                <Tooltip placement={placement} popup={<p>{placement}</p>} visible>
                    <Button icon="ai">Button</Button>
                </Tooltip>
            </div>
        ))}
    </div>
);
// demo end

export default Demo;
