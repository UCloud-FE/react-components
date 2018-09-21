import React from 'react';
import Button from 'components/Button';

// demo start
const Demo = () => (
    <div>
        <Button onClick={() => console.log('clicked')}>Button</Button>
        <Button disabled onClick={() => console.log('clicked')}>
            Button
        </Button>
    </div>
);
// demo end

export default Demo;
