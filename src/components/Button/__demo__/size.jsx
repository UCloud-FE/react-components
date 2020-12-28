import React from 'react';

import Button from 'src/components/Button';

// demo start
const { Sizes } = Button;

const Demo = () => {
    return (
        <div>
            {Sizes.map(size => (
                <Button size={size} key={size} onClick={() => console.log('clicked')}>
                    Button
                </Button>
            ))}
        </div>
    );
};
// demo end

export default Demo;
