/** 构建error */
const generateError = (message, name) => {
    const error = new Error(message);
    if (name) {
        error.name = name;
    }
    return error;
};

export default generateError;
