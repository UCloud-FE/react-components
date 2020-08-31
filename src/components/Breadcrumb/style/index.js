import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { inlineBlockWithVerticalMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import Button from 'src/components/Button';

import withProps from 'src/utils/withProps';

const textStyleMixin = css`
    font-size: 14px;
    margin-right: 6px;
    ${inlineBlockWithVerticalMixin};
`;

export const BackButtonWrap = styled(
    withProps({
        icon: 'left',
        size: 'sm',
        styleType: 'border-gray'
    })(styled(Button)`
        margin-right: 16px;
        padding: 0 5px;
    `)
)`
    /* empty */
`;

const itemWrapMixin = props => {
    const {
        theme: { colorMap, colorList },
        disabled,
        current,
        noAction
    } = props;

    return css`
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
};

export const ItemWrapSpan = styled('span')`
    ${itemWrapMixin};
`;

export const ItemWrapA = styled('a')(props => {
    const {
        theme: { colorMap }
    } = props;

    return css`
        ${itemWrapMixin(props)};

        &,
        &:hover,
        &:visited,
        &:link,
        &:active {
            color: ${colorMap.default.text};
        }
    `;
});

export const SeparatorWrap = styled('span')`
    ${textStyleMixin};
    font-weight: bold;
    cursor: default;
`;
/* stylelint-disable no-descending-specificity */
const styleTypeMixin = props => {
    const {
        styleType,
        theme: { colorMap }
    } = props;

    return {
        'block-hover': css`
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
        `,
        active: css`
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
        `,
        hover: css`
            ${ItemWrapSpan}, ${ItemWrapA} {
                :hover {
                    color: ${colorMap.active.text};
                }
            }
        `
    }[styleType];
};
/* stylelint-enable no-descending-specificity */

export const BreadcrumbWrap = styled('div')(props => {
    const {
        theme: { colorMap, fontSize }
    } = props;

    return css`
        font-size: ${fontSize};
        color: ${colorMap.default.text};
        vertical-align: baseline;

        ${styleTypeMixin(props)};
    `;
});

addDefaultThemeProps(ItemWrapA, ItemWrapSpan, BreadcrumbWrap);
