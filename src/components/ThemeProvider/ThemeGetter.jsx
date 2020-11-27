import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';

import InnerDefaultThemeProvider from './InnerDefaultThemeProvider';

class ThemeGetter extends PureComponent {
    static propTypes = {
        theme: PropTypes.object,
        children: PropTypes.func.isRequired
    };
    render() {
        const { theme, children, ...rest } = this.props;
        return children(theme, rest);
    }
}

const ThemeGetterWithTheme = withTheme(ThemeGetter);

const ThemeGetterWithDefaultTheme = props => (
    <InnerDefaultThemeProvider>
        <ThemeGetterWithTheme {...props} />
    </InnerDefaultThemeProvider>
);

export default ThemeGetterWithDefaultTheme;
