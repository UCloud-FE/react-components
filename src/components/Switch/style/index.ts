import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import { DesignToken, sWrap } from 'src/style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-switch';
export const dotCls = prefixCls + '-dot';
export const onTipCls = prefixCls + '-tip-on';
export const offTipCls = prefixCls + '-tip-off';
export const innerCls = prefixCls + '-inner';
export const buttonCls = prefixCls + '-button';
export const loadingCls = prefixCls + '-loading';

const switchTheme = {
    Width: {
        sm: '44px',
        md: '73px',
        lg: '87px'
    },
    BorderWidth: {
        sm: 0,
        md: '1px',
        lg: '1px'
    },
    BtnPadding: {
        sm: '0',
        md: '2px',
        lg: '2px'
    },
    BtnSize: {
        sm: '24px',
        md: '28px',
        lg: '32px'
    }
};

type Size = 'sm' | 'md' | 'lg';
const SizeMap: Record<Size, DesignToken> = {
    sm: 'T_HEIGHT_SM',
    md: 'T_HEIGHT_MD',
    lg: 'T_HEIGHT_LG'
};

export const SwitchWrap = sWrap<{ disabled?: boolean; checked?: boolean; size: Size }>({})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            disabled,
            size,
            checked
        } = props;

        const { Width, BtnPadding, BorderWidth, BtnSize } = switchTheme;

        return css`
            position: relative;
            cursor: pointer;
            font-size: 12px;
            display: inline-block;
            vertical-align: middle;
            height: ${DT[SizeMap[size]]};
            line-height: ${DT[SizeMap[size]]};
            width: ${Width[size]};

            .${innerCls} {
                border-radius: ${DT.T_SWITCH_CORNER};
                box-sizing: border-box;
                display: inline-flex;
                align-items: center;
                width: 100%;
                height: 100%;
                user-select: none;
                transition: color 0.3s;
            }
            .${dotCls} {
                position: absolute;
                display: block;
                right: 6px;
                top: 50%;
                margin-top: -2px;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                transition: background 0.3s;
            }
            .${loadingCls} {
                position: absolute;
                display: block;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 12px;
                height: 12px;
                border-radius: 50%;
                svg{
                    display: block;
                }
            }
            .${buttonCls} {
                position: absolute;
                display: block;
                box-sizing: border-box;
                left: 0;
                top: 0;
                transition: all 0.3s;
                > span {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: ${DT.T_SWITCH_CORNER};
                    box-sizing: border-box;
                    position: relative;
                }
            }
            .${onTipCls}, .${offTipCls} {
                width: 100%;
                text-align: center;
                box-sizing: border-box;
                display: block;
            }

            .${innerCls} {
                background: ${DT.T_SWITCH_COLOR_BG_INNER_OFF};
                border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                border-width: ${BorderWidth[size]};
                border-style: solid;
                box-shadow: ${DT.T_SHADOW_INSET_1};
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }

            .${buttonCls} {
                width: ${BtnSize[size]};
                height: ${BtnSize[size]};
                padding: ${BtnPadding[size]};
                > span {
                    background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
                    box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
                    border: ${BorderWidth[size]} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                }
            }

            .${dotCls} {
                background: ${DT.T_SWITCH_COLOR_BG_DOT_OFF};
            }

            ${!disabled &&
            css`
                :hover {
                    .${innerCls} {
                        border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                        ${checked &&
                        css`
                            border-color: ${DT.T_SWITCH_COLOR_LINE_INNER_ON};
                        `}
                    }
                }
            `}

            ${size === 'sm' &&
            css`
                .${onTipCls}, .${offTipCls} {
                    display: none;
                }
            `};
            ${size === 'md' &&
            css`
                .${onTipCls} {
                    padding-right: ${BtnSize[size]};
                }
                .${offTipCls} {
                    padding-left: ${BtnSize[size]};
                }
            `};
            ${size === 'lg' &&
            css`
                .${onTipCls} {
                    padding-right: ${BtnSize[size]};
                }
                .${offTipCls} {
                    padding-left: ${BtnSize[size]};
                }
            `};

            ${checked
                ? css`
                      .${innerCls} {
                          color: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
                          border-color: ${DT.T_SWITCH_COLOR_LINE_INNER_ON};
                          background: ${DT.T_SWITCH_COLOR_BG_INNER_ON};
                      }
                      .${buttonCls} {
                          left: 100%;
                          margin-left: -${BtnSize[size]};
                      }
                      .${dotCls} {
                          background: ${DT.T_SWITCH_COLOR_BG_DOT_ON};
                      }

                      .${offTipCls} {
                          display: none;
                      }
                  `
                : css`
                      .${onTipCls} {
                          display: none;
                      }
                  `};

            ${disabled &&
            css`
                cursor: default;
                position: relative;
                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: ${DT.T_COLOR_MASK_COMP};
                }
            `};
        `;
    })
);
