import { DisabledFunc, TDate } from '@z-r/calendar';
import moment, { Moment } from 'moment';

export interface Rules {
    /** 范围值 */
    range?: [TDate, TDate];
    /** @deprecated */
    custom?: (date: Moment, value?: Moment | null) => boolean;
}

export const getDisabledRule = (
    rules?: Rules
): {
    date?: DisabledFunc;
    month?: DisabledFunc;
    year?: DisabledFunc;
    decade?: DisabledFunc;
} => {
    if (!rules) return {};
    const disabledRule: {
        date?: DisabledFunc;
        month?: DisabledFunc;
        year?: DisabledFunc;
        decade?: DisabledFunc;
    } = {};
    if (rules.range) {
        disabledRule.date = (date: TDate, value?: TDate) => !!isDateDisabled(date, value, rules);
        disabledRule.month = (date: TDate) => !!isMonthDisabled(date, rules);
        disabledRule.year = (date: TDate) => !!isYearDisabled(date, rules);
        disabledRule.decade = (date: TDate) => !!isDecadeDisabled(date, rules);
        return disabledRule;
    }
    return {};
};

export const isDateDisabled = (date: TDate, value?: TDate | null, rules?: Rules) => {
    date = moment(+date);
    if (!rules) {
        return false;
    }
    const { range, custom } = rules;
    if (range) {
        const [start, end] = range;
        if (
            (start != null && moment(+date).endOf('date') < start) ||
            (end != null && moment(+date).startOf('date') > end)
        ) {
            return true;
        }
    }
    if (custom) {
        return custom(moment(+date), value == null ? value : moment(+value));
    }
};

const isMonthDisabled = (date: TDate, rules?: Rules) => {
    date = moment(+date);
    if (!rules) return false;
    const { range } = rules;
    if (range) {
        const [start, end] = range;
        if (
            (start != null && moment(+date).endOf('month') < start) ||
            (end != null && moment(+date).startOf('month') > end)
        ) {
            return true;
        }
    }
};

const isYearDisabled = (date: TDate, rules?: Rules) => {
    date = moment(+date);
    if (!rules) return false;
    const { range } = rules;
    if (range) {
        const [start, end] = range;
        if (
            (start != null && moment(+date).endOf('year') < start) ||
            (end != null && moment(+date).startOf('year') > end)
        ) {
            return true;
        }
    }
};

const isDecadeDisabled = (date: TDate, rules?: Rules) => {
    date = moment(+date);
    if (!rules) return false;
    const { range } = rules;
    if (range) {
        const [start, end] = range;
        const baseYear = (((date as Moment).year() / 10) | 0) * 10;
        if (
            (start != null &&
                moment(+date)
                    .set('year', baseYear + 10)
                    .endOf('year') < start) ||
            (end != null &&
                moment(+date)
                    .set('year', baseYear)
                    .startOf('year') > end)
        ) {
            return true;
        }
    }
};

export const getValidDate = (date: TDate, rules?: Rules) => {
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
