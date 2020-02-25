import styled, { css } from 'styled-components';

import config from 'src/config';
import { inlineBlockWithVerticalMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-slider';

export const RcSliderWrap = styled.div`
    ${inlineBlockWithVerticalMixin};
    margin-right: 12px;
    padding: 0 10px;
`;

export const SliderWrap = styled.div(
    ({ theme: { designTokens: DT, Height, HeightNumber }, size, disabled }) => css`
        .${prefixCls} {
            position: relative;
            width: 300px;
            border-radius: ${DT.T_CORNER_SM};
            touch-action: none;
            height: ${Height[size]};

            &-rail {
                box-sizing: border-box;
                position: absolute;
                width: 100%;

                background: ${DT.T_SLIDER_COLOR_BG_DEFAULT};
                border: 1px solid ${DT.T_SLIDER_COLOR_LINE_DEFAULT};
                height: ${Height[size]};
                border-left: 0;
                border-right: 0;

                ${disabled &&
                    css`
                        border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                        ::before,
                        ::after {
                            border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                        }
                    `};

                ::before,
                ::after {
                    content: '';
                    display: inline-block;
                    width: 10px;
                    height: 100%;
                    position: absolute;
                    border: 1px solid ${DT.T_SLIDER_COLOR_LINE_DEFAULT};
                    top: -1px;
                    background: ${DT.T_SLIDER_COLOR_BG_DEFAULT};
                }
                ::before {
                    left: -10px;
                    border-radius: 2px 0 0 2px;
                    border-right: 0;
                }
                ::after {
                    right: -10px;
                    border-radius: 0 2px 2px 0;
                    border-left: 0;
                }
            }

            &-track {
                box-sizing: border-box;
                position: absolute;
                left: 0;
                border: 1px solid ${DT.T_SLIDER_COLOR_LINE_ACTIVE};
                background: ${DT.T_SLIDER_COLOR_BG_ACTIVE};
                height: ${Height[size]};
                border-left: 0;
                border-right: 0;
                ::before {
                    content: '';
                    display: inline-block;
                    width: 10px;
                    height: 100%;
                    position: absolute;
                    border: 1px solid ${DT.T_SLIDER_COLOR_LINE_ACTIVE};
                    top: -1px;
                    background: ${DT.T_SLIDER_COLOR_BG_ACTIVE};
                    left: -10px;
                    border-radius: 2px 0 0 2px;
                    border-right: 0;
                }

                ${disabled &&
                    css`
                        border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                        ::before {
                            border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                        }
                    `};
            }

            &-tooltip {
                line-height: normal;
                user-select: none;
            }

            &-handle {
                box-sizing: border-box;
                position: absolute;
                margin-left: -10px;
                margin-top: -3px;
                width: 20px;
                cursor: pointer;
                cursor: grab;
                text-align: center;
                box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
                background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
                touch-action: pan-x;
                z-index: 9;
                height: ${HeightNumber[size] + 6}px;
                line-height: ${HeightNumber[size] + 8}px;

                &::before,
                &::after {
                    content: '';
                    display: inline-block;
                    width: 1px;
                    height: 16px;
                    background: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                    margin-top: ${(HeightNumber[size] + 6 - 2 - 16) / 2}px;
                }
                &::after {
                    margin-left: 4px;
                }

                ${!disabled &&
                    css`
                        &:hover,
                        &:active {
                            box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};

                            &::before,
                            &::after {
                                background: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                            }
                        }
                        &:active {
                            cursor: grabbing;
                        }
                    `} &:focus {
                    outline: none;
                }

                ${disabled &&
                    css`
                        box-shadow: none;
                        border: 1px solid ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                        cursor: not-allowed;

                        &::before,
                        &::after {
                            background: ${DT.T_COLOR_TEXT_DISABLED};
                        }
                    `};
            }

            &-mark {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                font-size: 12px;
            }

            &-mark-text {
                position: absolute;
                display: inline-block;
                vertical-align: middle;
                text-align: right;
                width: 30%;
                margin-left: -30%;
                overflow: hidden;
                cursor: pointer;
                color: ${DT.T_SLIDER_COLOR_TEXT_DEFAULT};
                border-right: 1px solid ${DT.T_SLIDER_COLOR_LINE_DEFAULT};
                padding: 0 8px;
                box-sizing: border-box;
                pointer-events: none;
                line-height: ${Height[size]};

                ${disabled &&
                    css`
                        cursor: not-allowed;
                        color: ${DT.T_COLOR_TEXT_DISABLED};
                        border-right-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                    `};

                ${!disabled &&
                    css`
                        &-active {
                            color: ${DT.T_SLIDER_COLOR_TEXT_ACTIVE};
                            border-right-color: ${DT.T_SLIDER_COLOR_LINE_ACTIVE};
                        }
                    `};
            }

            &-step {
                position: absolute;
                width: 100%;
                background: transparent;
                height: ${Height[size]};
            }

            &-dot {
                display: none;
            }
        }
    `
);
addDefaultThemeProps(SliderWrap);
