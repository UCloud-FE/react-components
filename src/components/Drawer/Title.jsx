import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DrawerHeaderWrap } from './style';

class Title extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node
    };
    render() {
        const { ...rest } = this.props;
        return <DrawerHeaderWrap {...rest} />;
    }
}

export default Title;
