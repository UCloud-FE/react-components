import React, { ReactNode } from 'react';

import ThemeProvider from 'src/components/ThemeProvider';
import LocaleProvider from 'src/components/LocaleProvider';
import { AllLocaleMap } from 'src/components/LocaleProvider/LocaleContext';

import ConfigContext, { defaultConfig } from './ConfigContext';

export interface ConfigProviderProps {
    /** @ignore */
    children: ReactNode;
    /**
     * @deprecated 使用 popover 替换
     * 控制全局的 forwardPopupContainer 属性，默认为 true，为 false 时默认关闭 datepicker、select、actionList 等内部的 forwardPopupContainer
     */
    forwardPopupContainer?: boolean;
    /** 全局控制 popover 类组件行为，datepicker、select、actionList  */
    popover?: {
        /** 控制弹出层默认容器 */
        getPopupContainer?: (triggerNode: Element) => Element;
        /** 滚动时是否重新定位 */
        forceAlignWhenScroll?: boolean;
        /** 控制默认的 forwardPopupContainer */
        forwardPopupContainer?: boolean | ((triggerNode: Element) => Element);
        /** 配置不影响 Popover 组件 */
        ignorePopover?: boolean;
    };
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
