export default handle => {
    const memoMap = {};
    return (key, ...args) => {
        if (memoMap.hasOwnProperty(key)) {
            return memoMap[key];
        }
        const returnValue = handle(key, ...args);
        return (memoMap[key] = returnValue);
    };
};
