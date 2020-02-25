import styled, { css } from 'styled-components';
import _ from 'lodash';

import { inlineBlockWithVerticalMixin, calculateSize } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

export const Inner = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 2px;
    box-sizing: border-box;
`;

export const Text = styled.span`
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 22px;
    box-sizing: border-box;
    display: block;
`;

export const OnText = styled(Text)`
    /* empty */
`;
export const OffText = styled(Text)`
    /* empty */
`;

export const ButtonWrap = styled.span`
    position: absolute;
    display: inline-block;
    left: -1px;
    top: -2px;
    border-radius: 2px;
    box-sizing: border-box;
    transition: all 0.3s;
`;

export const Line = styled.span`
    position: absolute;
    display: inline-block;
    left: 18px;
    top: 4px;
    width: 2px;
    height: 16px;
    border-radius: 1px;
    transition: all 0.3s;
`;

/* stylelint-disable no-duplicate-selectors */
const propsMixin = ({ theme: { designTokens: DT, Height }, disabled, size, checked }) => {
    const switchTheme = {
        Width: {
            sm: '45px',
            md: '80px',
            lg: '100px'
        },
        Padding: {
            sm: '1px',
            md: '4px',
            lg: '4px'
        },
        BorderWidth: {
            sm: '0',
            md: '1px',
            lg: '1px'
        },
        LineLeft: {
            sm: '13px',
            md: '13px',
            lg: '18px'
        }
    };
    switchTheme.BtnSize = {};
    switchTheme.LineHeight = {};
    _.each(['sm', 'md', 'lg'], size => {
        const height = +Height[size].replace('px', '');
        const padding = +switchTheme.Padding[size].replace('px', '');
        const borderWidth = +switchTheme.BorderWidth[size].replace('px', '');
        const btnSize = height - padding * 2 - borderWidth * 2 + 2;
        const lineHeight = btnSize - 10;
        switchTheme.BtnSize[size] = btnSize + 'px';
        switchTheme.LineHeight[size] = lineHeight + 'px';
    });
    const { Width, Padding, BtnSize, LineLeft, LineHeight, BorderWidth } = switchTheme;

    return css`
        background: ${DT.T_SWITCH_COLOR_BG_OUTER};

        height: ${Height[size]};
        width: ${Width[size]};
        padding: ${Padding[size]};
        border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
        border-width: ${BorderWidth[size]};

        ${!disabled &&
            css`
                :hover {
                    border-color: ${DT.T_COLOR_LINE_PRIMARY_HOVER};
                    ${ButtonWrap} {
                        box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
                    }
                }
            `} ${ButtonWrap} {
            background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
            box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};

            width: ${BtnSize[size]};
            height: ${BtnSize[size]};
        }

        ${Line} {
            background: ${DT.T_COLOR_BG_ERROR_DARK};
            left: ${LineLeft[size]};
            height: ${LineHeight[size]};
        }

        ${Inner} {
            color: ${DT.T_SWITCH_COLOR_TEXT_OFF};
            border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            box-shadow: ${DT.T_SHADOW_INSET_1};
            background: ${DT.T_SWITCH_COLOR_BG_INNER_OFF};
        }

        ${size === 'sm' &&
            css`
                ${/*sc-sel*/ OnText}, ${/*sc-sel*/ OffText} {
                    display: none;
                }
            `};
        ${size === 'md' &&
            css`
                line-height: 16px;

                ${/*sc-sel*/ OnText}, ${/*sc-sel */ OffText} {
                    line-height: 16px;
                }
                ${OnText} {
                    padding-right: 20px;
                }
                ${OffText} {
                    padding-left: 20px;
                }
            `};
        ${size === 'lg' &&
            css`
                line-height: 22px;

                ${OnText} {
                    padding-right: 26px;
                }
                ${OffText} {
                    padding-left: 26px;
                }
            `};

        ${checked
            ? css`
                  ${/* sc-sel */ Inner} {
                      color: ${DT.T_SWITCH_COLOR_TEXT_ON};
                      border-color: ${DT.T_COLOR_LINE_SUCCESS_LIGHT};
                      box-shadow: ${DT.T_SHADOW_INSET_1};
                      background: ${DT.T_SWITCH_COLOR_BG_INNER_ON};
                  }

                  ${/* sc-sel */ ButtonWrap} {
                      left: 100%;
                      margin-left: -${calculateSize(BtnSize[size], -1)};
                  }

                  ${Line} {
                      background: ${DT.T_COLOR_BG_SUCCESS_DARK};
                  }

                  ${OffText} {
                      display: none;
                  }
              `
            : css`
                  ${OnText} {
                      display: none;
                  }
              `};

        ${disabled &&
            css`
                border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                cursor: not-allowed;

                ${Inner} {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                    box-shadow: none;
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                }

                ${Line} {
                    background: ${DT.T_COLOR_BG_DISABLED_DARK};
                }
            `};
    `;
};

export const SwitchWrap = styled.div`
    position: relative;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s;

    ${inlineBlockWithVerticalMixin};
    ${propsMixin};
`;

addDefaultThemeProps(SwitchWrap);
