import React from 'react';
import Message from 'components/Message';
import Button from 'components/Button';

// demo start

const methods = ['message', 'loading', 'success', 'warning', 'error'];
const messages = [
    'This is a message',
    'This is a very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong message',
    {
        title: 'Message Title'
    },
    {
        title: 'Message Title',
        children: 'This is a very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong message'
    },
    {
        title: 'Message Title',
        footer: (
            <div>
                <Button>Button One</Button>
                <Button>Button Two</Button>
            </div>
        )
    },
    {
        title: 'Message Title',
        children: 'This is a very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong message',
        footer: (
            <div>
                <Button>Button One</Button>
            </div>
        )
    }
];
const random = arr => {
    return arr[(Math.random() * arr.length) | 0];
};
const Demo = () => {
    return (
        <div>
            <Button
                onClick={() =>
                    Message.config({
                        duration: null
                    })
                }
            >
                change duration to null
            </Button>
            <Button
                onClick={() =>
                    Message.config({
                        duration: 4500,
                        top: 20
                    })
                }
            >
                reset config
            </Button>
            <div className="demo-wrap">
                <Button
                    style={{ width: 150 }}
                    onClick={() => {
                        Message[random(methods)](random(messages, undefined, () => console.log('onClose')));
                    }}
                >
                    A Random Message
                </Button>
            </div>
        </div>
    );
};
// demo end

export default Demo;
