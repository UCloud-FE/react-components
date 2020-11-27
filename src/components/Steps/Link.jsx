import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { LinkWrapper, Icon } from './style';

export default class Step extends PureComponent {
    static propTypes = {
        status: PropTypes.oneOf(['before', 'after'])
    };

    render() {
        const { status, ...rest } = this.props;
        return (
            <LinkWrapper status={status} {...rest}>
                <Icon type="dotted-right-line-arrow" />
            </LinkWrapper>
        );
    }
}
