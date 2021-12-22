import React from 'react';
import { Tooltip, Box, Button } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box spacing="md">
            {['light', 'dark'].map(theme => (
                <Tooltip theme={theme} popup="提示信息" key={theme}>
                    <Button>按钮</Button>
                </Tooltip>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
