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

const shouldForwardProp = (propName: string): boolean => {
    return !({ customStyle: 1, theme: 1 } as { [key: string]: 1 })[propName];
};

export const SPopup = sWrap({})(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
        `;
    })
);

export const STime = sWrap<any>({})(
    styled(Time, { shouldForwardProp })(props => {
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
                                height: 126px;
                                display: block;
                            }
                        `
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
                    .${timePrefixCls}-stepper:hover {
                        position: relative;
                    }
                    ::before,
                    .${timePrefixCls}-stepper:hover::after {
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
                    ::before {
                        top: 128px;
                        left: 0;
                    }
                    .${timePrefixCls}-stepper:hover::after {
                        top: 2px;
                        left: 0;
                    }
                }
            }
        `;
    })
);
