const components = {};

function importAll(r) {
    r.keys().forEach(key => {
        const name = key.replace(/(^\.\/)|(\/index\.(j|t)sx$)/g, '');
        const all = r(key);
        const component = all.default;
        components[name] = Object.assign(component, all);
    });
}

importAll(require.context('./src/components/', true, /index\.(j|t)sx$/));

module.exports = components;
