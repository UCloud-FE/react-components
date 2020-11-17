import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['center', 'flex-start', 'flex-end', 'space-between', 'space-around'].map(alignContent => (
            <div className="demo-wrap" key={alignContent}>
                <h2>alignContent: {alignContent}</h2>
                <Box container alignContent={alignContent} wrap="wrap" spacing="md" height="200px">
                    {new Array(15).fill(null).map((v, i) => (
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
