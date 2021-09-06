export default <T extends Record<string, unknown>>(v: any): v is T => {
    return {}.toString.call(v) === '[object Object]';
};
