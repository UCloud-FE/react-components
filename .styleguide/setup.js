if (/\.github\.io$/.test(location.host)) {
    location.href = 'https://udesign.ucloud.cn/component/category/all/';
}

require('file-loader?name=[name].[ext]!./favicon.ico');
require('!file-loader?name=[name].[ext]!./style.css');

const components = require('../index');

const ResizableTH = require('src/components/Table/ResizableTH').default;

components.Table.ResizableTH = ResizableTH;

Object.assign(global, components);
Object.defineProperties(window, {
    Icon: {
        set: v => {},
        get: () => components.Icon
    }
});

global._ = require('lodash');

global.PropTypes = require('prop-types');

global.ReactDOM = require('react-dom');

global.moment = require('moment');

import darkTheme from 'src/components/ThemeProvider/dark';

global.darkTheme = darkTheme;

import 'moment/locale/zh-cn';
global.moment().locale('zh-cn').utcOffset(8);

global.SizeInterface = require('src/interfaces/Size').default;
global.axios = require('axios');

global.demoUtil = require('shared/demoUtil').default;
global.InteractionDemo = require('shared/InteractionDemo').default;

global.components = components;

global.ENLocale = require('src/components/LocaleProvider/locale/en_US').default;
global.Resizable = require('react-resizable').Resizable;
