global.requestAnimationFrame =
    global.requestAnimationFrame ||
    function requestAnimationFrame(cb) {
        return setTimeout(cb, 0);
    };

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');
const moment = require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');
import 'moment/locale/zh-cn';
moment()
    .locale('zh-cn')
    .utcOffset(8);

Enzyme.configure({ adapter: new Adapter() });

Date.now = jest.fn(() => 1532174121355);

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
