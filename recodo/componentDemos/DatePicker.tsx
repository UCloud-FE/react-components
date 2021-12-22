import React from 'react';
import { DatePicker, Box } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Box spacing="md">
                <DatePicker />
                <DatePicker disabled />
            </Box>
            <Box spacing="md">
                <DatePicker nullable />
                <DatePicker nullable disabled />
            </Box>
            <Box spacing="md">
                <DatePicker.Range />
                <DatePicker.Range disabled />
            </Box>
            <Box spacing="md">
                <DatePicker.Range nullable={[true, true]} />
                <DatePicker.Range nullable={[true, true]} disabled />
            </Box>
        </Box>
    );
};

export default React.memo(Demo);
