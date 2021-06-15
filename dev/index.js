const fs = require('fs-extra');
const reactDocs = require('react-docgen');
const path = require('path');
const components = require('../.styleguide/components');

const componentList = [];
components.forEach(group => {
    group.sections.forEach(section => {
        const { name, components } = section;
        const componentInfo = {
            name
        };
        if (components) {
            componentInfo.components = components;
        } else {
            componentInfo.components = [name];
        }
        componentList.push(componentInfo);
    });
});

const suffixes = ['tsx', 'jsx', 'ts', 'js'];
const srcPath = path.join(__dirname, '../src');
const targetPath = path.join(__dirname, './docs');
const getFileSrc = file => {
    for (let i = 0; i < suffixes.length; i++) {
        const suffix = suffixes[i];
        const filePath = path.join(srcPath, file + '.' + suffix);
        if (fs.existsSync(filePath)) {
            return filePath;
        }
    }
    return null;
};
const getContent = filePath => {
    return fs.readFileSync(filePath);
};
const writeDocs = (info, file) => {
    const docsFilePath = path.join(targetPath, file + '.json');
    fs.ensureFileSync(docsFilePath);
    fs.writeFileSync(docsFilePath, JSON.stringify(info, null, 4));
};

componentList.forEach(({ name, components }) => {
    if (!components) return components;
    components.forEach(component => {
        const file = `components/${name}/${component}`;
        const filePath = getFileSrc(file);
        if (!filePath) return;
        const content = getContent(filePath);
        try {
            const componentInfo = reactDocs.parse(content, null, null, {
                filename: filePath
            });
            componentInfo && writeDocs(componentInfo, file);
        } catch (error) {
            console.error(filePath, error);
        }
    });
});
