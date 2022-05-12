import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Calendar, Month } from '@z-r/calendar';

import config from 'src/config';
import { sWrap, Theme } from 'src/style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-calendar';
export const tableCls = prefixCls + '-table';
export const cellContentCls = prefixCls + '-cell-content';
export const cellContentSquareCls = cellContentCls + '-square';
export const cellContentPrevSpaceCls = cellContentCls + '-prev-space';
export const cellContentNextSpaceCls = cellContentCls + '-next-space';
export const twoSideSingleCls = prefixCls + '-tow-side-single';
export const iconCls = prefixCls + '-icon';

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
            ${
                customStyle?.boxShadow === false
                    ? null
                    : css`
                          box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
                      `
            }
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
            text-align: center;
            cursor: pointer;
            margin: 0 8px;
            .${iconCls} {
                width: 16px;
                height: 16px;
                fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
            }
            :hover .${iconCls}  {
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
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
            padding: 0 10px;
            font-size: 12px;
            font-weight: 600;
            background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
            .${prefixCls}-cell {
                line-height: 28px;
                text-align: center;
                vertical-align: middle;
            }
        }
        .${prefixCls}-tbody {
            padding: 0 10px 12px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            .${prefixCls}-row {
                margin-top: 12px;
            }
            .${prefixCls}-cell {
                display: inline-flex;
                margin: 0 auto;
                cursor: pointer;
                user-select: none;
                justify-content: center;

                .${cellContentPrevSpaceCls}, .${cellContentNextSpaceCls} {
                    content: ' ';
                    display: flex;
                    flex: 1;
                }
                .${cellContentCls} {
                    display: block;
                    text-align: center;
                    height: 20px;
                    width: 20px;
                    line-height: 20px;
                    .${cellContentSquareCls} {
                        border-radius: 2px;
                    }
                }

                &.${prefixCls}-cell-month, &.${prefixCls}-cell-year, &.${prefixCls}-cell-decade {
                    .${cellContentCls} {
                        border-radius: 2px;
                        height: 32px;
                        width: 40px;
                        line-height: 32px;
                    }
                }
                &.${prefixCls}-cell-decade .${cellContentCls} {
                    width: 82px;
                }

                :not(.${prefixCls}-cell-empty):hover {
                    .${cellContentCls} .${cellContentSquareCls} {
                        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    }
                }
                &.${prefixCls}-cell-empty {
                    cursor: default;
                }
                &.${prefixCls}-prev, &.${prefixCls}-next {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    :hover {
                        .${cellContentCls} .${cellContentSquareCls} {
                            background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                        }
                    }
                }
                &.${prefixCls}-cell.${prefixCls}-disabled {
                    cursor: default;
                    /* &.${prefixCls}-prev, &.${prefixCls}-next {
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    } */
                    .${cellContentCls},
                    .${cellContentCls} .${cellContentSquareCls} {
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                        color: ${DT.T_COLOR_TEXT_DISABLED};
                        border-radius: 0;
                    }
                    &:not(.${prefixCls}-cell-disabled-first) {
                        .${cellContentPrevSpaceCls} {
                            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                        }
                    }
                    &:not(.${prefixCls}-cell-disabled-last) {
                        .${cellContentNextSpaceCls} {
                            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                        }
                    }
                    &.${prefixCls}-cell-disabled-first {
                        .${cellContentCls} {
                            border-top-left-radius: 2px;
                            border-bottom-left-radius: 2px;
                        }
                    }
                    &.${prefixCls}-cell-disabled-last {
                        .${cellContentCls} {
                            border-top-right-radius: 2px;
                            border-bottom-right-radius: 2px;
                        }
                    }
                }

                &.${prefixCls}-now {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
                &.${prefixCls}-cell.${prefixCls}-range-middle {
                    .${cellContentCls}, .${cellContentPrevSpaceCls}, .${cellContentNextSpaceCls} {
                        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    }
                }
                &.${prefixCls}-cell.${prefixCls}-range-middle:first-of-type {
                    .${cellContentCls} {
                        border-top-left-radius: 2px;
                        border-bottom-left-radius: 2px;
                    }
                    .${cellContentPrevSpaceCls} {
                        background: none;
                    }
                }
                &.${prefixCls}-cell.${prefixCls}-range-middle:last-of-type {
                    .${cellContentCls} {
                        border-top-right-radius: 2px;
                        border-bottom-right-radius: 2px;
                    }
                    .${cellContentNextSpaceCls} {
                        background: none;
                    }
                }
                &.${prefixCls}-cell.${prefixCls}-range-middle + .${prefixCls}-cell.${prefixCls}-range-last,
                &.${prefixCls}-cell.${prefixCls}-range-first + .${prefixCls}-cell.${prefixCls}-range-last {
                    .${cellContentPrevSpaceCls} {
                        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    }
                    .${cellContentCls} {
                        border-top-left-radius: 0px;
                        border-bottom-left-radius: 0px;
                    }
                }
                &.${prefixCls}-cell.${prefixCls}-active,
                &.${prefixCls}-cell.${prefixCls}-range-first,
                &.${prefixCls}-cell.${prefixCls}-range-last {
                    .${cellContentCls} {
                        border-radius: 2px;
                        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                        .${cellContentSquareCls} {
                            border-radius: 2px;
                            background: ${DT.T_COLOR_BG_PRIMARY_1};
                            color: ${DT.T_COLOR_TEXT_WHITE};
                        }
                    }
                }
                &.${prefixCls}-cell.${prefixCls}-range-first:not(.${prefixCls}-range-unclosed):not(.${prefixCls}-range-last) {
                    .${cellContentNextSpaceCls} {
                        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    }
                    .${cellContentCls} {
                        border-top-right-radius: 0px;
                        border-bottom-right-radius: 0px;
                    }
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

export const STwoSide = sWrap<{ customStyle?: { boxShadow: boolean } }>()(
    styled('div')(
        ({ theme: { designTokens: DT }, customStyle }) => css`
            ${customStyle?.boxShadow === false
                ? null
                : css`
                      box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
                  `}
            display: flex;
            .${prefixCls} {
                flex: 1;
            }
            &:not(.${twoSideSingleCls}) .${prefixCls}:nth-of-type(1) {
                .${prefixCls}-body {
                    border-right: 1px solid ${DT.T_COLOR_BG_DEFAULT_DARK};
                }
            }
            &:not(.${twoSideSingleCls}) {
                .${prefixCls}:nth-of-type(1)
                    .${prefixCls}-header-button-nextYear,
                    .${prefixCls}:nth-of-type(1)
                    .${prefixCls}-header-button-nextMonth,
                    .${prefixCls}:nth-of-type(2)
                    .${prefixCls}-header-button-prevYear,
                    .${prefixCls}:nth-of-type(2)
                    .${prefixCls}-header-button-prevMonth {
                    visibility: hidden;
                    pointer-events: none;
                }
            }
        `
    )
);

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
