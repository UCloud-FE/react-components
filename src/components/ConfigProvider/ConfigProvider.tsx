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
     * 默认为 true。
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
    /**
     * 默认为 true。
     * 阻止 Form 组件的默认事件，避免在回车时触发页面提交，原生 form 在某些情况下会触发原生的提交，由于现在基本 SPA，页面提交概率不大，故默认屏蔽 Form 组件该行文，如需开启，可设置为 false
     */
    preventFormDefaultAction?: boolean;
    /**
     * 设置 Icon 组件的默认 prefix，默认为 icon__，
     */
    iconDefaultPrefix?: string;
    /** 提供时会使用 ThemeProvider 包裹 */
    theme?: any;
    /** 提供时会使用 LocaleProvider 包裹 */
    locale?: AllLocaleMap;
    /** 是否默认启用 ActionList 的 autoAdJustment 参数 */
    actionListAutoAdjustment?: boolean;
}

const ConfigProvider = ({ children, theme, locale, ...rest }: ConfigProviderProps) => {
    let provider = <ConfigContext.Provider value={{ ...defaultConfig, ...rest }}>{children}</ConfigContext.Provider>;
    if (theme) provider = <ThemeProvider theme={theme}>{provider}</ThemeProvider>;
    if (locale) provider = <LocaleProvider locale={locale}>{provider}</LocaleProvider>;
    return provider;
};

export default ConfigProvider;
