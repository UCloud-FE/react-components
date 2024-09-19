import React from 'react';

import { Provider, Page, Editor, RemoteEditor } from '@ucloud-fe/recodo-doc';

const getRemoteUrl = (codePath: string, componentName: string) => {
    return `https://raw.githubusercontent.com/UCloud-FE/react-components/master/src/components/${componentName}/__demo__/${codePath}`;
    // return `http://127.0.0.1:8083/src/components/${componentName}/__demo__/${codePath}`;
};

const Doc = ({
    scope,
    info,
    doc,
    reportAnchorList
}: {
    name: string;
    scope: any;
    info: any;
    doc: any;
    reportAnchorList: (anchorList: any) => void;
}) => {
    return (
        <Provider
            content={{ infoMap: { name: info }, docMap: { name: doc } }}
            getRemoteUrl={getRemoteUrl}
            scope={scope}
        >
            <Page name={'name'} reportAnchorList={reportAnchorList} />
        </Provider>
    );
};

const code = `
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

`;

const Demo = ({ name, scope, modules }: { name: string; scope: any; modules: any }) => {
    return (
        <>
            <Provider modules={modules} scope={scope}>
                <RemoteEditor
                    codeUrl={`https://raw.githubusercontent.com/UCloud-FE/react-components/master/src/components/${name}/.recodo/interaction.jsx`}
                    render
                />
            </Provider>
            {/* <Provider modules={modules} scope={scope}>
                <Editor code={code} render />
            </Provider> */}
        </>
    );
};

export { Doc, Demo };
