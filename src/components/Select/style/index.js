import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Input from 'src/components/Input';
import Icon from 'src/components/Icon';
import Menu from 'src/components/Menu';
import Button from 'src/components/Button';
import { inlineBlockWithVerticalMixin } from 'src/style';
import withProps from 'src/utils/withProps';

export const SelectSearchInput = styled(Input.Search)`
    min-width: 100px;
    display: block;
    margin: 0 8px;
    margin-top: 10px;
`;

export const Selector = styled(Button)`
    padding-right: 28px;
    width: 100%;
    text-align: left;
`;

export const Arrow = styled(Icon)`
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -6px;
`;
export const OptionWrap = styled(Menu.Item)(props => {
    const { hidden } = props;

    return css`
        ${hidden &&
        css`
            display: none;
        `};
    `;
});
export const ExtraWrap = styled('div')`
    margin: 0 8px;
`;
export const MenuWrap = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
            background: ${DT.T_COLOR_BG_MENU};
            border-radius: ${DT.T_CORNER_SM};
            display: inline-block;
            width: 100%;
            /* stylelint-disable selector-type-no-unknown */
            & > ${ExtraWrap}:last-child {
                margin-bottom: 10px;
            }
            /* stylelint-enable selector-type-no-unknown */
        `;
    })
);

// eslint-disable-next-line react/prop-types,no-unused-vars
const CustomMenu = ({ customStyle, ...rest }) => <Menu {...rest} />;

export const BlockMenu = styled(CustomMenu)(props => {
    const { customStyle } = props;

    return css`
        display: block;
        border: none;
        box-shadow: none;
        max-height: ${customStyle.optionListMaxHeight || 380}px;
        max-width: none;
    `;
});

/* stylelint-disable no-duplicate-selectors */
const propsMixin = props => {
    const {
        theme: { designTokens: DT },
        disabled
    } = props;

    return css`
        font-size: ${DT.T_TYPO_FONT_SIZE_1};
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

        ${disabled &&
        css`
            color: ${DT.T_COLOR_TEXT_DISABLED};
            pointer-events: none;
        `};
    `;
};
/* stylelint-enable no-duplicate-selectors */

export const SelectWrap = withProps()(styled('div')`
    box-sizing: border-box;
    position: relative;

    ${inlineBlockWithVerticalMixin};
    ${propsMixin};
`);

export const EmptyContentWrapper = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            text-align: center;
            color: ${DT.T_COLOR_TEXT_REMARK_DARK};
        `;
    })
);
