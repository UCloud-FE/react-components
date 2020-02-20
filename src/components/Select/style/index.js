import styled, { css } from 'styled-components';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';
import Menu from 'src/components/Menu';
import { inlineBlockWithVerticalMixin } from 'src/style';

export const SelectSearchInput = styled(Input.Search)`
    min-width: 100px;
    display: block;
    margin: 0 8px;
    margin-top: 10px;
`;

export const Selector = styled.div`
    cursor: pointer;
    padding: 0 8px;
    padding-right: 28px;
    box-sizing: border-box;
    border: none;
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
    ({ theme: { designTokens: DT, colorMap, materialVars } }) => css`
        background: ${colorMap.default.background};
        border: ${DT.T_LINE_WIDTH_BASE} none ${colorMap.default.border};
        box-shadow: ${materialVars.whiteBoxShadowActive};
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
        box-shadow: none;
    `
);

/* stylelint-disable no-duplicate-selectors */
const propsMixin = ({ theme: { designTokens: DT, Height, materialVars }, size, disabled }) => css`
    font-size: ${DT.T_TYPO_FONT_SIZE_1};
    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

    ${Selector} {
        height: ${Height[size]};
        line-height: ${Height[size]};
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
        box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
        border-radius: ${DT.T_CORNER_SM};
        transition: all ${materialVars.transitionUp};

        &:hover {
            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
        }
    }

    ${disabled &&
        css`
            color: ${DT.T_COLOR_TEXT_DISABLED};
            pointer-events: none;

            ${Selector} {
                border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DISABLED_DARK};
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                box-shadow: none;
            }
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
