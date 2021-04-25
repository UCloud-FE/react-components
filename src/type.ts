import { DesignToken } from './style';

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export const tuple = <T extends string[]>(...args: T) => args;

export const Sizes = tuple('sm', 'md', 'lg');
export type Size = typeof Sizes[number];

export const SizeDTMap: Record<Size, DesignToken> = {
    sm: 'T_HEIGHT_SM',
    md: 'T_HEIGHT_MD',
    lg: 'T_HEIGHT_LG'
};
