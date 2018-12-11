import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import defaultTheme from './theme';
import { generateTheme } from './theme';
import { setRuntimeTheme } from './runtime';

class ThemeProvider extends Component {
    constructor(props) {
        super(props);
        const theme = this.getMergedTheme(props.theme);
        this.state = {
            theme
        };
        setRuntimeTheme(theme);
    }
    static propTypes = {
        theme: PropTypes.object.isRequired
    };
    getMergedTheme = theme => {
        this.cache = JSON.stringify(theme);
        console.log(generateTheme(theme));
        return generateTheme(theme);
    };
    componentWillReceiveProps(nextProps) {
        const { theme } = nextProps;
        const mergedTheme = this.getMergedTheme(theme);
        if (JSON.stringify(theme) !== this.cache) {
            this.setState({
                theme: mergedTheme
            });
            setRuntimeTheme(mergedTheme);
        }
    }
    componentWillUnmount = () => {
        setRuntimeTheme(defaultTheme);
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { theme: _theme, ...rest } = this.props;
        const { theme } = this.state;
        return <SCThemeProvider theme={theme} {...rest} />;
    }
}

export default ThemeProvider;
