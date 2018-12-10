import styled, { css } from 'styled-components';

import { clearFixMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

export const Outer = styled.div`
    height: 8px;
`;
export const Inner = styled.div(
    ({ theme: { colorMap } }) => css`
        width: 100%;
        height: 100%;
        border: 1px solid ${colorMap.default.border};
        border-radius: 6px;
        background: ${colorMap.default.background};
    `
);
export const Bg = styled.div(
    ({ theme: { colorList } }) => css`
        background: ${colorList.primary2};
        height: 100%;
        border-radius: 6px;
        transition: width 0.5s;
        position: relative;

        ${({ percent }) => css`
            width: ${percent}%;
        `};
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

addDefaultThemeProps(Inner, Bg);
