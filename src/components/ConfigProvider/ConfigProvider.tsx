import React, { ReactNode } from 'react';

import ThemeProvider from 'src/components/ThemeProvider';
import LocaleProvider from 'src/components/LocaleProvider';
import { AllLocaleMap } from 'src/components/LocaleProvider/LocaleContext';

import ConfigContext, { defaultConfig } from './ConfigContext';

interface ConfigProviderProps {
    /** @ignore */
    children: ReactNode;
    /** 控制全局的 forwardPopupContainer 属性，默认为 true，为 false 时默认关闭 datepicker、select、actionList 等内部的 forwardPopupContainer */
    forwardPopupContainer?: boolean;
    /** 控制全局的部分组件弹出层容器，datepicker、select、actionList 等 */
    getPopupContainer?: (triggerNode: Element) => Element;
    /** 阻止 Form 组件的默认事件，避免在回车时触发页面提交 */
    preventFormDefaultAction?: boolean;
    /** 提供时会使用 ThemeProvider 包裹 */
    theme?: any;
    /** 提供时会使用 LocaleProvider 包裹 */
    locale?: AllLocaleMap;
}

const ConfigProvider = ({ children, theme, locale, ...rest }: ConfigProviderProps) => {
    let provider = <ConfigContext.Provider value={{ ...defaultConfig, ...rest }}>{children}</ConfigContext.Provider>;
    if (theme) provider = <ThemeProvider theme={theme}>{provider}</ThemeProvider>;
    if (locale) provider = <LocaleProvider locale={locale}>{provider}</LocaleProvider>;
    return provider;
};

export default ConfigProvider;
