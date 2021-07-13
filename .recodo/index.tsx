import mod from '@rapiop/mod';
import amdResolver from '@rapiop/mod/lib/resolver/amd';
import { moduleMap } from '@rapiop/mod/lib/module';

import './index.css';

(window as any).__recodo_module_namespace__ = moduleMap;

mod.registerModuleResolver(amdResolver);

mod.import({
    css: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/react-components@1.1.6/dist/icon.min.css'
});

mod.config({
    modules: {
        '@ucloud-fe/react-components': {
            js: 'https://cdn.jsdelivr.net/npm/@ucloud-fe/react-components@1.1.6/dist/main.min.js',
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
            type: 'amd'
        }
    }
});

const renderDoc = (name, dom: Element) => {
    let destroyAction;
    let destroyed = false;
    let destroy = () => {
        if (destroyed) return;
        destroyed = true;
        if (!destroyAction) return;
        destroyAction();
    };
    mod.import(['@ucloud-fe/react-components', 'moment', 'lodash', 'react', 'react-dom', 'prop-types']).then(
        dependences => {
            if (destroyed) return;
            const [components, moment, lodash, React, ReactDOM, PropTypes] = dependences as any;
            const { Doc } = require('./run');
            ReactDOM.render(
                <Doc
                    name={name}
                    scope={{ ...components, components, moment, lodash, React, ReactDOM, PropTypes, _: lodash }}
                />,
                dom
            );
            destroyAction = () => ReactDOM.unmountComponentAtNode(dom);
        }
    );
    return destroy;
};

export { renderDoc };
