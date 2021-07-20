import React from 'react';

import { Provider, Page, Editor, RemoteEditor } from 'recodo-doc';

const getRemoteUrl = (codePath: string, componentName: string) => {
    return `https://raw.githubusercontent.com/UCloud-FE/react-components/master/src/components/${componentName}/__demo__/${codePath}`;
};

const Doc = ({
    name,
    scope,
    examples,
    docs,
    reportAnchorList
}: {
    name: string;
    scope: any;
    examples: any;
    docs: any;
    reportAnchorList: (anchorList: any) => void;
}) => {
    return (
        <Provider content={{ examples, docs }} getRemoteUrl={getRemoteUrl} scope={scope}>
            <Page name={name} reportAnchorList={reportAnchorList} />
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
