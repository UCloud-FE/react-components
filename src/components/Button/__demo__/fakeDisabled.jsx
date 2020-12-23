import React from 'react';

import Button from 'src/components/Button';
import Tooltip from 'src/components/Tooltip';

// demo start
// eslint-disable-next-line react/prop-types
const Tip = ({ children }) => {
    return <Tooltip popup="popup content">{children}</Tooltip>;
};
const Demo = () => (
    <div>
        <Tip>
            <Button onClick={() => console.log('clicked')}>Button</Button>
        </Tip>
        <Tip>
            <Button disabled onClick={() => console.log('clicked')}>
                Button
            </Button>
        </Tip>
        <Tip>
            <Button disabled fakeDisabled onClick={() => console.log('clicked')}>
                Button
            </Button>
        </Tip>
    </div>
);
// demo end

export default Demo;
