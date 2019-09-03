const _ = require('lodash');

require('file-loader?name=[name].[ext]!./favicon.ico');
require('!file-loader?name=[name].[ext]!./style.css');
require('@babel/polyfill');

const components = require('../index');

import ResizableTH from 'src/components/Table/ResizableTH';

components.Table.ResizableTH = ResizableTH;

_.merge(global, components);

global._ = require('lodash');

global.PropTypes = require('prop-types');

global.ReactDOM = require('react-dom');

global.moment = require('moment');

global.StyledComponents = require('styled-components');

import greenTheme from 'src/components/ThemeProvider/green';
import oceanTheme from 'src/components/ThemeProvider/ocean';

global.greenTheme = greenTheme;
global.oceanTheme = oceanTheme;
