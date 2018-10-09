const sleep = duration => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
};
export default sleep;
