import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ConfigContext, { defaultConfig } from './ConfigContext';

class ConfigProvider extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** 控制全局的 forwardPopupContainer 属性，默认为 true，为 false 时默认关闭 datepicker、select、actionList 等内部的 forwardPopupContainer */
        forwardPopupContainer: PropTypes.bool
    };
    render() {
        const { children, ...rest } = this.props;
        return <ConfigContext.Provider value={{ ...defaultConfig, ...rest }}>{children}</ConfigContext.Provider>;
    }
}

export default ConfigProvider;
