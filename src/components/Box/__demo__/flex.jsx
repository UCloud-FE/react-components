import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <div className="demo-wrap">
        <Box container spacing={['md', 'md']} wrap="wrap">
            <Box span={4}>
                <div
                    style={{
                        height: '30px',
                        background: 'gray',
                        color: 'white',
                        lineHeight: '30px',
                        textAlign: 'center'
                    }}
                >
                    span: 4
                </div>
            </Box>
            <Box flex="1">
                <div
                    style={{
                        height: '30px',
                        background: 'gray',
                        color: 'white',
                        lineHeight: '30px',
                        textAlign: 'center'
                    }}
                >
                    flex
                </div>
            </Box>
        </Box>
    </div>
);
// demo end

export default Demo;
