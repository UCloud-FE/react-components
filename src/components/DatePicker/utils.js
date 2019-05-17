import moment from 'moment';
import _ from 'lodash';

import { isDateDisabled, getValidDate } from 'components/Calendar/utils';

/**
 *
 * @param {moment{}} date 判断的时间
 * @param {moment{}} value 当前的时间
 * @param {object} rules 规则
 * @param {moment{}} start 当前开始时间
 * @param {moment{}} end 当前结束时间
 * @param {string} tag 标记
 */
const isRangeDateDisabled = (date, value, rules, start, end, tag) => {
    date = moment(date);
    value = moment(value);
    start = moment(start);
    end = moment(end);

    if (!rules) {
        return false;
    }
    const { range, custom: _c, minRange } = rules;

    const custom = (date, value) => {
        if (!_.isEmpty(range)) {
            if (tag === 'start') {
                if (minRange) {
                    if (date > moment(end).subtract(minRange)) {
                        return true;
                    }
                }
            } else if (tag === 'end') {
                if (minRange) {
                    if (date < moment(start).add(minRange)) {
                        return true;
                    }
                }
            }
        }
        if (_c) {
            return _c(date, value, start, end, tag);
        }
    };

    return isDateDisabled(date, value, {
        range,
        custom
    });
};

const isRangeDateValid = (start, end, rules, precision) => {
    start = moment(start);
    end = moment(end);
    const precisionMap = {
        millisecond: 0,
        second: 1,
        minute: 2,
        hour: 3,
        date: 4,
        month: 5,
        year: 6
    };
    const resetValueMap = {
        millisecond: 0,
        second: 0,
        minute: 0,
        hour: 0,
        date: 1,
        month: 0
    };
    let resetMap;
    if (precision) {
        const precisionLevel = precisionMap[precision];
        resetMap = {};
        _.each(precisionMap, (level, key) => {
            if (level < precisionLevel) {
                resetMap[key] = resetValueMap[key];
            }
        });
        start.set(resetMap);
        end.set(resetMap);
    }
    const { range, maxRange, minRange } = rules;

    if (start > end) {
        return 'startGreaterThanEnd';
    }
    if (range) {
        let [s, e] = range;
        s = moment(s);
        e = moment(e);
        if (resetMap) {
            s.set(resetMap);
            e.set(resetMap);
        }
        if (s != null && start < s) {
            return 'rangeError';
        }
        if (e != null && end > e) {
            return 'rangeError';
        }
    }
    if (maxRange && moment(start).add(maxRange) < end) {
        return 'maxRangeError';
    }
    if (minRange && moment(end).subtract(minRange) < start) {
        return 'minRangeError';
    }
    return true;
};

export { isDateDisabled, isRangeDateDisabled, getValidDate, isRangeDateValid };
