import React, { ReactNode, useEffect } from 'react';

import { setRuntimeLocale } from './runtime';
import LocaleContext, { AllLocaleMap } from './LocaleContext';

const LocaleProvider = ({ locale = {}, children }: { locale: AllLocaleMap; children: ReactNode }) => {
    useEffect(() => {
        setRuntimeLocale(locale);
    }, [locale]);
    return <LocaleContext.Provider value={locale}>{React.Children.only(children)}</LocaleContext.Provider>;
};

export default React.memo(LocaleProvider);
