import React from 'react';

import InteractionDemo, { Group, USE_DEFINE } from 'interaction-demo';
import { Checkbox } from '@ucloud-fe/react-components';

const config = {
    styleType: USE_DEFINE,
    size: USE_DEFINE,
    checked: USE_DEFINE,
    disabled: USE_DEFINE,
    indeterminate: USE_DEFINE,
    title: {
        type: 'boolean',
        optionToProps: title => (title ? 'title' : undefined)
    }
};

const groupConfig = {
    styleType: ['card'],
    title: {
        type: 'boolean',
        optionToProps: title => (title ? 'title' : undefined)
    }
};

const GroupDemo = ({ title, ...rest }) => {
    return <Checkbox.Group {...rest} onChange={console.log} options={[1, 2, 3].map(v => ({ value: v, title }))} />;
};

const list = [
    {
        title: 'Checkbox',
        children: (
            <InteractionDemo config={config} initialState={{ checked: false }}>
                <Checkbox onChange={console.log}>Checkbox</Checkbox>
            </InteractionDemo>
        )
    },
    {
        title: 'Group',
        children: (
            <InteractionDemo config={groupConfig}>
                <GroupDemo />
            </InteractionDemo>
        )
    }
];

const Demo = () => {
    return <Group list={list} />;
};

export default Demo;
