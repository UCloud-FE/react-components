import mod from '@ucloud-fe/mod';
import { moduleMap } from '@ucloud-fe/mod/lib/module';
import amdResolver from '@ucloud-fe/mod/lib/resolver/amd';
import jsonResolver from '@ucloud-fe/mod/lib/resolver/json';

import './index.css';

mod.registerModuleResolver(amdResolver);
mod.registerModuleResolver(jsonResolver);

(window as any).__recodo_module_namespace__ = moduleMap;

mod.export('@ucloud-fe/mod', mod);

const TOKEN_VERSION = 'd9d150ea75551131f136740a49bf93fe75357119';

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
            js: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/design-token-editor@0.3.8/dist/design-token-editor.umd.js',
            type: 'amd',
            dep: ['react', 'design-token-editor/style']
        },
        'design-token-editor/style': {
            css: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/design-token-editor@0.3.8/dist/style.css',
            type: 'immediate'
        },
        'theme-list': {
            file: `https://raw.githubusercontent.com/UCloud-FE/design-tokens/${TOKEN_VERSION}/theme-list.json`,
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

    mod.import(['theme-list', 'lodash'])
        .then(([themeList, lodash]: any) => {
            const themeListConfig = themeList.reduce(
                (init: any, v: string) => {
                    const themeName = `theme-${v.replace('.json', '')}`;
                    init.modules[themeName] = {
                        file: `https://raw.githubusercontent.com/UCloud-FE/design-tokens/${TOKEN_VERSION}/define/${v}`,
                        type: 'json'
                    };
                    init.themeListName.push(themeName);
                    return init;
                },
                { modules: {}, themeListName: [] }
            );

            mod.config({ modules: themeListConfig.modules });
            return new Promise(resolve => {
                mod.import(themeListConfig.themeListName).then(themeList =>
                    resolve([themeListConfig.themeListName, themeList, lodash])
                );
            });
        })
        .then(([themeListName, themeList, lodash]: any) => {
            const defaultThemeIndex = themeListName.findIndex((v: string) => v.includes('default'));
            themeListName.splice(defaultThemeIndex, 1);
            const [defaultTheme] = themeList.splice(defaultThemeIndex, 1);
            const themeMap = themeListName.reduce((init: any, v: string, index: number) => {
                init.set(v.replace('theme-', ''), {
                    label: v.replace('theme-', ''),
                    value: lodash.merge(lodash.cloneDeep(defaultTheme), themeList[index])
                });
                return init;
            }, new Map([['default', { label: 'default', value: lodash.cloneDeep(defaultTheme) }]]));
            return Promise.resolve([defaultTheme, themeMap]);
        })
        .then(([token, themeMap]) => {
            console.log('token', token);
            mod.import(['@ucloud-fe/react-components', 'react', 'react-dom', 'design-token-editor']).then(
                dependences => {
                    if (destroyed) return;
                    const [components, React, ReactDOM, Editor] = dependences as any;
                    console.log(token);

                    const { default: editorComponentDemos, ComponentDemosWrap } = require('./editorComponentDemos');

                    ReactDOM.render(
                        <Editor
                            onChange={console.log}
                            token={token}
                            themeMap={themeMap}
                            componentDemos={editorComponentDemos}
                            renderComponentDemosWrap={ComponentDemosWrap}
                        />,
                        dom
                    );
                    destroyAction = () => ReactDOM.unmountComponentAtNode(dom);
                }
            );
        });

    return destroy;
};

export { renderDesignTokenEditor };
