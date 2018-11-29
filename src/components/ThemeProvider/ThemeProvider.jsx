import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import defaultTheme from './theme';

const extend = (source, target) => {
    const cloneSource = JSON.parse(JSON.stringify(source));
    const _extend = (source, target) => {
        _.each(target, (v, k) => {
            if (_.isObject(v) && _.isObject(source[k])) {
                source[k] = _extend(source[k], v);
            } else {
                source[k] = v;
            }
        });
        return source;
    };
    return _extend(cloneSource, target);
};

class ThemeProvider extends Component {
    static propTypes = {
        theme: PropTypes.object
    };
    shouldComponentUpdate = nextProps => {
        if (JSON.stringify(nextProps.theme) === this.cache) {
            return false;
        }
        return true;
    };

    render() {
        const { theme, ...rest } = this.props;
        this.cache = JSON.stringify(theme);
        return <SCThemeProvider theme={extend(defaultTheme, theme)} {...rest} />;
    }
}

export default ThemeProvider;
