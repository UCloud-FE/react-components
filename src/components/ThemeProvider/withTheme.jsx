import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './theme';

const withTheme = Comp => {
    class ThemedComponent extends Component {
        static propTypes = {
            theme: PropTypes.object
        };
        render() {
            const { theme, ...rest } = this.props;
            return (
                <ThemeProvider theme={theme || defaultTheme}>
                    <Comp {...rest} />
                </ThemeProvider>
            );
        }
    }
    return ThemedComponent;
};
export default withTheme;
