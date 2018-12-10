import _ from 'lodash';

import defaultTheme from './theme';

const addDefaultThemeProps = (...Components) => {
    _.each(Components, Component => {
        if (!Component.defaultProps) {
            Component.defaultProps = {};
        }
        Component.defaultProps.theme = defaultTheme;
    });
};

export default addDefaultThemeProps;
