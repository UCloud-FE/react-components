import _ from 'lodash';

import defaultTheme from './theme';
import Button from 'src/components/Button';

const addDefaultThemeProps = (...Components) => {
    _.each(Components, Component => {
        console.log(Component.displayName);
        if (Component.displayName === 'Button') debugger;
        if (!Component.defaultProps) {
            Component.defaultProps = {};
        }
        Component.defaultProps.theme = defaultTheme;
    });
};

export default addDefaultThemeProps;
