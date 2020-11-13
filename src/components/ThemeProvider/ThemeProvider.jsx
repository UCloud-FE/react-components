import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as SCThemeProvider } from 'emotion-theming';

import defaultTheme from './theme';
import { generateTheme } from './theme';
import { setRuntimeTheme } from './runtime';

class ThemeProvider extends Component {
    constructor(props) {
        super(props);
        const theme = this.getMergedTheme(props.theme);
        this.cache = JSON.stringify(theme);
        this.state = {
            theme
        };
        setRuntimeTheme(theme);
    }
    static propTypes = {
        /**
         * 自定义主题
         */
        theme: PropTypes.object.isRequired
    };
    getMergedTheme = theme => {
        return generateTheme(theme);
    };
    componentWillReceiveProps(nextProps) {
        const { theme } = nextProps;
        if (JSON.stringify(theme) !== this.cache) {
            const mergedTheme = this.getMergedTheme(theme);
            this.cache = JSON.stringify(theme);
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
