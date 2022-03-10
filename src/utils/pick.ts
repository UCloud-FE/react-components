export default <T>(obj: T, keys: (keyof T)[]) => {
    const result: any = {};
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result as Pick<T, keyof T>;
};
