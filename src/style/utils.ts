import isPropValid from '@emotion/is-prop-valid';

import { DesignToken, DesignTokens } from './interface';

export const tuple = <T extends string[]>(...args: T) => args;

const Sizes = tuple('sm', 'md', 'lg');
type Size = typeof Sizes[number];
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
