import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SeparatorWrap, BreadcrumbWrap } from 'components/Breadcrumb/style';

class Breadcrumb extends Component {
    static propTypes = {
        /** 自定义分隔符 */
        separator: PropTypes.node,
        /** @ignore */
        children: PropTypes.node
    };
    static defaultProps = {
        separator: '/'
    };
    render() {
        const { separator, children, ...rest } = this.props;
        let isFirstItem;
        return (
            <BreadcrumbWrap {...rest}>
                {React.Children.map(children, child => {
                    if (React.isValidElement(child) && child.type.__IS_BREADCRUMB_ITEM) {
                        isFirstItem = isFirstItem === undefined ? true : false;
                        if (!isFirstItem) {
                            return [<SeparatorWrap key="separator">{separator}</SeparatorWrap>, child];
                        }
                    }
                    return child;
                })}
            </BreadcrumbWrap>
        );
    }
}

export default Breadcrumb;
