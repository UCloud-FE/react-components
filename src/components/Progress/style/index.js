import styled, { css } from 'styled-components';

import { clearFixMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

export const Outer = styled.div(
    ({ theme: { designTokens: DT } }) => css`
        height: 10px;
        background: ${DT.T_PROGRESS_COLOR_BG_DEFAULT};
        border-radius: 5px;
        position: relative;
    `
);

export const Inner = styled.div(
    ({ theme: { designTokens: DT }, color, percent }) => css`
        width: ${percent}%;
        height: 100%;
        border: none;
        border-radius: 5px;
        transition: width 0.5s;
        position: relative;
        background: ${color
            ? {
                  success: DT.T_COLOR_BG_SUCCESS_DARK,
                  warn: DT.T_COLOR_BG_WARNING_DARK,
                  error: DT.T_COLOR_BG_ERROR_DARK,
                  default: DT.T_COLOR_BG_PRIMARY_1
              }[color] || color
            : DT.T_COLOR_BG_PRIMARY_1};
    `
);

export const CurrentText = styled.span`
    position: absolute;
    right: 0;
    top: -17px;
`;

export const TextWrap = styled.span`
    position: relative;
    height: 18px;
    line-height: 18px;

    ${clearFixMixin};
`;

export const EndText = styled.span`
    float: right;
`;

addDefaultThemeProps(Inner, Outer);
