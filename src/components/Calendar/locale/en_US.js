const months = 'January_February_March_April_May_June_July_August_September_October_November_December'
    .split('_')
    .map(v => v.substr(0, 3));
const weekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_').map(v => v.substr(0, 2));

export default {
    month: '',
    year: '',
    monthBeforeYear: true,
    months,
    weekdays,
    disabledTip: 'Invalid date'
};
