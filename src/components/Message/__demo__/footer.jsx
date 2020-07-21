import React from 'react';

import Message from 'src/components/Message';
import Button from 'src/components/Button';

// demo start
const Demo = () => {
    return (
        <div>
            <div className="demo-wrap">
                <Message title="Message Title" footer={<Button>Button</Button>}>
                    this is a message
                </Message>
            </div>
            <Button
                onClick={() =>
                    Message.message(
                        { title: 'Message Title', footer: <Button>Button</Button>, children: 'this is a message' },
                        undefined,
                        () => console.log('onClose')
                    )
                }
            >
                show message
            </Button>
        </div>
    );
};
// demo end

export default Demo;
