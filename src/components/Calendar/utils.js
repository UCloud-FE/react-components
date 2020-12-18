import moment from 'moment';

const isDateDisabled = (date, value, rules) => {
    date = moment(date);
    if (!rules) {
        return false;
    }
    const { range, custom } = rules;
    if (range) {
        const [start, end] = range;
        if (
            (start != null && moment(date).set({ hour: 23, minute: 59, second: 59 }) < start) ||
            (end != null && moment(date).set({ hour: 0, minute: 0, second: 0 }) > end)
        ) {
            return true;
        }
    }
    if (custom) {
        return custom(date, value);
    }
};

const getValidDate = (date, rules) => {
    date = moment(date);
    if (!rules) {
        return date;
    }
    const { range } = rules;
    if (range) {
        const [start, end] = range;

        if (start != null && date < start) {
            return moment(start);
        }
        if (end != null && date > end) {
            return moment(end);
        }
    }
    return date;
};

export { isDateDisabled, getValidDate };
