const path = require('path');
const _ = require('lodash');
const webpackConfig = require('./webpack.config.js');

let components = require('./.styleguide/components.json');

const namePrefix = '❖  ';
const basePath = 'src/components/';
const fileSuffix = '.jsx';

const isProd = process.env.NODE_ENV === 'production';

components = _.map(components, section => {
    const { name, sections, ...rest } = section;
    return {
        name: name,
        sections: _.map(sections, section => {
            const { name, components, content, ...rest } = section;
            const path = basePath + name + '/';
            const newSection = {
                name: namePrefix + name,
                components: components
                    ? components.map(component => path + component + fileSuffix)
                    : [path + name + fileSuffix],

                ...rest
            };
            if (section.content) {
                newSection.content = path + content;
            }
            return newSection;
        }),
        sectionDepth: 1,
        content: `docs/${name.toLowerCase()}.md`,
        ...rest
    };
});

module.exports = {
    title: 'UCloud React Components',
    template: {
        head: {
            links: [
                {
                    rel: 'shortcut icon',
                    href: './favicon.ico',
                    type: 'image/x-icon'
                },
                {
                    href: './style.css',
                    rel: 'stylesheet'
                },
                {
                    href: './style/icon.css',
                    rel: 'stylesheet'
                },
                {
                    href: './style/reset.css',
                    rel: 'stylesheet'
                }
            ]
        }
    },
    theme: {
        baseBackground: '#fdfdfc',
        link: '#274e75',
        linkHover: '#90a7bf',
        border: '#e0d2de',
        font: ['Helvetica', 'sans-serif']
    },
    styleguideComponents: {
        LogoRenderer: path.join(__dirname, '.styleguide/components/LogoRenderer'),
        StyleGuideRenderer: path.join(__dirname, '.styleguide/components/StyleGuideRenderer'),
        ReactComponentRenderer: path.join(__dirname, '.styleguide/components/ReactComponentRenderer'),
        Examples: path.join(__dirname, '.styleguide/components/Examples'),
        'slots/IsolateButton': path.join(__dirname, '.styleguide/components/IsolateButton')
    },
    require: [path.join(__dirname, '.styleguide/setup.js')],
    assetsDir: 'static/',
    sections: [
        {
            name: '组件介绍',
            content: './README.md'
        },
        {
            name: '开发指南',
            content: './DEVELOP.md'
        },
        {
            name: '更新日志',
            content: './CHANGELOG.md'
        },
        ...components
    ],
    getExampleFilename(componentPath) {
        return componentPath.replace(/\.jsx?$/, '.md');
    },
    webpackConfig,
    pagePerSection: true,
    skipComponentsWithoutExample: true,
    usageMode: 'expand',
    serverPort: 6080,
    sortProps: props => props,
    styleguideDir: process.env.STYLEGUIDE_BUILD_DIR || 'styleguide-build/default'
};
