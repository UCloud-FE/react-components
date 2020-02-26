import styled, { css } from 'styled-components';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';
import Menu from 'src/components/Menu';
import Button from 'src/components/Button';
import { inlineBlockWithVerticalMixin } from 'src/style';

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
export const OptionWrap = styled(Menu.Item)`
    ${({ hidden }) =>
        hidden &&
        css`
            display: none;
        `};
`;
export const MenuWrap = styled.div(
    ({ theme: { designTokens: DT } }) => css`
        box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
        background: ${DT.T_COLOR_BG_MENU};
        border-radius: ${DT.T_CORNER_SM};
        display: inline-block;
    `
);

export const BlockMenu = styled(Menu)(
    () => css`
        display: block;
        border: none;
        max-height: 380px;
        max-width: unset;
    `
);

/* stylelint-disable no-duplicate-selectors */
const propsMixin = ({ theme: { designTokens: DT }, disabled }) => css`
    font-size: ${DT.T_TYPO_FONT_SIZE_1};
    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

    ${disabled &&
        css`
            color: ${DT.T_COLOR_TEXT_DISABLED};
            pointer-events: none;
        `};
`;
/* stylelint-enable no-duplicate-selectors */

export const SelectWrap = styled.div`
    box-sizing: border-box;
    position: relative;

    ${inlineBlockWithVerticalMixin};
    ${propsMixin};
`;

addDefaultThemeProps(SelectWrap, MenuWrap);
