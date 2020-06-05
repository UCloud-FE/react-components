import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TagGroupWrapper } from './style';

class Group extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /**
         * 紧凑型布局
         */
        compact: PropTypes.bool
    };
    render() {
        const { ...rest } = this.props;
        return <TagGroupWrapper {...rest} />;
    }
}

export default Group;
