import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getRuntimeLocale } from './locale/runtime';

const localeConsumerDecorator = ({ defaultLocale = {}, localeName, publicFn = [], requireRuntimeLocale }) => Child => {
    class LocalConsumerWrappedComponent extends Component {
        constructor(...args) {
            super(...args);
            publicFn.forEach(fnName => {
                this[fnName] = (...args) => this.child && this.child[fnName](...args);
            });
        }
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
            return (
                <Child
                    ref={ref => (this.child = ref)}
                    locale={{
                        ...defaultLocale,
                        ...context[localeName],
                        ...(requireRuntimeLocale ? getRuntimeLocale()[localeName] : {}),
                        ...locale
                    }}
                    {...rest}
                />
            );
        }
    }
    return LocalConsumerWrappedComponent;
};

export default localeConsumerDecorator;
