// import Color from 'color';

const colors = {
    blue: '#4074e1',
    blue1: '#3664c8',
    blue2: '#4683e6',
    blue3: '#eaf3fd',
    blue4: '#f2f6fd',
    blue5: '#f4f9ff',
    blue6: '#fcfcfd',
    blue7: '#cae3ff',
    blueGray: '#526075',
    blueGray1: '#6b798e',
    blueGray2: '#93a2c4',
    blueGray3: '#abb4c3',
    blueGray4: '#c3cad9',
    blueGray5: '#e1e6f0',
    red1: '#f44336',
    red2: '#fff0f0',
    red3: '#fed4d4',
    yellow1: '#f9ce1d',
    yellow2: '#fffce5',
    yellow3: '#fff28f',
    green1: '#4cd964',
    green2: '#edfff2',
    gray1: '#d9d9d9',
    gray2: '#f7f7f7',
    gray3: '#bbbbbb',
    white: '#ffffff'
};

// ['default', 'success', 'warning', 'error'].forEach(type => {
//     const color = ColorMap[type];
//     const lightness = Color(color).lightness();
//     ColorMap.textColor[type] = color;
//     ColorMap.background[type] = Color(color)
//         .lighten(0.96 / (lightness / 100) - 1)
//         .hex();
//     ColorMap.border[type] = Color(color)
//         .lighten(0.9 / (lightness / 100) - 1)
//         .hex();
// });

const semanticColors = {
    primary: colors.blue,
    primary1: colors.blue1,
    primary2: colors.blue2,
    primary3: colors.blue3,
    primary4: colors.blue4,
    primary5: colors.blue5,
    primary6: colors.blue6,
    primary7: colors.blue7,
    secondary: colors.blueGray,
    secondary1: colors.blueGray1,
    secondary2: colors.blueGray2,
    secondary3: colors.blueGray3,
    secondary4: colors.blueGray4,
    secondary5: colors.blueGray5,
    error1: colors.red1,
    error2: colors.red2,
    error3: colors.red3,
    warning1: colors.yellow1,
    warning2: colors.yellow2,
    warning3: colors.yellow3,
    success1: colors.blue2,
    success2: colors.blue3,
    success3: colors.blue7,
    disabled1: colors.gray1,
    disabled2: colors.gray2,
    disabled3: colors.gray3,
    white: colors.white,
    title: '#0a1633'
};

const colorMap = {
    primary: semanticColors.primary,
    link: semanticColors.blue,

    default: {
        text: semanticColors.secondary,
        background: semanticColors.white,
        border: semanticColors.secondary4,
        icon: semanticColors.secondary
    },
    disabled: {
        text: semanticColors.disabled3,
        background: semanticColors.disabled2,
        border: semanticColors.disabled1,
        icon: semanticColors.disabled1
    },

    info: {
        background: semanticColors.primary6,
        border: semanticColors.secondary4,
        icon: semanticColors.secondary1
    },
    success: {
        background: semanticColors.success2,
        border: semanticColors.success3,
        icon: semanticColors.success1
    },
    warning: {
        background: semanticColors.warning2,
        border: semanticColors.warning3,
        icon: semanticColors.warning1
    },
    error: {
        background: semanticColors.error2,
        border: semanticColors.error3,
        icon: semanticColors.error1
    }
};

const componentTheme = {
    Button: {
        primary: {
            text: semanticColors.white,
            background: semanticColors.primary2,
            border: semanticColors.primary2
        },
        'primary:hover': {
            text: semanticColors.white,
            background: semanticColors.primary1,
            border: semanticColors.primary1
        },
        border: {
            text: semanticColors.secondary,
            background: semanticColors.white,
            border: semanticColors.secondary4
        },
        'border:hover': {
            text: semanticColors.primary2,
            background: semanticColors.white,
            border: semanticColors.primary2
        },
        'border-gray': {
            text: semanticColors.secondary1,
            background: semanticColors.primary4,
            border: semanticColors.secondary4
        },
        'border-gray:hover': {
            text: semanticColors.primary2,
            background: semanticColors.primary4,
            border: semanticColors.primary2
        }
    },
    Tabs: {
        default: {},
        'default:hover': {
            text: semanticColors.primary,
            border: semanticColors.secondary4
        },
        ink: {
            bar: semanticColors.primary
        },
        'ink:hover': {
            text: semanticColors.primary
        }
    },
    Card: {
        border: semanticColors.secondary5
    }
};

export default {
    ...componentTheme,
    colorMap: colorMap,
    colorList: semanticColors,
    fontSize: '12px',
    titleFontSize: '14px',
    Height: {
        sm: '22px',
        md: '28px',
        lg: '34px'
    },
    Padding: {
        sm: '8px',
        md: '8px',
        lg: '12px'
    }
};
