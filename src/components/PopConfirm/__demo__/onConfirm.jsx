import React from 'react';

import PopConfirm from 'src/components/PopConfirm';
import Button from 'src/components/Button';

// demo start
const Demo = () => (
    <PopConfirm popup="content" onConfirm={() => console.log('onConfirm')} onCancel={() => console.log('onCancel')}>
        <Button styleType="primary">button</Button>
    </PopConfirm>
);
// demo end

export default Demo;
