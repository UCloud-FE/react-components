import React from 'react';
import { Provider, Page } from 'recodo-doc';
import 'recodo-doc/lib/doc.css';

import examples from './data/examples.json';
import docs from './data/docs.json';

const getRemoteUrl = (codePath, componentName) => {
    return `https://raw.githubusercontent.com/UCloud-FE/react-components/master/src/components/${componentName}/__demo__/${codePath}`;
};

const Doc = ({ name, scope }: { name: string; scope: any }) => {
    return (
        <Provider content={{ examples, docs }} getRemoteUrl={getRemoteUrl} scope={scope}>
            <Page name={name} />
        </Provider>
    );
};

export { Doc };
