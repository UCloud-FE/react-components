import styled, { css } from 'styled-components';

import config from 'src/config';
import { inlineBlockWithVerticalMixin } from 'src/style';
import { tint } from 'src/style/color';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-slider';

export const RcSliderWrap = styled.div`
    ${inlineBlockWithVerticalMixin};
    margin-right: 12px;
    padding: 0 10px;
`;

export const SliderWrap = styled.div(
    ({ theme: { colorMap, Height, HeightNumber, colorList }, size, disabled }) => css`
        .${prefixCls} {
            position: relative;
            width: 300px;
            border-radius: 2px;
            touch-action: none;
            background: ${colorMap.default.background};
            height: ${Height[size]};

            ${disabled &&
                css`
                    background: ${colorMap.disabled.background};
                `};

            &-rail {
                box-sizing: border-box;
                position: absolute;
                width: 100%;

                background: #e9e9e9;
                border: 1px solid ${colorMap.default.border};
                height: ${Height[size]};
                border-left: 0;
                border-right: 0;

                ${disabled &&
                    css`
                        background: ${colorMap.disabled.background};
                        ::before,
                        ::after {
                            background: ${colorMap.disabled.background};
                        }
                    `};

                ::before,
                ::after {
                    content: '';
                    display: inline-block;
                    width: 10px;
                    height: 100%;
                    position: absolute;
                    border: 1px solid ${colorMap.default.border};
                    top: -1px;
                    background: #e9e9e9;
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
                border: 1px solid ${colorMap.active.border};
                background: ${colorList.primary5};
                height: ${Height[size]};
                border-left: 0;
                border-right: 0;
                ::before {
                    content: '';
                    display: inline-block;
                    width: 10px;
                    height: 100%;
                    position: absolute;
                    border: 1px solid ${colorMap.active.border};
                    top: -1px;
                    background: ${colorList.primary5};
                    left: -10px;
                    border-radius: 2px 0 0 2px;
                    border-right: 0;
                }
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
                border: 1px solid #c3cad9;
                background: ${colorMap.default.background};
                touch-action: pan-x;
                z-index: 9;
                height: ${HeightNumber[size] + 6}px;
                line-height: ${HeightNumber[size] + 8}px;

                ${disabled &&
                    css`
                        box-shadow: none;
                        border-color: ${colorMap.disabled.border};
                        cursor: not-allowed;
                    `};

                &::before,
                &::after {
                    content: '';
                    display: inline-block;
                    width: 1px;
                    height: 16px;
                    background: #dbdcdf;
                    margin-top: ${(HeightNumber[size] + 6 - 2 - 16) / 2}px;
                }
                &::after {
                    margin-left: 4px;
                }

                &:hover {
                    border-color: ${tint(colorMap.active.border, 0.2)};
                }
                &:active {
                    border-color: ${tint(colorMap.active.border, 0.2)};
                    box-shadow: 0 0 5px ${tint(colorMap.active.border, 0.2)};
                    cursor: grabbing;
                }
                &:focus {
                    border-color: ${tint(colorMap.active.border, 0.2)};
                    box-shadow: 0 0 5px ${tint(colorMap.active.border, 0.5)};
                    outline: none;
                }
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
                cursor: pointer;
                color: ${colorMap.default.text};
                border-right: 1px solid ${colorMap.default.border};
                padding: 0 8px;
                box-sizing: border-box;
                pointer-events: none;
                line-height: ${Height[size]};

                ${disabled &&
                    css`
                        cursor: not-allowed;
                        border-right-color: ${colorMap.disabled.border};
                    `};

                &-active {
                    color: ${colorMap.active.text};
                    border-right-color: ${colorMap.active.border};
                }
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
