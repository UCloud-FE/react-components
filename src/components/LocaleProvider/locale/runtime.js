let runtimeLocale = {};

const setRuntimeLocale = _runtimeLocale => {
    runtimeLocale = _runtimeLocale;
};
const getRuntimeLocale = () => {
    return runtimeLocale;
};

export { setRuntimeLocale, getRuntimeLocale };
