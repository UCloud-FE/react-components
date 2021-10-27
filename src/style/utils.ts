import isPropValid from '@emotion/is-prop-valid';

import { DesignToken, DesignTokens } from './interface';

export const tuple = <T extends string[]>(...args: T) => args;

export const Sizes = tuple('sm', 'md', 'lg');
export type Size = typeof Sizes[number];
const keyMap: Record<Size, DesignToken> = {
    sm: 'T_HEIGHT_SM',
    md: 'T_HEIGHT_MD',
    lg: 'T_HEIGHT_LG'
};
const paddingKeyMap: Record<Size, DesignToken> = {
    sm: 'T_SPACING_COMMON_SM',
    md: 'T_SPACING_COMMON_SM',
    lg: 'T_SPACING_COMMON_MD'
};
const controlHeightMap: Record<Size, DesignToken> = {
    sm: 'T_CONTROL_HEIGHT_SM',
    md: 'T_CONTROL_HEIGHT_MD',
    lg: 'T_CONTROL_HEIGHT_LG'
};
const controlFontSizeMap: Record<Size, DesignToken> = {
    sm: 'T_CONTROL_FONT_SIZE_SM',
    md: 'T_CONTROL_FONT_SIZE_MD',
    lg: 'T_CONTROL_FONT_SIZE_LG'
};
const controlSpacingMap: Record<Size, DesignToken> = {
    sm: 'T_CONTROL_SPACING_SM',
    md: 'T_CONTROL_SPACING_MD',
    lg: 'T_CONTROL_SPACING_LG'
};

export const offsetValue = (value: string, offset: number) => {
    const [, number, unit] = /^(\d+)(\S+)$/.exec(value) || [];
    return +number + +offset + unit;
};

export const getHeightBySize = (DT: DesignTokens, size: Size) => {
    const token = keyMap[size];
    return DT[token];
};

export const offsetHeightBySize = (DT: DesignTokens, size: Size, offset: number) => {
    const sizeValue = getHeightBySize(DT, size);
    return offsetValue(sizeValue, offset);
};

export const getPaddingBySize = (DT: DesignTokens, size: Size) => {
    const token = paddingKeyMap[size];
    return DT[token];
};

export const offsetPaddingBySize = (DT: DesignTokens, size: Size, offset: number) => {
    const sizeValue = getPaddingBySize(DT, size);
    return offsetValue(sizeValue, offset);
};

export const ignoreProps = (...props: string[]) => {
    return (prop: string) => {
        return isPropValid(prop) && !props.includes(prop);
    };
};

export const getControlHeightBySize = (DT: DesignTokens, size: Size) => {
    const token = controlHeightMap[size];
    return DT[token];
};

export const getControlFontSizeBySize = (DT: DesignTokens, size: Size) => {
    const token = controlFontSizeMap[size];
    return DT[token];
};

export const getControlSpacingBySize = (DT: DesignTokens, size: Size) => {
    const token = controlSpacingMap[size];
    return DT[token];
};

const getSizeNumber = (size: string) => {
    const [, number = 0, unit = 'px'] = /^(\d+)(.*)$/.exec(size) || [];
    return {
        number,
        unit
    };
};

const cacheMap: { [key: string]: string } = {};

export const execSizeCal = (size: string, formula: string) => {
    const key = `size${size}-formula${formula}`;
    if (key in cacheMap) return cacheMap[key];
    const { number, unit } = getSizeNumber(size);
    const exec = new Function('number', `return number${formula}`);
    const result = exec(number) + unit;
    return (cacheMap[key] = result);
};
