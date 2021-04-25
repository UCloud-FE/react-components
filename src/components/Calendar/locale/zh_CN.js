const months = '一_二_三_四_五_六_七_八_九_十_十一_十二'.split('_').map(v => `${v}月`);
const weekdays = '日_一_二_三_四_五_六'.split('_');

export default {
    month: '月',
    year: '年',
    monthBeforeYear: false,
    months,
    weekdays
};
