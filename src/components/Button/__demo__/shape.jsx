import React from 'react';

import Button from 'src/components/Button';

// demo start
const Demo = () => {
    return (
        <div>
            <Button onClick={() => console.log('clicked')}>Button</Button>
            <Button shape="circle" styleType="primary" icon="upload" onClick={() => console.log('clicked')} />
            <Button shape="circle" styleType="border" icon="plus" onClick={() => console.log('clicked')} />
            <Button shape="square" styleType="primary" icon="upload" onClick={() => console.log('clicked')} />
            <Button shape="square" styleType="border" icon="plus" onClick={() => console.log('clicked')} />
        </div>
    );
};
// demo end

export default Demo;
