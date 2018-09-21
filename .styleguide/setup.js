require('file-loader?name=[name].[ext]!./favicon.ico');
require('!file-loader?name=[name].[ext]!./style.css');

import components from '../src/';
Object.assign(global, components);

global._ = require('lodash');

global.PropTypes = require('prop-types');

global.ReactDOM = require('react-dom');

global.moment = require('moment');
