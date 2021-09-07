import React, { Ref, FC, useMemo, forwardRef, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { StyledComponent } from '@emotion/styled';
import { useTheme } from 'emotion-theming';

import defaultTheme from 'src/components/ThemeProvider/theme';

import { Theme } from './interface';

type Input<Props extends { className?: string }> = Omit<Partial<Props>, 'className'> & {
    className?: string | ((props: Props) => string);
};

/**
 * 包裹组件，注入默认主题，添加默认的 props
 * @param input {object} 需要注入组件的 props
 */
const sWrap = <Props, IHTMLElement = HTMLElement>(
    input: Input<Props>,
    options?: {
        ignoreProps?: (keyof Props)[];
    }
) => {
    type TagAttributes = HTMLAttributes<IHTMLElement>;
    type PropsWithTag = Props & TagAttributes;
    type PropsFinal = PropsWithTag & { theme?: Theme };
    return (Comp: StyledComponent<Props, PropsWithTag, Theme>) => {
        const WithThemeComponent = (props: PropsFinal, ref: Ref<IHTMLElement>) => {
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

            const result: PropsFinal = {
                ...rest,
                ...props,
                ...(memoClassName ? { className: memoClassName } : {}),
                theme: memoTheme
            };
            if (options?.ignoreProps) {
                options?.ignoreProps.forEach(prop => {
                    delete result[prop];
                });
            }

            const Com = (Comp as unknown) as FC;
            return <Com {...result} ref={ref} />;
        };
        return forwardRef(WithThemeComponent);
    };
};

export default sWrap;
