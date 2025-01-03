import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ZFormContext } from './ZForm';

const controllerDecorator = options => {
    return function decorator(Controller) {
        return class WrappedController extends Component {
            static propTypes = {
                zName: PropTypes.string.isRequired,
                zOptions: PropTypes.any
            };

            render() {
                const { zName, zOptions, ...controllerProps } = this.props;
                const rules = (zOptions && zOptions.rules ? zOptions.rules : []).map(rule => {
                    if (rule.validator) {
                        const propValidator = rule.validator;
                        return {
                            ...rule,
                            validator: (rule, value, callback, ...args) => {
                                propValidator(
                                    rule,
                                    value,
                                    res => {
                                        if (res !== null) {
                                            callback(res);
                                        } else {
                                            callback();
                                        }
                                    },
                                    ...args
                                );
                            }
                        };
                    } else {
                        return rule;
                    }
                });
                return (
                    <ZFormContext.Consumer>
                        {({ form }) =>
                            form.getFieldDecorator(zName, {
                                ...options,
                                ...{
                                    ...zOptions,
                                    rules: rules
                                }
                            })(<Controller {...controllerProps} />)
                        }
                    </ZFormContext.Consumer>
                );
            }
        };
    };
};

export default controllerDecorator;
