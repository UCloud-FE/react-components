import { createContext } from 'react';

import { ConfigProviderProps } from './ConfigProvider';

export const defaultConfig = {
    forwardPopupContainer: true,
    preventFormDefaultAction: true
};

export type ConfigContextType = Pick<
    ConfigProviderProps,
    'forwardPopupContainer' | 'popover' | 'preventFormDefaultAction' | 'iconDefaultPrefix' | 'actionListAutoAdjustment'
>;

export default createContext<ConfigContextType>(defaultConfig);
