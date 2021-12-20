import React from 'react';
import { Slider, Box } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Slider min={0} max={20} defaultValue={3} numberInput={{ suffix: 'GB' }} />
            <Slider
                min={0}
                max={20}
                defaultValue={3}
                marks={{
                    5: '5个',
                    10: '10个',
                    15: '15个',
                    20: '20个'
                }}
                numberInput={{ suffix: 'GB' }}
            />
            <Slider
                disabled
                min={10}
                max={1000}
                defaultValue={12}
                numberInput={{ suffix: 'GB' }}
                marks={{
                    50: {
                        label: '50',
                        step: 2,
                        ratio: 10
                    },
                    100: {
                        label: '100',
                        step: 5,
                        ratio: 10
                    },
                    200: {
                        label: '200',
                        step: 10,
                        ratio: 15
                    },
                    400: {
                        label: '400',
                        step: 20
                    },
                    1000: {
                        label: '1000',
                        step: 50
                    }
                }}
            />
        </Box>
    );
};
export default React.memo(Demo);
