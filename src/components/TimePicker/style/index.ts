import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Timer } from '@z-r/calendar';

import { sWrap } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-timepicker';
export const timePrefixCls = _prefixCls + '-time';

const shouldForwardProp = (propName: string): boolean => {
    return !({ customStyle: 1, theme: 1 } as { [key: string]: 1 })[propName];
};

export const STime = sWrap<any>({})(
    styled(Timer, { shouldForwardProp })(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            display: flex;
            /* background: ${DT.T_COLOR_BG_DEFAULT_NORMAL}; */
            .${timePrefixCls}-wrap {
                overflow: hidden;
                display: flex;
                position: relative;
                .${timePrefixCls}-scroller {
                    height: 36px;
                    padding: 126px 0;
                    /* scroll-behavior: smooth; */
                    /* overflow-y: hidden; */
                    overflow-y: scroll;
                    z-index: 1;
                    &:hover {
                        /* overflow-y: scroll; */
                    }

                    .${timePrefixCls}-stepper {
                        width: 40px;
                        text-align: center;
                        line-height: 36px;
                        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                        cursor: pointer;
                        user-select: none;
                        &.${timePrefixCls}-active {
                            font-weight: bold;
                        }
                    }
                    :after,
                    .${timePrefixCls}-stepper:hover:after {
                        content: ' ';
                        position: absolute;
                        display: block;
                        height: 32px;
                        width: 40px;
                        box-sizing: border-box;
                        pointer-events: none;
                        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                        z-index: -1;
                    }
                    :after {
                        top: 128px;
                    }
                    .${timePrefixCls}-stepper:hover {
                        position: relative;
                    }
                    .${timePrefixCls}-stepper:hover:after {
                        top: 2px;
                    }
                }
            }
            .${timePrefixCls}-wrap + .${timePrefixCls}-wrap {
                margin-left: 4px;
            }
        `;
    })
);
