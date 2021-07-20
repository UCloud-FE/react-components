import React from 'react';

import Tooltip from 'src/components/Tooltip';
import Button from 'src/components/Button';

// demo start
const { Theme } = Tooltip;

const Demo = () => (
    <div>
        {Theme.map(theme => (
            <div className="demo-wrap" key={theme}>
                <Tooltip theme={theme} popup="tooltip message" visible>
                    <Button>Hover</Button>
                </Tooltip>
            </div>
        ))}
    </div>
);
// demo end

export default Demo;
