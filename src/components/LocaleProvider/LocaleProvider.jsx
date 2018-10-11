import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LocaleProvider extends Component {
    static propTypes = {
        children: PropTypes.node,
        locale: PropTypes.object
    };
    static defaultProps = {
        locale: {}
    };
    static childContextTypes = {
        UC_FE_LOCALE: PropTypes.object
    };
    getChildContext() {
        return {
            UC_FE_LOCALE: {
                ...this.props.locale
            }
        };
    }
    render() {
        return React.Children.only(this.props.children);
    }
}

export default LocaleProvider;
