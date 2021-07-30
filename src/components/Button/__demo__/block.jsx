import React from 'react';

import Button from 'src/components/Button';

// demo start
const Demo = () => (
    <div>
        <Button onClick={() => console.log('clicked')}>Button</Button>
        <Button block onClick={() => console.log('clicked')}>
            Button
        </Button>
    </div>
);
// demo end

export default Demo;
