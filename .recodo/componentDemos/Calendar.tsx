import React from 'react';
import { Box, Calendar } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Calendar />
        </Box>
    );
};

export default React.memo(Demo);
