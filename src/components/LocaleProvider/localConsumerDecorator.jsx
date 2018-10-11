import React, { Component } from 'react';
import PropTypes from 'prop-types';

const localConsumerDecorator = ({ defaultLocale = {}, localeName }) => Child => {
    class LocalConsumerWrappedComponent extends Component {
        static propTypes = {
            locale: PropTypes.object
        };
        static defaultProps = {
            locale: {}
        };
        static contextTypes = {
            UC_FE_LOCALE: PropTypes.object
        };
        render() {
            const { locale, ...rest } = this.props;
            const context = this.context.UC_FE_LOCALE || {};
            return <Child locale={{ ...defaultLocale, ...context[localeName], ...locale }} {...rest} />;
        }
    }
    return LocalConsumerWrappedComponent;
};

export default localConsumerDecorator;
