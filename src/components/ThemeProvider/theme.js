import _ from 'lodash';

import { generateColorTheme, defaultColorList, TColorList, TColorMap } from './color';

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

const defaultMaterialVars = {
    primaryBoxShadow:
        '0 1px 5px 0 rgba(21,56,195,.12), 0 2px 2px 0 rgba(8, 155, 140, 0.24), 0 3px 1px -3px rgba(58, 96, 245,.34)',
    primaryBoxShadowActive:
        '0 1px 10px 0 rgba(21,56,195,.12), 0 2px 4px -1px rgba(21,56,195,.2), 0 4px 5px 0 rgba(21,56,195,.14)',
    whiteBoxShadow:
        '0 -1px 0 0 rgba(223, 224, 241, 0.5), 0 1px 0 0 rgba(223,224,241,.3), 0 1px 1px 0 rgba(162,166,191,.5), 0 2px 4px 0 rgba(228,229,242,.6)',
    whiteBoxShadowActive:
        '0 1px 10px 0 rgba(162,166,191,.12), 0 2px 4px -1px rgba(162,166,191,.2), 0 4px 5px 0 rgba(162,166,191,.14)',
    innerShadow: 'inset 0 1px 3px 0 #dedeef, inset 0 0px 2px 0 #f6f6fb',
    primaryLinearGradient: 'linear-gradient(135deg,#5c8af7,#385ef5)',
    primaryLinearGradientActive: 'linear-gradient(135deg,#5e95fb,#3a72f9)',
    transitionUp: '.22s cubic-bezier(.4,0,.2,1)',
    transitionDown: '.18s cubic-bezier(.4,0,.2,1)',
    transitionFlat: '.16s cubic-bezier(.4,0,.2,1)'
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
    const materialVars = {
        ...defaultMaterialVars,
        ...originTheme.materialVars
    };

    let theme = {
        colorList,
        colorMap,
        TColorList,
        TColorMap,
        ...defaultSizeTheme,
        ...sizeTheme,
        materialVars,
        designTokens: {
            ...designTokens,
            ...originDesignTokens
        }
    };
    theme.HeightNumber = _.mapValues(theme.Height, v => +v.replace('px', ''));
    theme.PaddingNumber = _.mapValues(theme.Padding, v => +v.replace('px', ''));

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
