import { TDate } from '@z-r/calendar/types/interface';
import moment, { Moment } from 'moment';

export interface Rules {
    range?: [TDate, TDate];
    custom?: (date: Moment, value?: Moment | null) => boolean;
}

const isDateDisabled = (date: TDate, value?: TDate | null, rules?: Rules) => {
    date = moment(+date);
    if (!rules) {
        return false;
    }
    const { range, custom } = rules;
    if (range) {
        const [start, end] = range;
        if (
            (start != null && moment(date).set({ hour: 23, minute: 59, second: 59, millisecond: 999 }) < start) ||
            (end != null && moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) > end)
        ) {
            return true;
        }
    }
    if (custom) {
        return custom(date, value == null ? value : moment(+value));
    }
};

const getValidDate = (date: TDate, rules?: Rules) => {
    const d = moment(+date);
    if (!rules) {
        return d;
    }
    const { range } = rules;
    if (range) {
        const [start, end] = range;

        if (start != null && d < start) {
            return moment(+start);
        }
        if (end != null && d > end) {
            return moment(+end);
        }
    }
    return d;
};

export { isDateDisabled, getValidDate };
