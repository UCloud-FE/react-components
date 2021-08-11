import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Time } from '@z-r/calendar';

import { sWrap } from 'src/style';
import config from 'src/config';
import isFirefox from 'src/utils/isFirefox';
import isIE from 'src/utils/isIE';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-timepicker';
export const timePrefixCls = _prefixCls + '-time';
export const shortcutCls = prefixCls + '-shortcut';
export const footerCls = prefixCls + '-footer';

const shouldForwardProp = (propName: string): boolean => {
    return !({ customStyle: 1, theme: 1 } as { [key: string]: 1 })[propName];
};

export const SPopup = sWrap({})(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            background: ${DT.T_COLOR_BG_DEFAULT_DARK};
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
            border-radius: 2px;
            .${timePrefixCls} {
                padding: 0 0 0 16px;
                border-left: 1px solid ${DT.T_COLOR_BG_DEFAULT_DARK};
                background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
            }
            .${footerCls} {
                padding: 12px;
                .${shortcutCls} {
                    cursor: pointer;
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            }
        `;
    })
);

const StepperHeight = 32;
const SpacingHeight = 104;
const StepperVisibleHeight = 28;
const ActiveOffset = (SpacingHeight * 2 + StepperHeight - StepperVisibleHeight) / 2;
const StepperActiveOffset = (StepperHeight - StepperVisibleHeight) / 2;

export const STime = sWrap<any>({})(
    styled(Time, { shouldForwardProp })(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            display: flex;
            .${timePrefixCls}-wrap {
                overflow: hidden;
                display: flex;
                position: relative;
                .${timePrefixCls}-scroller {
                    height: ${StepperHeight}px;
                    padding: ${SpacingHeight}px 0;
                    overflow-x: hidden;
                    overflow-y: hidden;
                    z-index: 1;
                    width: 56px;
                    :hover {
                        overflow-y: scroll;
                    }

                    ${
                        (isFirefox || isIE) &&
                        css`
                            ::after {
                                content: ' ';
                                visibility: hidden;
                                height: ${SpacingHeight}px;
                                display: block;
                            }
                        `
                    }

                    .${timePrefixCls}-stepper {
                        width: 40px;
                        text-align: center;
                        line-height: ${StepperHeight}px;
                        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                        cursor: pointer;
                        user-select: none;
                        &.${timePrefixCls}-active {
                            font-weight: bold;
                        }
                    }
                    .${timePrefixCls}-stepper:hover {
                        position: relative;
                    }
                    ::before,
                    .${timePrefixCls}-stepper:hover::after {
                        content: ' ';
                        position: absolute;
                        display: block;
                        height: ${StepperVisibleHeight}px;
                        width: 40px;
                        box-sizing: border-box;
                        pointer-events: none;
                        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                        z-index: -1;
                    }
                    ::before {
                        top: ${ActiveOffset}px;
                        left: 0;
                    }
                    .${timePrefixCls}-stepper:hover::after {
                        top: ${StepperActiveOffset}px;
                        left: 0;
                    }
                }
            }
        `;
    })
);
