import React from 'react';

import InteractionDemo, { USE_DEFINE } from 'interaction-demo';
import { Button, Tooltip } from '@ucloud-fe/react-components';

const config = {
    styleType: USE_DEFINE,
    size: USE_DEFINE,
    disabled: 'boolean',
    fakeDisabled: USE_DEFINE,
    loading: USE_DEFINE,
    shape: USE_DEFINE,
    icon: ['loading', 'check', 'square']
};
const DemoButton = props => {
    return (
        <Tooltip popup="Some Tip">
            <Button {...props} onClick={() => console.log('clicked')}>
                Button
            </Button>
        </Tooltip>
    );
};
const Demo = () => {
    return (
        <InteractionDemo config={config} initialState={{ styleType: 'border', size: 'md' }}>
            <DemoButton />
        </InteractionDemo>
    );
};

export default Demo;
