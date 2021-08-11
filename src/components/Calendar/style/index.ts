import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Calendar, Month } from '@z-r/calendar';

import config from 'src/config';
import { sWrap, Theme } from 'src/style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-calendar';
export const tableCls = prefixCls + '-table';

/* stylelint-disable no-duplicate-selectors */
export const calendarMixin = (props: { theme: Theme; customStyle?: { boxShadow?: boolean } }) => {
    const {
        theme: { designTokens: DT },
        customStyle
    } = props;

    return css`
        &.${prefixCls} {
            outline: none;
            position: relative;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
            ${customStyle?.boxShadow === false
                ? null
                : css`
                      box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
                  `}
        }

        .${prefixCls}-header {
            display: flex;
            flex: none;
            box-sizing: border-box;
            width: 100%;
            height: 44px;
            padding: 0 8px;
            border-bottom: 1px solid ${DT.T_COLOR_BG_DEFAULT_DARK};
            align-items: center;
            user-select: none;
        }
        .${prefixCls}-header-button {
            display: block;
            width: 28px;
            font-size: 16px;
            text-align: center;
            color: ${DT.T_COLOR_TEXT_REMARK_DARK};
            cursor: pointer;
            :hover {
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
        }
        .${prefixCls}-header-switcher-wrap {
            display: block;
            flex: 1;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            .${prefixCls}-header-switcher {
                cursor: pointer;
            }
            .${prefixCls}-header-switcher+.${prefixCls}-header-switcher {
                margin-left: 8px;
            }
        }
        .${prefixCls}-row {
            display: flex;
            align-items: center;
            .${prefixCls}-cell {
                flex: 1;
            }
        }
        .${prefixCls}-thead {
            padding: 0 8px;
            font-size: 14px;
            font-weight: 600;
            background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
            .${prefixCls}-cell {
                line-height: 32px;
                text-align: center;
                vertical-align: middle;
            }
        }
        .${prefixCls}-tbody {
            padding: 0 8px 8px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            .${prefixCls}-row {
                margin-top: 4px;
            }
            .${prefixCls}-cell {
                display: inline-block;
                height: 28px;
                margin: 0 auto;
                line-height: 28px;
                text-align: center;
                border-radius: 2px;
                cursor: pointer;
                user-select: none;

                :not(.${prefixCls}-cell-empty):hover {
                    background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                }
                &.${prefixCls}-cell-empty {
                    cursor: default;
                }
                &.${prefixCls}-cell.${prefixCls}-prev, &.${prefixCls}-cell.${prefixCls}-next {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    :hover {
                        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    }
                }
                &.${prefixCls}-cell.${prefixCls}-disabled {
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    cursor: default;
                    border-radius: 0;
                    &.${prefixCls}-prev, &.${prefixCls}-next {
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    }
                    &.${prefixCls}-cell-disabled-first {
                        border-top-left-radius: 2px;
                        border-bottom-left-radius: 2px;
                    }
                    &.${prefixCls}-cell-disabled-last {
                        border-top-right-radius: 2px;
                        border-bottom-right-radius: 2px;
                    }
                }

                &.${prefixCls}-now {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
                &.${prefixCls}-cell.${prefixCls}-active {
                    background: ${DT.T_COLOR_BG_PRIMARY_1};
                    color: ${DT.T_COLOR_TEXT_WHITE};
                    font-weight: bold;
                }
            }
        }
        .${prefixCls}-prev, .${prefixCls}-next, .${prefixCls}-disable {
            color: ${DT.T_COLOR_TEXT_DISABLED};
        }
        .${prefixCls}-date-wrap, .${prefixCls}-month-wrap, .${prefixCls}-year-wrap, .${prefixCls}-decade-wrap {
            display: flex;
            flex-direction: column;
            height: 100%;
            .${prefixCls}-body {
                flex-grow: 1;
                display: flex;
            }
            .${tableCls} {
                height: 100%;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
            }
            .${prefixCls}-tbody {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
            }
            .${prefixCls}-row {
                flex-grow: 1;
            }
        }
        &.${prefixCls} .${prefixCls} {
            height: 100%;
        }
    `;
};

const shouldForwardProp = (propName: string): boolean => {
    return !({ customStyle: 1, theme: 1 } as { [key: string]: 1 })[propName];
};

export const SCalendar = sWrap<any>({})(
    styled(Calendar, { shouldForwardProp })`
        ${calendarMixin};
    `
);

export const SMonthCalendar = sWrap<any>({})(
    styled(Month, { shouldForwardProp })`
        ${calendarMixin};
    `
);
