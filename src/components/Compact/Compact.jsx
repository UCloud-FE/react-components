import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { controllerPrefix, CompactWrap } from './style';

class Compact extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** 组件共享的props，如size、className、style等 */
        sharedProps: PropTypes.object
    };
    static defaultProps = {
        sharedProps: {}
    };
    render() {
        const { children, sharedProps, ...rest } = this.props;
        return (
            <CompactWrap {...rest}>
                {React.Children.map(
                    children,
                    child =>
                        React.isValidElement(child)
                            ? React.cloneElement(child, {
                                  ...sharedProps,
                                  className: classnames(controllerPrefix, child.props.className, sharedProps.className)
                              })
                            : child
                )}
            </CompactWrap>
        );
    }
}

export default Compact;
