import mod from '@rapiop/mod';
import amdResolver from '@rapiop/mod/lib/resolver/amd';
import jsonResolver from '@rapiop/mod/lib/resolver/json';
import { moduleMap } from '@rapiop/mod/lib/module';

import './index.css';

mod.registerModuleResolver(amdResolver);
mod.registerModuleResolver(jsonResolver);

(window as any).__recodo_module_namespace__ = moduleMap;

mod.import({
    css: [
        'https://cdn.jsdelivr.net/npm/@ucloud-fe/react-components/dist/icon.min.css',
        'https://cdn.jsdelivr.net/npm/recodo-doc@0.1.9/lib/doc.css'
    ]
});

mod.export('@rapiop/mod', mod);

mod.config({
    modules: {
        '@ucloud-fe/react-components': {
            js: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/react-components/dist/main.min.js',
            type: 'amd',
            dep: ['moment', 'react', 'react-dom']
        },
        moment: {
            js: 'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js',
            type: 'amd'
        },
        lodash: {
            js: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
            type: 'amd'
        },
        'prop-types': {
            js: 'https://cdn.jsdelivr.net/npm/prop-types@15.7.2/prop-types.min.js',
            type: 'amd'
        },
        react: {
            js: 'https://cdn.jsdelivr.net/npm/react@16.14.0/umd/react.production.min.js',
            type: 'amd'
        },
        'react-dom': {
            js: 'https://cdn.jsdelivr.net/npm/react-dom@16.14.0/umd/react-dom.production.min.js',
            type: 'amd',
            dep: ['react']
        },
        'recodo-doc': {
            js: 'https://cdn.jsdelivr.net/npm/recodo-doc/dist/main.min.js',
            type: 'amd',
            dep: ['react']
        },
        '@rapiop/mod': { js: [] },
        'examples-data': {
            file: 'https://raw.githubusercontent.com/UCloud-FE/react-components/master/.recodo/data/examples.json',
            type: 'json'
        },
        'docs-data': {
            file: 'https://raw.githubusercontent.com/UCloud-FE/react-components/master/.recodo/data/docs.json',
            type: 'json'
        }
    }
});

const renderDoc = (
    name: string,
    dom: Element,
    options?: {
        reportAnchorList: any;
    }
) => {
    let destroyAction: () => void;
    let destroyed = false;
    let destroy = () => {
        if (destroyed) return;
        destroyed = true;
        if (!destroyAction) return;
        destroyAction();
    };
    mod.import([
        '@ucloud-fe/react-components',
        'moment',
        'lodash',
        'react',
        'react-dom',
        'prop-types',
        'examples-data',
        'docs-data',
        'recodo-doc'
    ]).then(dependences => {
        if (destroyed) return;
        const [components, moment, lodash, React, ReactDOM, PropTypes, examples, docs] = dependences as any;
        const { Doc } = require('./Component');
        const demoUtil = require('shared/demoUtil').default;

        ReactDOM.render(
            <Doc
                name={name}
                examples={examples}
                docs={docs}
                scope={{
                    ...components,
                    components,
                    moment,
                    lodash,
                    React,
                    ReactDOM,
                    PropTypes: PropTypes,
                    _: lodash,
                    demoUtil
                }}
                reportAnchorList={options?.reportAnchorList}
            />,
            dom
        );
        destroyAction = () => ReactDOM.unmountComponentAtNode(dom);
    });
    return destroy;
};

const renderInteractionDemo = (name: string, dom: string) => {
    let destroyAction: () => void;
    let destroyed = false;
    let destroy = () => {
        if (destroyed) return;
        destroyed = true;
        if (!destroyAction) return;
        destroyAction();
    };
    mod.import([
        '@ucloud-fe/react-components',
        'moment',
        'lodash',
        'react',
        'react-dom',
        'prop-types',
        'examples-data',
        'docs-data',
        'recodo-doc'
    ]).then(dependences => {
        if (destroyed) return;
        const [components, moment, lodash, React, ReactDOM, PropTypes, examples, docs] = dependences as any;
        const { Demo } = require('./Component');
        const InteractionDemo = require('./InteractionDemo');

        ReactDOM.render(
            <InteractionDemo.Provider props={examples[name][name].info.props}>
                <Demo
                    name={name}
                    modules={{
                        '@ucloud-fe/react-components': components,
                        moment: moment,
                        lodash: lodash,
                        react: React,
                        'react-dom': ReactDOM,
                        'prop-types': PropTypes,
                        'interaction-demo': InteractionDemo
                    }}
                />
            </InteractionDemo.Provider>,
            dom
        );
        destroyAction = () => ReactDOM.unmountComponentAtNode(dom);
    });
    return destroy;
};

export { renderDoc, renderInteractionDemo };
