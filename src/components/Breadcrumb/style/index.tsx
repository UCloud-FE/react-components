import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import { inlineBlockWithVerticalMixin, sWrap, Theme } from 'src/style';
import Button from 'src/components/Button';
import SvgIcon from 'src/components/SvgIcon';
import { ButtonProps } from 'src/components/Button/Button';

import { ItemProps } from '../Item';
import { BreadcrumbProps } from '../Breadcrumb';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-breadcrumb';
export const itemCls = prefixCls + '-item';
export const backBtnCls = prefixCls + '-back-btn';

const textStyleMixin = css`
    font-size: 14px;
    margin-right: 6px;
    ${inlineBlockWithVerticalMixin};
`;

export const BackButtonWrap = sWrap<ButtonProps, HTMLButtonElement>({
    icon: <SvgIcon type="arrow-left" />,
    size: 'sm',
    styleType: 'border-gray',
    className: backBtnCls
})(styled(Button)`
    margin-right: 16px;
    padding: 0 5px;
`);

const itemStyle = (props: { theme: Theme } & ItemProps) => {
    const {
        theme: { designTokens: DT },
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
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT} !important;
            cursor: default;
        `};

        ${current &&
        css`
            pointer-events: none;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK} !important;
            font-weight: bold;
        `};

        ${disabled &&
        css`
            pointer-events: none;
            color: ${DT.T_COLOR_TEXT_DISABLED} !important;
        `};
    `;
};

export const ItemSpan = sWrap({
    className: itemCls
})(styled.span(itemStyle));

export const ItemA = sWrap({
    className: itemCls
})(
    styled.a(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            ${itemStyle(props)};
            text-decoration: none;
            &,
            &:hover,
            &:visited,
            &:link,
            &:active {
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }
        `;
    })
);

export const SeparatorWrap = styled('span')`
    ${textStyleMixin};
    font-weight: bold;
    cursor: default;
`;

export const BreadcrumbWrap = sWrap<Required<Pick<BreadcrumbProps, 'styleType'>>>({})(
    styled.div(props => {
        const {
            theme: { designTokens: DT },
            styleType
        } = props;

        return css`
            font-size: 12px;
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            vertical-align: baseline;

            ${{
                'block-hover': css`
                    :hover {
                        span.${itemCls} {
                            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                        }
                        a.${itemCls} {
                            &,
                            &:hover,
                            &:visited,
                            &:link,
                            &:active {
                                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                            }
                        }
                    }
                `,
                active: css`
                    span.${itemCls} {
                        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    }
                    a.${itemCls} {
                        &,
                        &:hover,
                        &:visited,
                        &:link,
                        &:active {
                            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                        }
                    }
                `,
                hover: css`
                    span.${itemCls}, a.${itemCls} {
                        :hover {
                            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                        }
                    }
                `
            }[styleType]};
        `;
    })
);
