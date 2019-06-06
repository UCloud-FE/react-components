import styled, { css } from 'styled-components';

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
const propsMixin = ({ theme: { colorMap, Height, Switch: switchTheme }, disabled, size, checked }) => {
    const { Width, Padding, BtnSize, LineLeft, LineHeight, BorderWidth } = switchTheme;
    return css`
        background: ${colorMap.default.background};

        &:hover {
            border-color: ${colorMap.active.border};
        }

        height: ${Height[size]};
        width: ${Width[size]};
        padding: ${Padding[size]};
        border: 1px solid ${colorMap.default.border};
        border-width: ${BorderWidth[size]};

        ${ButtonWrap} {
            background-color: ${colorMap.default.background};
            box-shadow: 0 0.5px 0.5px ${colorMap.default.border};
            border: 1px solid ${colorMap.default.border};

            width: ${BtnSize[size]};
            height: ${BtnSize[size]};
        }

        ${Line} {
            background-color: ${switchTheme.Line.background};
            left: ${LineLeft[size]};
            height: ${LineHeight[size]};
        }

        ${Inner} {
            border: 1px solid ${switchTheme['Inner'].border};
            background-color: ${switchTheme['Inner'].background};
            color: ${switchTheme['Inner'].text};
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
                      border-color: ${switchTheme['Inner:checked'].border};
                      background-color: ${switchTheme['Inner:checked'].background};
                      color: ${switchTheme['Inner:checked'].text};
                  }

                  ${/* sc-sel */ ButtonWrap} {
                      left: 100%;
                      margin-left: -${calculateSize(BtnSize[size], -1)};
                  }

                  ${Line} {
                      background: ${switchTheme['Line:checked'].background};
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
                border-color: ${colorMap.disabled.border};
                cursor: not-allowed;

                ${Inner} {
                    border-color: ${switchTheme['Inner:disabled'].border};
                    background-color: ${switchTheme['Inner:disabled'].background};
                }

                ${Line} {
                    background-color: ${switchTheme['Line:disabled'].background};
                }
            `};
    `;
};

export const SwitchWrap = styled.div`
    position: relative;
    border-radius: 2px;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s;

    ${inlineBlockWithVerticalMixin};
    ${propsMixin};
`;

addDefaultThemeProps(SwitchWrap);
