import { createContext } from 'react';

export const defaultConfig = {
    forwardPopupContainer: true,
    preventFormDefaultAction: true
};

export default createContext<{
    forwardPopupContainer?: boolean;
    getPopupContainer?: (triggerNode: Element) => Element;
    preventFormDefaultAction?: boolean;
}>(defaultConfig);
