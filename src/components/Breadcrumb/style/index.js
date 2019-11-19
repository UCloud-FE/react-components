import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import Button from 'src/components/Button';

const textStyleMixin = css`
    font-size: 14px;
    margin-right: 6px;
    ${inlineBlockWithVerticalMixin};
`;

export const BackButtonWrap = styled(Button).attrs({
    icon: 'left',
    size: 'sm',
    styleType: 'border-gray'
})`
    margin-right: 16px;
    padding: 0 5px;
`;

const itemWrapMixin = ({ theme: { colorMap, colorList }, disabled, current, noAction }) => css`
    cursor: pointer;
    text-decoration: none;

    ${textStyleMixin};

    ${noAction &&
        css`
            pointer-events: none;
            color: ${colorMap.default.text} !important;
            cursor: default;
        `};

    ${current &&
        css`
            pointer-events: none;
            color: ${colorList.black} !important;
            font-weight: bold;
        `};

    ${disabled &&
        css`
            pointer-events: none;
            color: ${colorMap.disabled.text} !important;
        `};
`;

export const ItemWrapSpan = styled.span`
    ${itemWrapMixin};
`;

export const ItemWrapA = styled.a(
    ({ theme: { colorMap } }) => css`
        ${itemWrapMixin};

        &,
        &:hover,
        &:visited,
        &:link,
        &:active {
            color: ${colorMap.default.text};
        }
    `
);

export const SeparatorWrap = styled.span`
    ${textStyleMixin};
    font-weight: bold;
    cursor: default;
`;

export const BreadcrumbWrap = styled.div(
    ({ theme: { colorMap, fontSize } }) => css`
        font-size: ${fontSize};
        color: ${colorMap.default.text};
        vertical-align: baseline;

        :hover {
            ${ItemWrapSpan} {
                color: ${colorMap.active.text};
            }
            ${ItemWrapA} {
                &,
                &:hover,
                &:visited,
                &:link,
                &:active {
                    color: ${colorMap.active.text};
                }
            }
        }
    `
);

addDefaultThemeProps(ItemWrapA, ItemWrapSpan, BreadcrumbWrap);
