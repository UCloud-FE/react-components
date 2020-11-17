import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['center', 'flex-start', 'flex-end', 'stretch'].map(alignItems => (
            <div className="demo-wrap" key={alignItems}>
                <h2>alignItems: {alignItems}</h2>
                <Box container alignItems={alignItems} spacing={['md', 'md']}>
                    {new Array(3).fill(null).map((v, i) => (
                        <div
                            key={i}
                            style={{
                                minHeight: 30 + i * 10 + 'px',
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
