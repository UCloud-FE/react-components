import React, { DetailedHTMLProps, HTMLAttributes, Ref, FC, useMemo, forwardRef } from 'react';
import classnames from 'classnames';
import { StyledComponent } from '@emotion/styled';
import { useTheme } from 'emotion-theming';

import defaultTheme, { defaultDesignTokens } from 'src/components/ThemeProvider/theme';

type Input<Props extends { className?: string }> = Omit<Partial<Props>, 'className'> & {
    className?: string | ((props: Props) => string);
};

export type DesignTokens = typeof defaultDesignTokens;
export type DesignToken = keyof DesignTokens;
export interface Theme {
    designTokens: DesignTokens;
    [key: string]: unknown;
}

/**
 * 包裹组件，注入默认主题，添加默认的 props
 * @param input {object} 需要注入组件的 props
 */
const styledWrap = <Props, HTMLElement = HTMLDivElement>(input: Input<Props>) => {
    type MergedPropsWithTheme = Props & HTMLAttributes<HTMLElement> & { theme?: Theme };
    type fullProps = Props & HTMLAttributes<HTMLElement>;
    return (
        Comp: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, MergedPropsWithTheme, Theme>
    ) => {
        const WithThemeComponent = (props: fullProps, ref?: Ref<HTMLElement>) => {
            const { className, ...rest } = input;

            const memoClassName = useMemo(() => {
                let cn;
                if (className) {
                    cn = typeof className === 'function' ? className(props) : className;
                }
                if (props.className) {
                    cn = classnames(cn, props.className);
                }
                return cn;
            }, [className, props]);

            const theme = useTheme<Theme>();
            const memoTheme = useMemo(() => (!theme || !Object.keys(theme)?.length ? defaultTheme : theme), [theme]);

            const result: MergedPropsWithTheme = {
                ...rest,
                ...props,
                ...(memoClassName ? { className: memoClassName } : {}),
                theme: memoTheme
            };

            const Com = (Comp as unknown) as FC;
            return <Com {...result} ref={ref} />;
        };
        return forwardRef(WithThemeComponent);
    };
};

export default styledWrap;
