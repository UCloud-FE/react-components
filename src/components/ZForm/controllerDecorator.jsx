import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ZFormContext } from './ZForm';

const controllerDecotator = options => {
    return function decorator(Controller) {
        return class WrappedController extends Component {
            static propTypes = {
                zName: PropTypes.string.isRequired,
                zOptions: PropTypes.any
            };

            render() {
                const { zName, zOptions, ...controllerProps } = this.props;
                return (
                    <ZFormContext.Consumer>
                        {({ form }) =>
                            form.getFieldDecorator(zName, { ...options, ...zOptions })(
                                <Controller {...controllerProps} />
                            )
                        }
                    </ZFormContext.Consumer>
                );
            }
        };
    };
};

export default controllerDecotator;
