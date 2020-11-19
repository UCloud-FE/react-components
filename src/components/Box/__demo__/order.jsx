import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <div className="demo-wrap">
        <Box container spacing={['md', 'md']} wrap="wrap">
            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((v, i) => (
                <Box key={i} order={v} span={2}>
                    <div
                        style={{
                            height: '30px',
                            background: 'gray',
                            color: 'white',
                            lineHeight: '30px',
                            textAlign: 'center'
                        }}
                    >
                        order: {v}
                    </div>
                </Box>
            ))}
        </Box>
    </div>
);
// demo end

export default Demo;
