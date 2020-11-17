import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <div className="demo-wrap">
        <Box container spacing={['md', 'md']} wrap="wrap">
            {[1, 2, 3, 4, 6, 6, 2.5, 2.5, 2.5, 4.5].map((v, i) => (
                <Box key={i} span={v}>
                    <div
                        style={{
                            height: '30px',
                            background: 'gray',
                            color: 'white',
                            lineHeight: '30px',
                            textAlign: 'center'
                        }}
                    >
                        span: {v}
                    </div>
                </Box>
            ))}
        </Box>
    </div>
);
// demo end

export default Demo;
