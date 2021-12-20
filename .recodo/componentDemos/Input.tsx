import React from 'react';
import { Input, Box } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Box spacing="md">
                <Input placeholder="请输入文本" style={{ width: '250px' }} />
            </Box>
            <Box spacing="md">
                <Input defaultValue="输入后的文本" style={{ width: '250px' }} clearable />
            </Box>
            <Box spacing="md">
                <Input defaultValue="输入后的文本" style={{ width: '250px' }} disabled />
            </Box>
            <Box spacing="md">
                <Input defaultValue="输入后的文本" style={{ width: '250px' }} status="error" />
            </Box>
        </Box>
    );
};

export default React.memo(Demo);
