import mod from '@rapiop/mod';
import amdResolver from '@rapiop/mod/lib/resolver/amd';
import { moduleMap } from '@rapiop/mod/lib/module';

(window as any).__recodo_module_namespace__ = moduleMap;

mod.registerModuleResolver(amdResolver);

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
    mod.import(['@ucloud-fe/react-components', 'moment', 'lodash', 'react', 'react-dom']).then(dependences => {
        const [components, moment, lodash, React, ReactDOM] = dependences as any;
        const { Doc } = require('./run');
        console.log(components);
        
        ReactDOM.render(<Doc name={name} components={components} />, dom);
    });
};

export { renderDoc };
