const once = <A extends any[], R extends void>(func: (...args: A) => R): ((...args: A) => R) => {
    let result: R;
    let done = false;
    return function (...args: A) {
        if (!done) {
            done = true;
            result = func(...args);
        }
        return result;
    };
};

export default once;
