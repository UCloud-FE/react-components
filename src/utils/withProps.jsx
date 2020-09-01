import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { withTheme } from 'emotion-theming';

import defaultTheme from 'src/components/ThemeProvider/theme';

const withProps = input => Comp => {
    class ComponentWithProps extends Component {
        render() {
            const { props } = this;
            input = typeof input === 'function' ? input(props) : input;
            let { className } = input;
            if (className) {
                className = typeof className === 'function' ? className(props) : className;
            }

            // eslint-disable-next-line react/prop-types
            className = classnames(className, props.className);

            const result = {
                ...input,
                ...props,
                className
            };
            if (_.isEmpty(result.theme)) {
                result.theme = defaultTheme;
            }
            if (result._innerRef) {
                result.innerRef = result._innerRef;
                delete result._innerRef;
            }
            return <Comp {...result} />;
        }
    }
    return withTheme(ComponentWithProps);
};

export default withProps;
