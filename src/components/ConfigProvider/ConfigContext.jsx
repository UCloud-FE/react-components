import { createContext } from 'react';

export const defaultConfig = {
    forwardPopupContainer: true,
    preventFormDefaultAction: true
};

export default createContext(defaultConfig);