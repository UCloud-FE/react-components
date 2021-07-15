import React from 'react';
import Message from 'src/components/Message';
import Button from 'src/components/Button';

// demo start
const Demo = () => {
    return (
        <div>
            <Button
                onClick={() =>
                    Message.config({
                        duration: 10000000,
                        top: 200
                    })
                }
            >
                change duration and top
            </Button>
            <Button
                onClick={() =>
                    Message.config({
                        duration: null,
                        top: 0
                    })
                }
            >
                change duration to null
            </Button>
            <Button
                onClick={() =>
                    Message.config({
                        duration: 3000,
                        top: 20
                    })
                }
            >
                reset config
            </Button>
            {['message', 'loading', 'success', 'warning', 'error'].map(type => (
                <div className="demo-wrap" key={type}>
                    <Button
                        style={{ width: 150 }}
                        onClick={() =>
                            Message[type](<div>this is a message</div>, undefined, () => console.log('onClose'))
                        }
                    >
                        {type}
                    </Button>
                </div>
            ))}
        </div>
    );
};
// demo end

export default Demo;
