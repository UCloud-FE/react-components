import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { itemPrefix, CombineWrap } from './style';

class Combine extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /**
         * 组件共享的 props，如 size、disabled、className、style 等
         */
        sharedProps: PropTypes.object,
        /**
         * 子组件间的间距，smart 时会根据 sharedProps 中的 size 自动变换间距，compact 为紧凑型布局
         */
        spacing: PropTypes.oneOfType([PropTypes.oneOf(['compact', 'smart', 'sm', 'md', 'lg']), PropTypes.string]),
        /** 分隔符 */
        separator: PropTypes.node
    };
    static defaultProps = {
        sharedProps: {},
        spacing: 'smart'
    };
    render() {
        const { children, sharedProps, spacing, separator, ...rest } = this.props;
        const { size = 'md' } = sharedProps;
        let isFirstItem;
        return (
            <CombineWrap spacing={spacing === 'smart' ? size : spacing} {...rest}>
                {React.Children.map(children, child => {
                    isFirstItem = isFirstItem === undefined ? true : false;
                    const _child = React.isValidElement(child)
                        ? React.cloneElement(child, {
                              ...sharedProps,
                              className: classnames(child.props.className, itemPrefix, sharedProps.className)
                          })
                        : child;
                    return separator && !isFirstItem
                        ? [
                              <span className={itemPrefix} key="separator">
                                  {separator}
                              </span>,
                              _child
                          ]
                        : _child;
                })}
            </CombineWrap>
        );
    }
}

export default Combine;
