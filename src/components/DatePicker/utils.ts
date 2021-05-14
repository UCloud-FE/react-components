import moment, { Moment } from 'moment';
import { TDate } from '@z-r/calendar/types/interface';

import { isDateDisabled, getValidDate } from 'src/components/Calendar/utils';

type Range = [TDate | void | null, TDate | void | null];
type Precision = 'second' | 'minute' | 'hour' | 'date' | 'month' | 'year';

export interface Rules {
    range?: Range;
    custom?: (date: Moment, value?: Moment | null) => boolean;
}

const isRangeDateValid = (
    value: [TDate | null, TDate | null],
    rules: {
        range?: Range;
        maxRange?: any;
        minRange?: any;
    },
    precision?: Precision | null
) => {
    let [start, end] = value;
    start = start == null ? null : moment(+start);
    end = end == null ? null : moment(+end);
    if (precision) {
        start && start.startOf(precision);
        end && end.startOf(precision);
    }
    const { range, maxRange, minRange } = rules;
    if (range) {
        let [s, e] = range;
        s = s == null ? null : moment(+s);
        e = e == null ? null : moment(+e);
        if (precision) {
            s && s.startOf(precision);
            e && e.startOf(precision);
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
        if (start != null) start = moment(+start).startOf('second');
        if (end != null) end = moment(+end).startOf('second');
        const v = date.startOf('second');

        if ((start != null && v < start) || (end != null && v > end)) {
            return true;
        }
    }
    if (custom) {
        return custom(date, value == null ? value : moment(+value));
    }
};

export { isDateDisabled, getValidDate, isDateValid, isRangeDateValid };
