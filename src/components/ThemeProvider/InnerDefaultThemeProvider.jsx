import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';

import defaultTheme from './theme';

export default class InnerDefaultThemeProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };
    render() {
        const { children } = this.props;
        return <ThemeProvider theme={theme => theme || defaultTheme}>{children}</ThemeProvider>;
    }
}
