import React from 'react';
import { NumberInput, Box } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Box spacing="md">
                <NumberInput defaultValue="3" />
                <NumberInput defaultValue="3" styleType="pagination" />
                <NumberInput defaultValue="3" styleType="split" />
            </Box>
            <Box spacing="md">
                <NumberInput defaultValue="3" suffix="G" />
                <NumberInput defaultValue="3" suffix="台" styleType="pagination" />
                <NumberInput defaultValue="3" suffix="/10" styleType="split" />
            </Box>
        </Box>
    );
};

export default React.memo(Demo);
