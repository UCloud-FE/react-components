import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import Combine from 'src/components/Combine';
import deprecatedLog from 'src/utils/deprecatedLog';
import { prefixCls, controllerPrefix } from './style';

const deprecatedLogForReplace = deprecatedLog('Compact', 'Combine(spacing="compact")');

/**
 * @deprecated 请使用 Combine 替代
 */
class Compact extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        className: PropTypes.string,
        /** 组件共享的props，如size、className、style等 */
        sharedProps: PropTypes.object
    };
    static defaultProps = {
        sharedProps: {}
    };
    constructor(props) {
        super(props);
        deprecatedLogForReplace();
    }
    render() {
        const { className, sharedProps, ...rest } = this.props;
        const { className: controllerClassName } = sharedProps;
        return (
            <Combine
                spacing="compact"
                sharedProps={{ ...sharedProps, className: classnames(controllerClassName, controllerPrefix) }}
                {...rest}
                className={classnames(prefixCls, className)}
            />
        );
    }
}

export default Compact;
