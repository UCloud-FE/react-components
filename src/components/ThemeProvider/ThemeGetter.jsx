import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import defaultTheme from './theme';

class ThemeGetter extends PureComponent {
    static propTypes = {
        theme: PropTypes.object,
        children: PropTypes.func.isRequired
    };
    static defaultProps = {
        theme: defaultTheme
    };
    render() {
        const { theme, children, ...rest } = this.props;
        return children(theme, rest);
    }
}

export default withTheme(ThemeGetter);
