import React from 'react';
import Tooltip from 'components/Tooltip';
import Button from 'components/Button';

// demo start
const { Theme } = Tooltip;

const Demo = () => (
    <div>
        {Theme.map(theme => (
            <div className="demo-wrap" key={theme}>
                <Tooltip theme={theme} popup={<p>tooltip message</p>} visible>
                    <Button>Hover</Button>
                </Tooltip>
            </div>
        ))}
    </div>
);
// demo end

export default Demo;
