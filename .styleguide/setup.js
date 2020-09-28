require('file-loader?name=[name].[ext]!./favicon.ico');
require('!file-loader?name=[name].[ext]!./style.css');

const components = require('../index');

import ResizableTH from 'src/components/Table/ResizableTH';

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
