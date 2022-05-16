const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome/') > -1;
const isSafari = !isChrome && navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
export default isSafari;
