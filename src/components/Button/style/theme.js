import { colorList } from 'src/components/ThemeProvider/color';

export default {
    primary: {
        text: colorList.white,
        background: colorList.primary2,
        border: colorList.primary2
    },
    'primary:hover': {
        text: colorList.white,
        background: colorList.primary1,
        border: colorList.primary1
    },
    border: {
        text: colorList.secondary1,
        background: colorList.white,
        border: colorList.secondary4
    },
    'border:hover': {
        text: colorList.primary,
        background: colorList.white,
        border: colorList.primary2
    },
    'border-gray': {
        text: colorList.secondary1,
        background: colorList.primary4,
        border: colorList.secondary4
    },
    'border-gray:hover': {
        text: colorList.primary2,
        background: colorList.primary4,
        border: colorList.primary2
    }
};
