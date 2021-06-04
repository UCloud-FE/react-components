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

export const ExportComponent = <T, T1 extends Record<string, unknown>>(
    Component: T,
    ComponentExtends: T1
): Override<T, T1> => {
    type TExportComponent = Override<T, T1>;
    const ExportComponent = Component as TExportComponent;
    for (const ExtendKey in ComponentExtends) {
        ExportComponent[ExtendKey] = ComponentExtends[ExtendKey] as Override<T, T1>[Extract<keyof T1, string>];
    }
    return ExportComponent;
};
