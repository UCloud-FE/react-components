import React from 'react';
import Button from 'components/Button';

// demo start
const Demo = () => {
    return (
        <div>
            <Button shape="circle" size="lg" onClick={() => console.log('clicked')}>
                Button
            </Button>
            <Button shape="circle" styleType="primary" size="lg" icon="upload" onClick={() => console.log('clicked')} />
            <Button shape="circle" styleType="border" size="lg" icon="plus" onClick={() => console.log('clicked')} />
        </div>
    );
};
// demo end

export default Demo;
