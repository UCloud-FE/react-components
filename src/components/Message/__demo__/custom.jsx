import React from 'react';

import Message from 'src/components/Message';
import Button from 'src/components/Button';

// demo start

const getRandomColor = () => {
    const randomNumber = () => (Math.random() * 256) | 0;
    return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
};
const messages = [];
let i = 0;
const Demo = () => {
    return (
        <div>
            <Button
                onClick={() => {
                    messages.push(
                        Message.popup(
                            <div
                                style={{
                                    background: '#fff',
                                    border: '1px solid #ddd',
                                    fontSize: '15px',
                                    padding: '10px',
                                    width: '200px',
                                    margin: '0 auto',
                                    marginBottom: '5px',
                                    borderRadius: '20px',
                                    textAlign: 'center',
                                    color: getRandomColor()
                                }}
                            >
                                This is the {i++} message{' '}
                            </div>,
                            null,
                            () => console.log('onClose')
                        )
                    );
                }}
            >
                show message
            </Button>
            <Button
                onClick={() => {
                    messages.length && messages.shift().destroy();
                }}
            >
                close message
            </Button>
        </div>
    );
};
// demo end

export default Demo;
