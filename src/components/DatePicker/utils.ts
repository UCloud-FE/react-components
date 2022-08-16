/* stylelint-disable */

import moment, { Moment } from 'moment';
import { TDate } from '@ucloud-fe/calendar';

import { isDateDisabled, getValidDate } from 'src/components/Calendar/utils';

type Range = [TDate | void | null, TDate | void | null];
export type Precision = 'second' | 'minute' | 'hour' | 'date' | 'month' | 'year';

export interface Rules {
    range?: Range;
    custom?: (date: Moment, value?: Moment | null) => boolean;
}

export const formatToShort = (format: string): string => {
    return format
        .replace('YYYY', 'YY')
        .replace('MM', 'M')
        .replace('DD', 'D')
        .replace('HH', 'H')
        .replace('mm', 'm')
        .replace('ss', 's');
};

export const setPrecision = (v: TDate, precision?: Precision) => {
    if (precision) {
        v = moment(+v).startOf(precision);
    }
    return v;
};

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
        start && (<Moment>start).startOf(precision);
        end && (<Moment>end).startOf(precision);
    }
    const { range, maxRange, minRange } = rules;
    if (range) {
        let [s, e] = range;
        s = s == null ? null : moment(+s);
        e = e == null ? null : moment(+e);
        if (precision) {
            s && (<Moment>s).startOf(precision);
            e && (<Moment>e).startOf(precision);
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
    if (maxRange && moment(<Moment>start).add(maxRange) < end) {
        return 'maxRangeError';
    }
    if (minRange && moment(<Moment>end).subtract(minRange) < start) {
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
        const v = (<Moment>date).startOf('second');

        if ((start != null && v < start) || (end != null && v > end)) {
            return true;
        }
    }
    if (custom) {
        return custom(<Moment>date, value == null ? value : moment(+value));
    }
};

export { isDateDisabled, getValidDate, isDateValid, isRangeDateValid };
