const colors = {
    blue: '#3555f6',
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
    white: '#fff',
    black: '#0a1633'
};

export const TColorList = {
    brand: {
        white: '#ffffff',
        black: '#0a1633',
        transparent: 'transparent',
        primary1: '#f8f8ff',
        primary2: '#eaeefd',
        primary3: '#e3e9ff',
        primary6: '#6488fc',
        primary7: '#5c76e8',
        primary8: '#3860f4',
        primary9: '#3357df',
        secondary1: '#fafafc',
        secondary2: '#f6f6fb',
        secondary3: '#efeff8',
        secondary4: '#dfe0f1',
        secondary5: '#d2d6ea',
        secondary7: '#c3cad9',
        secondary8: '#7a8baa',
        secondary9: '#526075',
        notice1: '#fafafc',
        notice2: '#d2d6ea',
        notice3: '#526075',
        success1: '#edfff2',
        success2: '#9effa5',
        success3: '#4cd964',
        warning1: '#fffce5',
        warning2: '#fff28f',
        warning3: '#f9ce1d',
        error1: '#fff0f0',
        error2: '#fed4d4',
        error3: '#f44336',
        disabled1: '#f7f7f7',
        disabled2: '#d9d9d9',
        disabled3: '#cccccc',
        sidebar: '#e7e9f3',
        purple1: '#f7f1fd',
        purple2: '#dec6f9',
        purple3: '#cdaaf5',
        purple4: '#bd8df2',
        purple5: '#ac71ef',
        purple6: '#9b66d7',
        purple7: '#784fa7',
        purple8: '#452d60',
        purple9: '#221730',
        lightblue1: '#eafaff',
        lightblue2: '#abebff',
        lightblue3: '#82e2ff',
        lightblue4: '#58d8ff',
        lightblue5: '#2eceff',
        lightblue6: '#29b9e6',
        lightblue7: '#2090b3',
        lightblue8: '#125266',
        lightblue9: '#092933',
        blue1: '#edf5fe',
        blue2: '#b6d9fb',
        blue3: '#92c5f9',
        blue4: '#6db2f7',
        blue5: '#499ff5',
        blue6: '#428fdd',
        blue7: '#336fac',
        blue8: '#1d4062',
        blue9: '#0f2031',
        orange1: '#fff4f0',
        orange2: '#fed4c3',
        orange3: '#fdbfa6',
        orange4: '#fda988',
        orange5: '#fc946a',
        orange6: '#e3855f',
        orange7: '#b0684a',
        orange8: '#653b2a',
        orange9: '#321e15',
        yellow1: '#fffcea',
        yellow2: '#fff3a9',
        yellow3: '#ffee7f',
        yellow4: '#ffe854',
        yellow5: '#ffe229',
        yellow6: '#e6cb25',
        yellow7: '#b39e1d',
        yellow8: '#665a10',
        yellow9: '#332d08',
        cyan1: '#e7fefa',
        cyan2: '#9dfbeb',
        cyan3: '#6cf9e2',
        cyan4: '#3bf7d8',
        cyan5: '#0af5ce',
        cyan6: '#09ddb9',
        cyan7: '#07ac90',
        cyan8: '#046252',
        cyan9: '#023129'
    }
};

export const TColorMap = {
    text: {
        default: TColorList.brand.secondary9,
        light: TColorList.brand.secondary9,
        dark: TColorList.brand.black,
        white: TColorList.brand.white,
        primary: TColorList.brand.primary8,
        primaryHover: TColorList.brand.primary9,
        remark: TColorList.brand.secondary8,
        disabled: TColorList.brand.disabled3,
        success: TColorList.brand.success3,
        warning: TColorList.brand.warning3,
        error: TColorList.brand.error3
    },
    bg: {
        disabled: TColorList.brand.disabled1,
        success: TColorList.brand.success1,
        warning: TColorList.brand.warning1,
        error: TColorList.brand.error1
    },
    bgLight: {
        disabled: TColorList.brand.disabled1,
        success: TColorList.brand.success1,
        warning: TColorList.brand.warning1,
        error: TColorList.brand.error1
    },
    bgDark: {
        disabled: TColorList.brand.disabled3,
        success: TColorList.brand.success3,
        warning: TColorList.brand.warning3,
        error: TColorList.brand.error3,
        default: TColorList.brand.secondary2
    },
    border: {
        primary: TColorList.brand.primary8,
        primaryHover: TColorList.brand.primary9,
        disabled: TColorList.brand.disabled2,
        success: TColorList.brand.success2,
        warning: TColorList.brand.warning2,
        error: TColorList.brand.error2
    },
    borderLight: {
        default: TColorList.brand.secondary5
    },
    gradient: {
        primary: `linear-gradient(135deg, ${TColorList.brand.primary6} 0%, ${TColorList.brand.primary8} 100%)`,
        primaryHover: `linear-gradient(135deg, ${TColorList.brand.primary7} 0%, ${TColorList.brand.primary9} 100%)`
    },
    shadowButton: {
        primary: `0 1px 3px -1px ${TColorList.brand.primary7}`,
        primaryHover: `0 5px 8px -4px ${TColorList.brand.primary7}`
    },
    shadowBlock: {
        leftLg: `-18px 0 16px -12px rgba(82,96,117,0.3)`,
        rightLg: `-18px 0 16px -12px rgba(82,96,117,0.3)`,
        topLg: `0 -18px 16px -12px rgba(82,96,117,0.3)`,
        bottomLg: `0 18px 16px -12px rgba(82,96,117,0.3)`
    }
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
    black: colors.black,
    title: colors.black,
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
            border: colorList.primary,
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
