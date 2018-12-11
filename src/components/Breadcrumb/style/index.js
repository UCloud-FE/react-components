import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const textStyleMixin = css`
    font-size: 14px;
    font-weight: 700;
    margin-right: 5px;
    ${inlineBlockWithVerticalMixin};
`;

export const ItemWrapA = styled.a(
    ({ theme: { colorMap }, disabled, current }) => css`
        cursor: pointer;
        text-decoration: none;

        ${textStyleMixin};
        color: ${colorMap.active.text};

        ${current &&
            css`
                pointer-events: none;
                color: ${colorMap.default.text};
            `};
        ${disabled &&
            css`
                pointer-events: none;
                color: ${colorMap.disabled.text};
            `};
    `
);

export const ItemWrapSpan = ItemWrapA.withComponent('span');

export const SeparatorWrap = styled.span`
    ${textStyleMixin};
`;

export const BreadcrumbWrap = styled.div(
    ({ theme: { colorMap, fontSize } }) => css`
        font-size: ${fontSize};
        color: ${colorMap.default.text};
        vertical-align: baseline;
    `
);

addDefaultThemeProps(ItemWrapA, ItemWrapSpan, BreadcrumbWrap);
