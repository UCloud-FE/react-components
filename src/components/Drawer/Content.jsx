import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DrawerContentWrap } from './style';

class Content extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node
    };
    render() {
        const { ...rest } = this.props;
        return <DrawerContentWrap {...rest} />;
    }
}

export default Content;
