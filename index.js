const _ = require('lodash');
const components = {};

function importAll(r) {
    r.keys().forEach(key => {
        const name = key.replace(/(^\.\/)|(\/index\.jsx$)/g, '');
        const all = r(key);
        const component = all.default;
        components[name] = _.merge(component, all);
    });
}

importAll(require.context('./src/components/', true, /index\.jsx$/));

module.exports = components;
