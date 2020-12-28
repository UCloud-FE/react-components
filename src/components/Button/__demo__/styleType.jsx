import React from 'react';

import Button from 'src/components/Button';

// demo start
const { StyleTypes } = Button;

const Demo = () => {
    return (
        <div>
            {StyleTypes.map(styleType => (
                <Button styleType={styleType} key={'key' + styleType} onClick={() => console.log('clicked')}>
                    Button
                </Button>
            ))}
        </div>
    );
};
// demo end

export default Demo;
