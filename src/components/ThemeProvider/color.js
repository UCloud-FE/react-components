const colors = {
    blue: '#4074e1',
    blue1: '#3664c8',
    blue2: '#4683e6',
    blue3: '#eaf3fd',
    blue4: '#f2f6fc',
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
    gray3: '#bbb',
    white: '#fff'
};

// semantic colors
export const defaultColorList = {
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
    title: '#0a1633',
    subtitle: colors.blueGray4,
    placeholder: colors.blueGray3,
    link: colors.blue
};

export const generateColorTheme = colorList => {
    colorList = { ...defaultColorList, ...colorList };
    // map of status and color
    const colorMap = {
        default: {
            text: colorList.secondary1,
            background: colorList.white,
            border: colorList.secondary4,
            icon: colorList.secondary
        },
        disabled: {
            text: colorList.disabled3,
            background: colorList.disabled2,
            border: colorList.disabled1,
            icon: colorList.disabled1
        },
        active: {
            text: colorList.primary,
            background: colorList.primary3,
            border: colorList.primary2,
            icon: colorList.primary
        },
        info: {
            background: colorList.primary6,
            border: colorList.secondary4,
            icon: colorList.secondary1
        },
        success: {
            background: colorList.success2,
            border: colorList.success3,
            icon: colorList.success1
        },
        warning: {
            background: colorList.warning2,
            border: colorList.warning3,
            icon: colorList.warning1
        },
        error: {
            background: colorList.error2,
            border: colorList.error3,
            icon: colorList.error1
        }
    };
    return {
        colorList,
        colorMap
    };
};
