import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <Box container direction="column" spacing="md">
        {Box.Spacing.concat(['100px', ['md', '100px']]).map(padding => (
            <div className="demo-wrap" key={padding}>
                <h2>padding: {padding}</h2>
                <Box padding={padding} style={{ border: '1px solid #ccc' }}>
                    <div
                        style={{
                            height: '30px',
                            width: '100px',
                            background: 'gray',
                            color: 'white',
                            lineHeight: '30px',
                            textAlign: 'center'
                        }}
                    ></div>
                </Box>
            </div>
        ))}
    </Box>
);
// demo end

export default Demo;
