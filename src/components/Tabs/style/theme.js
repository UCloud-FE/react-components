import Color from 'color';

export default ({ colorList }) => {
    const theme = {
        'default:active': {
            color: colorList.primary,
            borderColor: colorList.secondary4,
            background: colorList.primary4
        },
        'default:hover': {},
        inkBar: {
            // ink bar bg
            background: colorList.primary
        },
        'ink:active': {
            // ink active text color
            color: colorList.primary
        },
        'ink:hover': {
            // ink active text color
            color: colorList.primary
        }
    };

    theme['default:hover'].background = Color(theme['default:active'].background)
        .alpha(0.2)
        .toString();
    theme['default:hover'].border = Color(theme['default:active'].borderColor)
        .alpha(0.2)
        .toString();
    return theme;
};
