import defaultTheme from './theme';

let runtimeTheme = defaultTheme;

const setRuntimeTheme = _runtimeTheme => {
    runtimeTheme = _runtimeTheme;
};
const getRuntimeTheme = () => {
    return runtimeTheme;
};

export { setRuntimeTheme, getRuntimeTheme };
