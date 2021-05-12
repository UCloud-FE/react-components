import moment, { Moment } from 'moment';
import { TDate } from '@z-r/calendar/types/interface';

export interface Rules {
    range?: [TDate | void | null, TDate | void | null];
    custom?: (date: Moment, value?: Moment | null) => boolean;
}

import { isDateDisabled, getValidDate } from 'src/components/Calendar/utils';

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
    month: 0,
    year: 0
};

const isRangeDateValid = (
    value: [TDate | null, TDate | null],
    rules: {
        range?: [TDate | void, TDate | void];
        maxRange?: any;
        minRange?: any;
    },
    precision: null | keyof typeof precisionMap
) => {
    let [start, end] = value;
    start = start == null ? null : moment(+start);
    end = end == null ? null : moment(+end);
    const resetMap: { [key: string]: number } = {};
    if (precision) {
        const precisionLevel = precisionMap[precision];
        Object.keys(precisionMap).forEach(key => {
            const level = precisionMap[key as keyof typeof precisionMap];
            if (level < precisionLevel) {
                resetMap[key] = resetValueMap[key as keyof typeof precisionMap];
            }
        });
        start && start.set(resetMap);
        end && end.set(resetMap);
    }
    const { range, maxRange, minRange } = rules;
    if (range) {
        let [s, e] = range;
        s = moment(+s);
        e = moment(+e);
        if (Object.keys(resetMap).length) {
            s.set(resetMap);
            e.set(resetMap);
        }
        if (s != null && start != null && start < s) {
            return 'rangeError';
        }
        if (e != null && end != null && end > e) {
            return 'rangeError';
        }
    }

    if (start == null || end == null) {
        return true;
    }
    if (start > end) {
        return 'startGreaterThanEnd';
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
        let [start, end] = range;
        const resetMap = { millisecond: 0 };
        if (start) start = moment(+start).set(resetMap);
        if (end) end = moment(+end).set(resetMap);

        if ((start != null && date < start) || (end != null && date > end)) {
            return true;
        }
    }
    if (custom) {
        return custom(date, value == null ? value : moment(+value));
    }
};

export { isDateDisabled, getValidDate, isDateValid, isRangeDateValid };
