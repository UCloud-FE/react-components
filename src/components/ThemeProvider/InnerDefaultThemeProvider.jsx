import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import ThemeGetter from './ThemeGetter';

export default class InnerDefaultThemeProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };
    render() {
        const { children } = this.props;
        return <ThemeGetter>{theme => <ThemeProvider theme={theme}>{children}</ThemeProvider>}</ThemeGetter>;
    }
}
