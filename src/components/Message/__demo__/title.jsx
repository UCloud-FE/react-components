import React from 'react';

import Message from 'src/components/Message';
import Button from 'src/components/Button';

// demo start
const Demo = () => {
    return (
        <div>
            <div className="demo-wrap">
                <Message title="Message Title">this is a message</Message>
            </div>
            <div className="demo-wrap">
                <Message title="Message Title" />
            </div>
            <div className="demo-wrap">
                <Message>this is a message</Message>
            </div>
            <Button
                onClick={() =>
                    Message.message({ title: 'Message Title', children: 'this is a message' }, undefined, () =>
                        console.log('onClose')
                    )
                }
            >
                show message
            </Button>
            <Button
                onClick={() => Message.message({ title: 'Message Title' }, undefined, () => console.log('onClose'))}
            >
                show message
            </Button>
        </div>
    );
};
// demo end

export default Demo;
