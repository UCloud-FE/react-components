import React from 'react';
import { Pagination, Box } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Pagination total={100} simple />
            <Pagination total={100} showTotal showQuickJumper showSizeChanger />
        </Box>
    );
};

export default React.memo(Demo);
