import React from 'react';
import { Progress, Box } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Progress percent={40} />
            <Progress percent={50} color="error" />
            <Progress percent={100} color="success" />
            <Progress percent={20} color="warn" />
        </Box>
    );
};

export default React.memo(Demo);
