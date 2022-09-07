import React from 'react';

import Message from 'src/components/Message';

// demo start
const { StyleType } = Message;
const Demo = () => {
    return (
        <div>
            {StyleType.map(styleType => (
                <div key={styleType} className="demo-wrap">
                    <Message styleType={styleType} title={<div>this is a message</div>} />
                </div>
            ))}
        </div>
    );
};
// demo end

export default Demo;
