import defaultTheme from './theme';

let runtimeTheme = defaultTheme;

const setRuntimeTheme = _runtimeTheme => {
    runtimeTheme = _runtimeTheme;
};
const getRuntimeTheme = () => {
    return runtimeTheme || defaultTheme;
};

export { setRuntimeTheme, getRuntimeTheme };
