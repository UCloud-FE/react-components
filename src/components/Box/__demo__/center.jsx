import React from 'react';

import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <Box direction="column" alignItems="stretch" spacing="md">
        <div className="demo-wrap">
            <h2>水平垂直居中</h2>
            <Box
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: 100, border: '1px solid #ccc' }}
            >
                <div style={{ width: 20, height: 20, background: 'red' }}></div>
            </Box>
        </div>
    </Box>
);
// demo end

export default Demo;
