import React from 'react';
import { Select, Box } from '@ucloud-fe/react-components';

const options = new Array(3).fill(null).map((v, i) => ({ label: `选项 ${i}`, value: i }));

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Box spacing="md">
                <Select options={options} />
                <Select options={options} disabled />
                <Select options={options} defaultValue={1} />
                <Select />
            </Box>
        </Box>
    );
};

export default React.memo(Demo);
