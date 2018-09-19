import React from 'react';
import Notice from 'components/Notice';

// demo start
const { StyleType } = Notice;
const layout = { style: { marginBottom: 8 } };
const Demo = () => (
    <div>
        {StyleType.map(styleType => (
            <Notice
                key={styleType}
                styleType={styleType}
                onClose={e => {
                    console.log('closed', styleType);
                }}
                {...layout}
            >
                Notice content
            </Notice>
        ))}
    </div>
);
// demo end

export default Demo;
