import React, { useState, useCallback, ReactNode, ReactElement } from 'react';

import { Provider, Page, Editor, RemoteEditor } from 'recodo-doc';
import 'recodo-doc/lib/doc.css';

const getRemoteUrl = (codePath: string, componentName: string) => {
    return `https://raw.githubusercontent.com/UCloud-FE/react-components/master/src/components/${componentName}/__demo__/${codePath}`;
};

const Doc = ({ name, scope, examples, docs }: { name: string; scope: any; examples: any; docs: any }) => {
    return (
        <Provider content={{ examples, docs }} getRemoteUrl={getRemoteUrl} scope={scope}>
            <Page name={name} />
        </Provider>
    );
};

const code = `
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
        <InteractionDemo config={config} Component={Button} initialState={{ styleType: 'border', size: 'md' }}>
            <DemoButton />
        </InteractionDemo>
    );
};

export default Demo;
`;

const Demo = ({ name, scope, modules }: { name: string; scope: any; modules: any }) => {
    return (
        <Provider modules={modules} scope={scope}>
            <Editor code={code} />
        </Provider>
    );
};

export { Doc, Demo };
