import moment, { Moment } from 'moment';
import _ from 'lodash';
import { TDate } from '@z-r/calendar/types/interface';

export interface Rules {
    range?: [TDate, TDate];
    custom?: (date: Moment, value?: Moment | null) => boolean;
}

import { isDateDisabled, getValidDate } from 'src/components/Calendar/utils';

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

const isRangeDateValid = (value: [TDate | null, TDate | null], rules, precision: null | keyof typeof precisionMap) => {
    let [start, end] = value;
    start = start == null ? null : moment(+start);
    end = end === null ? null : moment(+end);
    let resetMap: Record<keyof typeof precisionMap, number>;
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

const isDateValid = (date: TDate, value?: TDate | null, rules?: Rules) => {
    date = moment(+date);
    if (!rules) {
        return false;
    }
    const { range, custom } = rules;
    if (range) {
        const [start, end] = range;
        if ((start != null && date < start) || (end != null && date > end)) {
            return true;
        }
    }
    if (custom) {
        return custom(date, value == null ? value : moment(+value));
    }
};

export { isDateDisabled, isRangeDateDisabled, getValidDate, isDateValid, isRangeDateValid };
