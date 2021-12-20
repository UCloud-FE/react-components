import React from 'react';
import { PopConfirm, Box, Button } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box spacing="md">
            <PopConfirm popup="提示信息">
                <Button styleType="primary">按钮</Button>
            </PopConfirm>
        </Box>
    );
};

export default React.memo(Demo);
