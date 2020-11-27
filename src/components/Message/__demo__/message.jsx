import React from 'react';

import Message from 'src/components/Message';
import Button from 'src/components/Button';

// demo start
const { StyleType } = Message;
const Demo = () => {
    return (
        <div>
            {StyleType.map(styleType => (
                <div key={styleType} className="demo-wrap">
                    <Message styleType={styleType}>this is a message</Message>
                </div>
            ))}
            <Button
                onClick={() => Message.message(<div>this is a message</div>, undefined, () => console.log('onClose'))}
            >
                show message
            </Button>
        </div>
    );
};
// demo end

export default Demo;
