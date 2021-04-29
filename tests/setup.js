global.requestAnimationFrame =
    global.requestAnimationFrame ||
    function requestAnimationFrame(cb) {
        return setTimeout(cb, 0);
    };

import '@babel/polyfill';
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const moment = require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');
import 'moment/locale/zh-cn';
moment().locale('zh-cn').utcOffset(8);

Enzyme.configure({ adapter: new Adapter() });

const mockDate = new Date(1532174121355);
const OriginDate = Date;
function MockDate(...args) {
    if (args.length) return new OriginDate(...args);
    return mockDate;
}
MockDate.__proto__ = OriginDate;
global.Date = MockDate;
Date.now = jest.fn(() => 1532174121355);
// spy.mockRestore()

Math.random = jest.fn(() => 0.5);

const localStorageCache = {};
global.localStorage = {
    setItem: (key, v) => {
        localStorageCache[key] = v;
    },
    getItem: key => {
        return localStorageCache[key] || null;
    }
};
