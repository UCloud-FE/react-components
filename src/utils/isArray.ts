export default <T>(v?: T[]): v is T[] => Object.prototype.toString.apply(v) === '[object Array]';
