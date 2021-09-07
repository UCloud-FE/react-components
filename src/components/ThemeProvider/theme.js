import _ from 'lodash';

import { generateColorTheme, defaultColorList } from './color';

import { designTokens } from './designTokens';

const defaultSizeTheme = {
    // default font-size
    fontSize: '12px',
    // font-size of title
    titleFontSize: '14px',
    // height of size (px)
    Height: {
        sm: '24px',
        md: '28px',
        lg: '32px'
    },
    // padding of size (px)
    Padding: {
        sm: '8px',
        md: '8px',
        lg: '12px'
    }
};

const componentThemeGeneratorMap = {};

export const extend = (source, target) => {
    const cloneSource = JSON.parse(JSON.stringify(source));
    const _extend = (source, target) => {
        _.each(target, (v, k) => {
            if (_.isObject(v) && _.isObject(source[k])) {
                source[k] = _extend(source[k], v);
            } else {
                source[k] = v;
            }
        });
        return source;
    };
    return _extend(cloneSource, target);
};

export const generateTheme = (originTheme = {}) => {
    const { designTokens: originDesignTokens } = originTheme;
    const { colorList, colorMap } = generateColorTheme(originTheme.colorList);
    const sizeTheme = _.pick(originTheme, ['fontSize', 'titleFontSize', 'Height', 'Padding']);

    let theme = {
        colorList,
        colorMap,
        ...defaultSizeTheme,
        ...sizeTheme,
        designTokens: {
            ...designTokens,
            ...originDesignTokens
        }
    };
    theme.HeightNumber = _.mapValues(theme.Height, v => +v.replace('px', ''));

    const componentNames = _.keys(componentThemeGeneratorMap);
    theme = extend(theme, _.omit(originTheme, componentNames));

    const componentTheme = _.mapValues(componentThemeGeneratorMap, componentThemeGenerator => {
        return componentThemeGenerator(theme);
    });

    return extend(
        {
            ...theme,
            ...componentTheme
        },
        _.pick(originTheme, componentNames)
    );
};

const defaultTheme = generateTheme({ colorList: defaultColorList });

export default defaultTheme;
export { defaultTheme };

export { designTokens as defaultDesignTokens };
