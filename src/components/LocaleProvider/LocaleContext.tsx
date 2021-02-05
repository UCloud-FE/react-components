import React from 'react';

export interface LocaleMap {
    [localeName: string]: string;
}
export interface AllLocaleMap {
    [componentName: string]: LocaleMap;
}

const LocaleContext = React.createContext<AllLocaleMap>({});

export default LocaleContext;
