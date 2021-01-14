import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { inlineBlockWithVerticalMixin } from 'src/style';
import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;

export const prefixCls = _prefixCls + '-numberinput';
export const inputWrapCls = prefixCls + '-input-wrap';
export const inputCls = prefixCls + '-input';
export const suffixCls = prefixCls + '-suffix';
export const handlerCls = prefixCls + '-handler';
export const handlerUpCls = handlerCls + '-up';
export const handlerDownCls = handlerCls + '-down';
export const handlerDisabledCls = handlerCls + '-disabled';

export const NumberInputWrap = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT, Height, HeightNumber, materialVars = {} },
            styleType,
            focused,
            size,
            hideHandler,
            disabled
        } = props;

        return css`
            position: relative;
            box-sizing: border-box;
            border-radius: 2px;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            height: ${Height[size]};
            ${inlineBlockWithVerticalMixin};

            .${inputWrapCls} {
                position: relative;
            }
            .${inputCls} {
                border: none;
                outline: none;
                padding: 0;
                margin: 0;
                color: inherit;
            }
            .${suffixCls} {
                color: ${DT.T_COLOR_TEXT_REMARK_DARK};
                margin: 0 4px;
                ${inlineBlockWithVerticalMixin};
            }
            .${handlerUpCls}, .${handlerDownCls} {
                position: absolute;
                box-sizing: border-box;
                text-align: center;
                border-radius: ${DT.T_CORNER_SM};
                border-style: solid;
                cursor: pointer;
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
                background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};

                ${inlineBlockWithVerticalMixin};

                :hover {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
                }

                &.${handlerDisabledCls} {
                    cursor: default;
                    pointer-events: none;
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                }
            }

            ${disabled &&
            css`
                pointer-events: none;
                color: ${DT.T_COLOR_TEXT_DISABLED};
                -webkit-text-fill-color: currentcolor;
            `};

            .${inputCls} {
                line-height: ${HeightNumber[size] - 2}px;
                height: ${HeightNumber[size] - 2}px;

                ${inlineBlockWithVerticalMixin};

                ${disabled &&
                css`
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                `};

                &::placeholder {
                    opacity: 1;
                    color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                }
            }

            ${styleType === 'default' &&
            css`
                border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                padding-right: ${HeightNumber[size] - 6}px;
                border-right-width: 0;
                transition: ${materialVars.transitiondown};

                &:hover {
                    border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                }

                .${inputWrapCls} {
                    box-shadow: ${DT.T_SHADOW_INSET_DEFAULT};
                    background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
                    :hover {
                        background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    }
                }
                ${focused &&
                css`
                    &,
                    &:hover {
                        border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                    }
                    .${inputWrapCls} {
                        background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    }
                `};

                ${disabled &&
                css`
                    border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                    .${inputWrapCls} {
                        box-shadow: none;
                    }
                `};

                .${inputCls} {
                    padding: 0 0 0 8px;
                    text-align: left;
                    box-shadow: none;
                    background: transparent;

                    width: ${HeightNumber[size] + 6}px;
                }

                .${handlerUpCls}, .${handlerDownCls} {
                    right: 0;
                    box-sizing: content-box;
                    border-radius: 0;
                    height: ${(+Height[size].replace('px', '') - 2) / 2}px;
                    line-height: ${(+Height[size].replace('px', '') - 2) / 2}px;
                    width: ${HeightNumber[size] - 6}px;

                    &:hover {
                        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    }
                }

                .${handlerUpCls} {
                    border-width: 0 0 0 1px;
                    top: -1px;
                    padding-top: 1px;
                }
                .${handlerDownCls} {
                    border-width: 1px 0 0 1px;
                    bottom: 0;
                    border-top-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                }

                ${hideHandler &&
                css`
                    padding-right: 0;
                    border-right-width: 1px;
                `};
            `};

            ${styleType === 'split' &&
            css`
                padding: 0 ${Height[size]};
                .${inputCls} {
                    padding: 0 8px;
                    text-align: left;
                    box-shadow: none;
                    background: transparent;

                    width: ${HeightNumber[size] + 6}px;
                }
                .${inputWrapCls} {
                    margin: 0 -1px 0 -1px;
                    border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                    box-shadow: ${DT.T_SHADOW_INSET_DEFAULT};
                    background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
                    transition: ${materialVars.transitionDown};
                    margin: 0;
                    &:hover {
                        border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                        z-index: 1;
                        background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    }
                    ${focused &&
                    css`
                        border-color: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    `};
                    ${disabled &&
                    css`
                        border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                    `};
                }
                .${handlerUpCls}, .${handlerDownCls} {
                    text-align: center;
                    top: 0;
                    height: ${Height[size]};
                    width: ${Height[size]};
                    line-height: ${Height[size]};
                    border-color: transparent;

                    &:hover {
                        color: ${DT.T_SHADOW_BUTTON_HOVER};
                        z-index: 1;
                    }
                }
                .${handlerUpCls} {
                    right: 0;
                }
                .${handlerDownCls} {
                    left: 0;
                }
                ${focused &&
                css`
                    .${inputWrapCls}, .${inputWrapCls}:hover {
                        border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                        background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    }
                `};
                ${disabled &&
                css`
                    box-shadow: none;
                `};
                ${hideHandler &&
                css`
                    padding: 0;
                `};
            `};

            ${styleType === 'pagination' &&
            css`
                padding: 0 ${Height[size]};
                .${inputCls} {
                    text-align: center;
                    margin: 0 4px;
                    width: ${HeightNumber[size] - 2}px;
                    border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                    box-shadow: ${DT.T_SHADOW_INSET_DEFAULT};
                    background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
                    transition: ${materialVars.transitionDown};

                    &:hover {
                        z-index: 1;
                        border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                        background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    }
                    ${focused &&
                    css`
                        &,
                        &:hover {
                            border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                            background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                        }
                    `};
                    ${disabled &&
                    css`
                        border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                        box-shadow: none;
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    `};
                }
                .${handlerUpCls}, .${handlerDownCls} {
                    text-align: center;
                    top: 0;
                    height: ${Height[size]};
                    width: ${Height[size]};
                    line-height: ${Height[size]};
                    border-color: transparent;
                    &:hover {
                        z-index: 1;
                    }
                }
                .${handlerUpCls} {
                    right: 0;
                }
                .${handlerDownCls} {
                    left: 0;
                }
                .${suffixCls} {
                    margin-left: 0;
                }
                ${hideHandler &&
                css`
                    padding: 0;
                    margin: 0;

                    .${inputCls} {
                        margin: 0;
                    }
                    .${suffixCls} {
                        margin-left: 4px;
                        margin-right: 0px;
                    }
                `};
            `};
        `;
    })
);
