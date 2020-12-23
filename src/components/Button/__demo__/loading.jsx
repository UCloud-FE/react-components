import React from 'react';

import Button from 'src/components/Button';

// demo start
const Demo = () => {
    return (
        <div>
            <Button loading onClick={() => console.log('clicked')}>
                Button
            </Button>
            <Button loading onClick={() => console.log('clicked')} />
            <Button loading icon="link" styleType="primary" onClick={() => console.log('clicked')} />
        </div>
    );
};
// demo end

export default Demo;
