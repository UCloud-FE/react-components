const components = {};

function importAll(r) {
    r.keys().forEach(key => {
        const name = key.replace(/(^\.\/)|(\/index\.jsx$)/g, '');
        const all = r(key);
        const component = all.default;
        components[name] = Object.assign(component, all);
    });
}

importAll(require.context('./components/', true, /index\.jsx$/));

delete components.List;

module.exports = components;
