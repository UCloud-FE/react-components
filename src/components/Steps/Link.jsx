import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import LinkIcon from './icons/Link';
import { LinkWrapper } from './style';

export default class Step extends PureComponent {
    static propTypes = {
        status: PropTypes.oneOf(['before', 'after'])
    };

    render() {
        const { status, ...rest } = this.props;
        return (
            <LinkWrapper status={status} {...rest}>
                <LinkIcon />
            </LinkWrapper>
        );
    }
}
