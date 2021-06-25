import React from 'react';
import { Provider, Page } from 'recodo-doc';

import examples from './data/examples.json';
import docs from './data/docs.json';

const getRemoteUrl = (codePath, componentName) => {
    return `https://raw.githubusercontent.com/UCloud-FE/react-components/master/src/components/${componentName}/__demo__/${codePath}`;
};

const Doc = ({ name, components }: { name: string; components: any }) => {
    console.log(components);
    
    return (
        <Provider content={{ examples, docs }} getRemoteUrl={getRemoteUrl} scope={{ React: React, ...components }}>
            <Page name={name} />
        </Provider>
    );
};

export { Doc };
