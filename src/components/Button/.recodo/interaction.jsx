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
    icon: {
        type: 'union',
        options: ['default', 'loading', 'check', 'square'],
        optionToProps: option => (option === 'default' ? undefined : option)
    }
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
        <InteractionDemo config={config} Component={Button} initialState={{ styleType: 'border', size: 'md' }}>
            <DemoButton />
        </InteractionDemo>
    );
};
// demo end

export default Demo;
