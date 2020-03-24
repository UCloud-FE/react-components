import React from 'react';

import Tooltip from 'src/components/Tooltip';
import Button from 'src/components/Button';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Tooltip popup={<p>tooltip message</p>} visible>
                <Button>Hover</Button>
            </Tooltip>
        </div>
        <div className="demo-wrap">
            <Tooltip popup={<p>tooltip message</p>} arrow={false} visible>
                <Button>Hover</Button>
            </Tooltip>
        </div>
    </div>
);
// demo end

export default Demo;
