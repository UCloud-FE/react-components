import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['center', 'flex-start', 'flex-end', 'space-between', 'space-around'].map(justifyContent => (
            <div className="demo-wrap" key={justifyContent}>
                <h2>justifyContent: {justifyContent}</h2>
                <Box container justifyContent={justifyContent} wrap="wrap" spacing="md">
                    {new Array(6).fill(null).map((v, i) => (
                        <div
                            key={i}
                            style={{
                                height: '30px',
                                width: '100px',
                                background: 'gray',
                                color: 'white',
                                lineHeight: '30px',
                                textAlign: 'center'
                            }}
                        >
                            div - {i}
                        </div>
                    ))}
                </Box>
            </div>
        ))}
    </Box>
);
// demo end

export default Demo;
