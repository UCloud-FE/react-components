import mod from '@ucloud-fe/mod';
import amdResolver from '@ucloud-fe/mod/lib/resolver/amd';
import jsonResolver from '@ucloud-fe/mod/lib/resolver/json';
import { moduleMap } from '@ucloud-fe/mod/lib/module';

import './index.css';

mod.registerModuleResolver(amdResolver);
mod.registerModuleResolver(jsonResolver);

(window as any).__recodo_module_namespace__ = moduleMap;

mod.export('@ucloud-fe/mod', mod);

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
        '@ucloud-fe/mod': { js: [] },
        'design-token-editor': {
            js: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/design-token-editor@0.3.7/dist/design-token-editor.umd.js',
            type: 'amd',
            dep: ['react', 'design-token-editor/style']
        },
        'design-token-editor/style': {
            css: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/design-token-editor@0.3.7/dist/style.css',
            type: 'immediate'
        },
        'design-token-file': {
            file: 'https://raw.githubusercontent.com/UCloud-FE/design-tokens/main/default.json',
            type: 'json'
        }
    }
});

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
                    // token={token}
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

export { renderDesignTokenEditor };
