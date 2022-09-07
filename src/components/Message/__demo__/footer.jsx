import React from 'react';

import Message from 'src/components/Message';
import Link from 'src/components/Link';

// demo start
const Demo = () => {
    return (
        <div>
            <div className="demo-wrap">
                <Message
                    title="Message Title"
                    footer={
                        <div style={{ display: 'flex', flexDirection: 'row', fontWeight: 600, fontSize: 14 }}>
                            <Link href="#" target="_blank" style={{ marginRight: 8, textDecoration: 'none' }}>
                                点击操作
                            </Link>
                            <Link href="#" target="_blank" style={{ textDecoration: 'none' }}>
                                点击操作
                            </Link>
                        </div>
                    }
                >
                    this is a message
                </Message>
            </div>
        </div>
    );
};
// demo end

export default Demo;
