import _ from 'lodash';

import Tabs from 'src/components/Tabs/style/theme';
import Button from 'src/components/Button/style/theme';
import Menu from 'src/components/Menu/style/theme';
import Switch from 'src/components/Switch/style/theme';
import Tooltip from 'src/components/Tooltip/style/theme';

import { colorList, colorMap } from './color';

const componentTheme = {
    Button,
    Tabs,
    Menu,
    Switch,
    Tooltip
};

const theme = {
    // list of all color
    colorList,
    // map of color and status
    colorMap,
    // default font-size
    fontSize: '12px',
    // font-size of title
    titleFontSize: '14px',
    // height of size (px)
    Height: {
        sm: '22px',
        md: '28px',
        lg: '34px'
    },
    // padding of size (px)
    Padding: {
        sm: '8px',
        md: '8px',
        lg: '12px'
    },
    // theme of components
    ...componentTheme
};

theme.HeightNumber = _.mapValues(theme.Height, v => +v.replace('px', ''));

export default theme;
