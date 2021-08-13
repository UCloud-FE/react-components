import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { ThemeProvider as SCThemeProvider } from 'emotion-theming';

import { generateTheme } from './theme';
import { setRuntimeTheme } from './runtime';

let themeStack = [];
const themeMap = {};
const updateRuntimeTheme = () => {
    setRuntimeTheme(themeMap[themeStack[themeStack.length - 1]]);
};

class ThemeProvider extends Component {
    constructor(props) {
        super(props);
        const theme = this.getMergedTheme(props.theme);
        this.cache = JSON.stringify(theme);
        this.state = {
            theme
        };
        this.uid = _.uniqueId('_theme_provider_');
        themeStack.push(this.uid);
        themeMap[this.uid] = theme;
        updateRuntimeTheme();
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
            this.setState(
                {
                    theme: mergedTheme
                },
                () => {
                    themeMap[this.uid] = mergedTheme;
                    updateRuntimeTheme();
                }
            );
        }
    }
    componentWillUnmount = () => {
        delete themeMap[this.uid];
        themeStack = themeStack.filter(uid => uid !== this.uid);
        updateRuntimeTheme();
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { theme: _theme, ...rest } = this.props;
        const { theme } = this.state;
        return <SCThemeProvider theme={theme} {...rest} />;
    }
}

export default ThemeProvider;
