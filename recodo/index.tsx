import mod from '@rapiop/mod';
import amdResolver from '@rapiop/mod/lib/resolver/amd';
import jsonResolver from '@rapiop/mod/lib/resolver/json';
import { moduleMap } from '@rapiop/mod/lib/module';

import './index.css';

mod.registerModuleResolver(amdResolver);
mod.registerModuleResolver(jsonResolver);

(window as any).__recodo_module_namespace__ = moduleMap;

mod.export('@rapiop/mod', mod);

mod.config({
    modules: {
        '@ucloud-fe/react-components/style': {
            css: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/react-components@latest/dist/icon.min.css',
            type: 'immediate'
        },
        '@ucloud-fe/react-components': {
            js: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/react-components@latest/dist/main.min.js',
            type: 'amd',
            dep: ['moment', 'react', 'react-dom', '@ucloud-fe/react-components/style']
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
            js: 'https://cdn.jsdelivr.net/npm/recodo-doc@0.1.9/dist/main.min.js',
            type: 'amd',
            dep: ['react', 'recodo-doc/style']
        },
        'recodo-doc/style': {
            css: 'https://cdn.jsdelivr.net/npm/recodo-doc@0.1.9/lib/doc.css',
            type: 'immediate'
        },
        '@rapiop/mod': { js: [] },
        'examples-data': {
            file: 'https://raw.githubusercontent.com/UCloud-FE/react-components/master/.recodo/data/examples.json',
            type: 'json'
        },
        'docs-data': {
            file: 'https://raw.githubusercontent.com/UCloud-FE/react-components/master/.recodo/data/docs.json',
            type: 'json'
        },
        'design-token-editor': {
            js: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/design-token-editor@0.1.7/dist/design-token-editor.umd.js',
            type: 'amd',
            dep: ['react', 'design-token-editor/style']
        },
        'design-token-editor/style': {
            css: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/design-token-editor@0.1.7/dist/style.css',
            type: 'immediate'
        },
        'design-token-file': {
            file: 'https://raw.githubusercontent.com/UCloud-FE/design-tokens/main/default.json',
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
        const darkTheme = require('src/components/ThemeProvider/dark').default;
        const ENLocale = require('src/components/LocaleProvider/locale/en_US').default;
        const SizeInterface = require('src/interfaces/Size').default;

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
                    demoUtil,
                    darkTheme,
                    SizeInterface,
                    ENLocale
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

const renderDesignTokenEditor = (dom: string) => {
    let destroyAction: () => void;
    let destroyed = false;
    let destroy = () => {
        if (destroyed) return;
        destroyed = true;
        if (!destroyAction) return;
        destroyAction();
    };
    mod.import(['@ucloud-fe/react-components', 'react', 'react-dom', 'design-token-editor', 'design-token-file']).then(
        dependences => {
            if (destroyed) return;
            const [components, React, ReactDOM, Editor, token] = dependences as any;
            console.log(token);

            const { default: editorComponentDemos, ComponentDemosWrap } = require('./editorComponentDemos');

            ReactDOM.render(
                <Editor
                    onChange={console.log}
                    token={token}
                    componentDemos={editorComponentDemos}
                    renderComponentDemosWrap={ComponentDemosWrap}
                />,
                dom
            );
            destroyAction = () => ReactDOM.unmountComponentAtNode(dom);
        }
    );
    return destroy;
};

export { renderDoc, renderInteractionDemo, renderDesignTokenEditor };
