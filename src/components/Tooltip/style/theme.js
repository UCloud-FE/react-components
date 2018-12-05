import { colorList, colorMap } from 'src/components/ThemeProvider/color';

export default {
    light: {
        arrow: {
            background: colorMap.default.background,
            border: colorMap.default.border
        },
        content: {
            background: colorMap.default.background,
            border: colorMap.default.border,
            text: colorMap.default.text
        }
    },
    dark: {
        arrow: {
            background: '#3a4161',
            border: '#3a4161'
        },
        content: {
            background: '#3a4161',
            border: '#3a4161',
            text: colorList.white
        }
    }
};
