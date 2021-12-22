import React from 'react';
import { Steps, Box, StepsProps } from '@ucloud-fe/react-components';

const steps = new Array(3).fill(null).map((v, i) => ({ title: `第 ${i + 1} 步`, remark: '这是一条备注' }));
const statuses: StepsProps['status'][] = ['current', 'error', 'loading'];
const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {statuses.map(status => (
                <Steps steps={steps} current={1} status={status} key={status} />
            ))}
        </Box>
    );
};

export default React.memo(Demo);
