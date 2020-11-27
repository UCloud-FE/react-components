import React from 'react';
import Preview from 'react-styleguidist/lib/client/rsg-components/Preview/Preview';
import { DarkThemeContext } from './StyleGuideRenderer';

export default props => {
    const darkTheme = React.useContext(DarkThemeContext);
    return <Preview {...props} />;
};
