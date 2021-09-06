import isFunction from './isFunction';

export default <T>(v: any): v is T => {
    if (!v) return true;
    if (isFunction(v)) return true;
    if ('length' in v) return !v.length;
    if ('size' in v) return !v.size;
    if (Object.keys(v).length) return false;
    return true;
};
