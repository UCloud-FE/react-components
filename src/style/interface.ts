import { defaultDesignTokens } from 'src/components/ThemeProvider/theme';

export type DesignTokens = typeof defaultDesignTokens;
export type DesignToken = keyof DesignTokens;
export interface Theme {
    designTokens: DesignTokens;
    [key: string]: unknown;
}
