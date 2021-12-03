import { AllLocaleMap } from './LocaleContext';

let runtimeLocale: AllLocaleMap = {};

const setRuntimeLocale = (_runtimeLocale: AllLocaleMap) => {
    runtimeLocale = _runtimeLocale;
};
const getRuntimeLocale = () => {
    return runtimeLocale;
};

export { setRuntimeLocale, getRuntimeLocale };
