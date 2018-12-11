import _ from 'lodash';

import Tabs from 'src/components/Tabs/style/theme';
import Button from 'src/components/Button/style/theme';
import Menu from 'src/components/Menu/style/theme';
import Switch from 'src/components/Switch/style/theme';
import Tooltip from 'src/components/Tooltip/style/theme';

import { generateColorTheme, defaultColorList } from './color';

const sizeTheme = {
    // default font-size
    fontSize: '12px',
    // font-size of title
    titleFontSize: '14px',
    // height of size (px)
    Height: {
        sm: '22px',
        md: '28px',
        lg: '34px'
    },
    // padding of size (px)
    Padding: {
        sm: '8px',
        md: '8px',
        lg: '12px'
    }
};

sizeTheme.HeightNumber = _.mapValues(sizeTheme.Height, v => +v.replace('px', ''));

const componentThemeGeneratorMap = {
    Button,
    Tabs,
    Menu,
    Switch,
    Tooltip
};

const extend = (source, target) => {
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
    const { colorList, colorMap } = generateColorTheme(originTheme.colorList);

    let theme = {
        colorList,
        colorMap,
        ...sizeTheme
    };
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
