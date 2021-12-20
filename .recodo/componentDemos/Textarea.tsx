import React from 'react';
import { Textarea, Box } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Box spacing="md">
                <Textarea placeholder="请输入文本" />
            </Box>
            <Box spacing="md">
                <Textarea defaultValue="输入后的文本" />
            </Box>
            <Box spacing="md">
                <Textarea defaultValue="请输入文本" disabled />
            </Box>
        </Box>
    );
};

export default React.memo(Demo);
