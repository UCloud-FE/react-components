import { useContext, useMemo } from 'react';

import LocaleContext, { LocaleMap } from './LocaleContext';
import { getRuntimeLocale } from './locale/runtime';

const useLocale = <T = LocaleMap>(
    defaultLocale: T,
    localeName: string,
    componentLocale?: T,
    requireRuntimeLocale?: boolean
): T => {
    const contextLocale = useContext(LocaleContext);
    return useMemo(() => {
        return {
            ...defaultLocale,
            ...contextLocale[localeName],
            ...(requireRuntimeLocale ? getRuntimeLocale()[localeName] : {}),
            ...componentLocale
        };
    }, [componentLocale, contextLocale, defaultLocale, localeName, requireRuntimeLocale]);
};

export default useLocale;

export type LocaleProps = {
    locale?: LocaleMap;
};
