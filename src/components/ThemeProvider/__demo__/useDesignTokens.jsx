import React from 'react';

import ThemeProvider from 'src/components/ThemeProvider';

// demo start
const { useDesignTokens } = ThemeProvider;
const ShowToken = () => {
    const DT = useDesignTokens();
    return (
        <div>
            <div
                style={{
                    background: DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT,
                    color: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
                    padding: DT.T_CONTROL_SPACING_MD
                }}
            >
                <div>T_BUTTON_PRIMARY_COLOR_BG_DEFAULT: {DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT}</div>
                <div>T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT: {DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT}</div>
            </div>
        </div>
    );
};
const Demo = () => {
    return (
        <>
            <ShowToken />
            <ThemeProvider
                theme={{
                    designTokens: {
                        T_BUTTON_PRIMARY_COLOR_BG_DEFAULT: 'black',
                        T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT: 'white'
                    }
                }}
            >
                <ShowToken />
            </ThemeProvider>
        </>
    );
};
// demo end

export default Demo;
