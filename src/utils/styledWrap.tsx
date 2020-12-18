import React, { DetailedHTMLProps, HTMLAttributes, Ref } from 'react';
import classnames from 'classnames';
import { StyledComponent } from '@emotion/styled';
import { withTheme } from 'emotion-theming';

import defaultTheme from 'src/components/ThemeProvider/theme';

type Input<Props extends { className?: string }> = Omit<Partial<Props>, 'className'> & {
    className?: string | ((props: Props) => string);
};

export interface Theme {
    designTokens: {
        [key: string]: string | number;
    };
    [key: string]: unknown;
}

const styledWrap = <Props, HTMLElement = HTMLDivElement>(input: Input<Props>) => {
    type MergedPropsWithTheme = Props & HTMLAttributes<HTMLElement> & { theme?: Theme };
    return (
        Comp: StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, MergedPropsWithTheme, Theme>
    ) => {
        const WithPropsComponent = (props: MergedPropsWithTheme, ref: Ref<HTMLElement>) => {
            let { className, ...rest } = input;
            if (className) {
                className = typeof className === 'function' ? className(props) : className;
            }
            const result: MergedPropsWithTheme = {
                ...rest,
                ...props,
                ...(props.className ? { className: classnames(className, props.className) } : {})
            };
            if (!result.theme || !Object.keys(result.theme)?.length) {
                result.theme = defaultTheme;
            }
            const Com = (Comp as unknown) as React.FC;
            return <Com {...result} ref={ref} />;
        };
        return withTheme(React.forwardRef(WithPropsComponent));
    };
};
export default styledWrap;
