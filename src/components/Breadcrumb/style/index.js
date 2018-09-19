import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin, Color, FontSize } from 'src/style';

const textStyleMixin = css`
    font-size: 14px;
    font-weight: 700;
    margin-right: 5px;
    ${inlineBlockWithVerticalMixin};
`;

export const ItemWrapA = styled.a`
    cursor: pointer;
    text-decoration: none;

    ${textStyleMixin};
    color: ${Color.font.blue};

    ${({ current }) =>
        current &&
        css`
            pointer-events: none;
            color: ${Color.font.default};
        `};
    ${({ disabled }) =>
        disabled &&
        css`
            pointer-events: none;
            color: ${Color.font.disabled};
        `};
`;

export const ItemWrapSpan = ItemWrapA.withComponent('span');

export const SeparatorWrap = styled.span`
    ${textStyleMixin};
`;

export const BreadcrumbWrap = styled.div`
    font-size: ${FontSize.sm};
    color: ${Color.font.default};
    vertical-align: baseline;
`;
