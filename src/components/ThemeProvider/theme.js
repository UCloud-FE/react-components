import Tabs from 'src/components/Tabs/style/theme';
import Button from 'src/components/Button/style/theme';
import Card from 'src/components/Card/style/theme';

import { colorList, colorMap } from './color';

const componentTheme = {
    Button,
    Tabs,
    Card
};

export default {
    // theme of components
    ...componentTheme,
    // map of color and status
    colorMap,
    // list of all color
    colorList,
    // default font-size
    fontSize: '12px',
    // font-size of title
    titleFontSize: '14px',
    // height of size
    Height: {
        sm: '22px',
        md: '28px',
        lg: '34px'
    },
    // padding of size
    Padding: {
        sm: '8px',
        md: '8px',
        lg: '12px'
    }
};
