import React from 'react';
import Message from 'components/Message';
import Button from 'components/Button';

// demo start
const { StyleType } = Message;
const Demo = () => {
    return (
        <div>
            {StyleType.map(styleType => (
                <Message key={styleType} styleType={styleType}>
                    this is a message
                </Message>
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
