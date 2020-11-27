import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { inlineBlockWithVerticalMixin, calculateSize } from 'src/style';
import withProps from 'src/utils/withProps';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-switch';
export const dotCls = prefixCls + '-dot';
export const onTipCls = prefixCls + '-tip-on';
export const offTipCls = prefixCls + '-tip-off';
export const innerCls = prefixCls + '-inner';
export const buttonCls = prefixCls + '-button';

const switchTheme = {
    Width: {
        sm: '44px',
        md: '78px',
        lg: '92px'
    },
    Padding: {
        sm: '0',
        md: '4px',
        lg: '4px'
    },
    BorderWidth: {
        sm: '0',
        md: '1px',
        lg: '1px'
    },
    BtnSize: {
        sm: '24px',
        md: '20px',
        lg: '24px'
    }
};

/* stylelint-disable no-duplicate-selectors */
const propsMixin = props => {
    const {
        theme: { designTokens: DT, Height },
        disabled,
        size,
        checked
    } = props;

    const { Width, Padding, BorderWidth, BtnSize } = switchTheme;

    return css`
        background: ${DT.T_SWITCH_COLOR_BG_OUTER};
        height: ${Height[size]};
        width: ${Width[size]};
        padding: ${Padding[size]};
        border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        border-width: ${BorderWidth[size]};

        ${
            !disabled &&
            css`
                :hover {
                    border-color: ${DT.T_COLOR_LINE_PRIMARY_HOVER};
                    .${buttonCls} {
                        box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
                    }
                }
            `
        }

        .${buttonCls} {
            background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
            box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
            width: ${BtnSize[size]};
            height: ${BtnSize[size]};
        }

        .${dotCls} {
            background: ${DT.T_COLOR_TEXT_ERROR};
        }

        .${innerCls} {
            color: ${DT.T_SWITCH_COLOR_TEXT_OFF};
            border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            box-shadow: ${DT.T_SHADOW_INSET_1};
            background: ${DT.T_SWITCH_COLOR_BG_INNER_OFF};
        }

        ${
            size === 'sm' &&
            css`
                .${onTipCls}, .${offTipCls} {
                    display: none;
                }
                .${buttonCls} {
                    top: -1px;
                }
            `
        };
        ${
            size === 'md' &&
            css`
                .${onTipCls}, .${offTipCls} {
                    line-height: 16px;
                }
                .${onTipCls} {
                    padding-right: 20px;
                }
                .${offTipCls} {
                    padding-left: 20px;
                }
            `
        };
        ${
            size === 'lg' &&
            css`
                .${onTipCls}, .${offTipCls} {
                    line-height: 20px;
                }
                .${onTipCls} {
                    padding-right: 26px;
                }
                .${offTipCls} {
                    padding-left: 26px;
                }
            `
        };

        ${
            checked
                ? css`
                      .${innerCls} {
                          color: ${DT.T_SWITCH_COLOR_TEXT_ON};
                          border-color: ${DT.T_SWITCH_COLOR_LINE_INNER_ON};
                          box-shadow: ${DT.T_SHADOW_INSET_1};
                          background: ${DT.T_SWITCH_COLOR_BG_INNER_ON};
                      }

                      .${buttonCls} {
                          left: 100%;
                          margin-left: -${calculateSize(BtnSize[size], -1)};
                      }

                      .${dotCls} {
                          background: ${DT.T_COLOR_TEXT_SUCCESS};
                      }

                      .${offTipCls} {
                          display: none;
                      }
                  `
                : css`
                      .${onTipCls} {
                          display: none;
                      }
                  `
        };

        ${
            disabled &&
            css`
                border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                cursor: default;

                .${innerCls} {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                    box-shadow: none;
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                }

                .${dotCls} {
                    background: ${DT.T_COLOR_BG_DISABLED_DARK};
                }
            `
        };
    `;
};

export const SwitchWrap = withProps({})(styled('div')`
    position: relative;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 12px;

    ${inlineBlockWithVerticalMixin};

    .${dotCls} {
        position: absolute;
        display: block;
        right: 4px;
        top: 50%;
        margin-top: -2px;
        width: 4px;
        height: 4px;
        border-radius: 2px;
        transition: all 0.3s;
    }
    .${buttonCls} {
        position: absolute;
        display: block;
        left: -1px;
        top: -2px;
        border-radius: 2px;
        box-sizing: border-box;
        transition: all 0.3s;
    }
    .${onTipCls}, .${offTipCls} {
        width: 100%;
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        display: block;
    }
    .${innerCls} {
        position: relative;
        height: 100%;
        width: 100%;
        border-radius: 2px;
        box-sizing: border-box;
    }
    ${propsMixin};
`);
