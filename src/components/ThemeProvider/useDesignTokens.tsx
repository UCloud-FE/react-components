import { useTheme } from 'emotion-theming';

import { defaultTheme, Theme } from 'src/style';

const useDesignTokens = () => {
    const theme = useTheme<Theme>();
    if (!Object.keys(theme).length) return defaultTheme.designTokens;
    return theme.designTokens;
};

export default useDesignTokens;
