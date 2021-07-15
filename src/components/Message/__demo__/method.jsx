import React from 'react';
import Message from 'src/components/Message';
import Button from 'src/components/Button';

// demo start
const Demo = () => {
    return (
        <div>
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
