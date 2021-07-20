import React from 'react';

import Tooltip from 'src/components/Tooltip';
import Button from 'src/components/Button';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Tooltip popup="tooltip message" visible>
                <Button>Hover</Button>
            </Tooltip>
        </div>
        <div className="demo-wrap">
            <Tooltip popup="tooltip message" arrow={false} visible>
                <Button>Hover</Button>
            </Tooltip>
        </div>
    </div>
);
// demo end

export default Demo;
