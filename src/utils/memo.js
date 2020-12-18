export default handle => {
    const memoMap = {};
    return (key, ...args) => {
        // eslint-disable-next-line no-prototype-builtins
        if (memoMap.hasOwnProperty(key)) {
            return memoMap[key];
        }
        const returnValue = handle(key, ...args);
        return (memoMap[key] = returnValue);
    };
};
