import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { setRuntimeLocale } from './locale/runtime';

class LocaleProvider extends Component {
    constructor(props) {
        super(props);
        const { locale } = props;
        setRuntimeLocale(locale);
    }
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
    componentWillReceiveProps = nextProps => {
        if (nextProps.locale !== this.props.locale) {
            setRuntimeLocale(nextProps.locale);
        }
    };
    render() {
        return React.Children.only(this.props.children);
    }
}

export default LocaleProvider;
