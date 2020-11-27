import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from 'src/components/ThemeProvider';
import LocaleProvider from 'src/components/LocaleProvider';

import ConfigContext, { defaultConfig } from './ConfigContext';

class ConfigProvider extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** 控制全局的 forwardPopupContainer 属性，默认为 true，为 false 时默认关闭 datepicker、select、actionList 等内部的 forwardPopupContainer */
        forwardPopupContainer: PropTypes.bool,
        /** 提供时会使用 ThemeProvider 包裹 */
        theme: PropTypes.object,
        /** 提供时会使用 LocaleProvider 包裹 */
        locale: PropTypes.object
    };
    render() {
        const { children, theme, locale, ...rest } = this.props;
        let provider = (
            <ConfigContext.Provider value={{ ...defaultConfig, ...rest }}>{children}</ConfigContext.Provider>
        );
        if (theme) provider = <ThemeProvider theme={theme}>{provider}</ThemeProvider>;
        if (locale) provider = <LocaleProvider locale={locale}>{provider}</LocaleProvider>;
        return provider;
    }
}

export default ConfigProvider;
