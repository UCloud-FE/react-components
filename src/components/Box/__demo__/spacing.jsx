import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <Box container direction="column" spacing="md">
        {Box.Spacing.concat([100]).map(spacing => (
            <div className="demo-wrap" key={spacing}>
                <h2>spacing: {spacing}</h2>
                <Box container spacing={spacing}>
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
                        ></div>
                    ))}
                </Box>
            </div>
        ))}
        <div className="demo-wrap">
            <h2>spacing: {`['md', 100]`}</h2>
            <Box container wrap="wrap" spacing={['md', 100]}>
                {new Array(12).fill(null).map((v, i) => (
                    <div
                        key={i}
                        style={{
                            height: '30px',
                            width: '300px',
                            background: 'gray',
                            color: 'white',
                            lineHeight: '30px',
                            textAlign: 'center'
                        }}
                    ></div>
                ))}
            </Box>
        </div>
    </Box>
);
// demo end

export default Demo;
