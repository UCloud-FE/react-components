import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['nowrap', 'wrap', 'wrap-reverse'].map(wrap => (
            <div className="demo-wrap" key={wrap}>
                <h2>wrap: {wrap}</h2>
                <Box container wrap={wrap} spacing={['md', 'md']}>
                    {new Array(28).fill(null).map((v, i) => (
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
