import { colorMap } from 'src/components/ThemeProvider/color';

export default {
    light: {
        text: colorMap.default.text,
        background: colorMap.default.background,
        // item hover colors
        'item:hover': {
            background: colorMap.active.background
        },
        // item active colors
        'item:active': {
            text: colorMap.active.text
        },
        // colors of collapse sub menu
        collapse: {
            border: colorMap.default.border
        }
    },
    dark: {
        text: 'rgba(255, 255, 255, 0.65)',
        background: '#001529',
        'item:hover': {
            background: '#1890ff',
            text: 'white'
        },
        'item:active': {
            text: 'white'
        },
        collapse: {
            border: '#163255'
        }
    }
};
