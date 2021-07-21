import React from 'react';

import InteractionDemo, { Group, USE_DEFINE } from 'interaction-demo';
import { Input, Icon } from '@ucloud-fe/react-components';

const config = {
    size: USE_DEFINE,
    clearable: USE_DEFINE,
    disabled: 'boolean',
    block: USE_DEFINE,
    status: USE_DEFINE,
    prefix: {
        type: 'boolean',
        optionToProps: prefix => (prefix ? <Icon type="circle" /> : undefined)
    },
    suffix: {
        type: 'boolean',
        optionToProps: suffix => (suffix ? <Icon type="circle" /> : undefined)
    }
};

const searchConfig = {
    size: ['sm', 'md', 'lg'],
    clearable: 'boolean',
    disabled: 'boolean',
    block: 'boolean',
    prefix: {
        type: 'boolean',
        optionToProps: prefix => (prefix ? <Icon type="circle" /> : undefined)
    }
};

const list = [
    {
        title: 'Input',
        children: (
            <InteractionDemo config={config} initialState={{ value: '' }}>
                <Input onChange={console.log} />
            </InteractionDemo>
        )
    },
    {
        title: 'Search',
        children: (
            <InteractionDemo config={searchConfig} initialState={{ value: '' }}>
                <Input.Search onChange={console.log} />
            </InteractionDemo>
        )
    }
];

const Demo = () => {
    return <Group list={list} />;
};

export default Demo;
