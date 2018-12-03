import Color from 'color';

import { colorList } from 'src/components/ThemeProvider/color';

const theme = {
    'default:active': {
        text: colorList.primary,
        border: colorList.secondary4
    },
    'default:hover': {},
    ink: {
        // ink bar color
        bar: colorList.primary
    },
    'ink:active': {
        // ink active text color
        text: colorList.primary
    }
};

theme['default:hover'].text = Color(theme['default:active'].text).alpha(0.2);
theme['default:hover'].border = Color(theme['default:active'].border).alpha(0.2);

export default theme;
