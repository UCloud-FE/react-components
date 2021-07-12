import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import lodash from 'lodash';
import { Provider, Page } from 'recodo-doc';
import 'recodo-doc/lib/doc.css';

import examples from './data/examples.json';
import docs from './data/docs.json';

const getRemoteUrl = (codePath, componentName) => {
    return `https://raw.githubusercontent.com/UCloud-FE/react-components/master/src/components/${componentName}/__demo__/${codePath}`;
};

const Doc = ({ name, components }: { name: string; components: any }) => {
    return (
        <Provider
            content={{ examples, docs }}
            getRemoteUrl={getRemoteUrl}
            scope={{ React, ReactDOM, lodash, _: lodash, moment, ...components, components }}
        >
            <Page name={name} />
        </Provider>
    );
};

export { Doc };
