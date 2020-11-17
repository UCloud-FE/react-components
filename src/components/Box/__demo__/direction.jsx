import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['row', 'row-reverse', 'column', 'column-reverse'].map(direction => (
            <div className="demo-wrap" key={direction}>
                <h2>direction: {direction}</h2>
                <Box container direction={direction} spacing="md">
                    {[1, 2, 3].map(v => (
                        <div
                            key={v}
                            style={{
                                height: '30px',
                                width: '100px',
                                background: 'gray',
                                color: 'white',
                                lineHeight: '30px',
                                textAlign: 'center'
                            }}
                        >
                            div - {v}
                        </div>
                    ))}
                </Box>
            </div>
        ))}
    </Box>
);
// demo end

export default Demo;
