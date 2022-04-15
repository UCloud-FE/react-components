const months = '1_2_3_4_5_6_7_8_9_10_11_12'.split('_').map(v => `${v}月`);
const weekdays = '日_一_二_三_四_五_六'.split('_');

export default {
    month: '月',
    year: '年',
    monthBeforeYear: false,
    months,
    weekdays
};
