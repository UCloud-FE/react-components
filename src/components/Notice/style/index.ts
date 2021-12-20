import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { DesignToken, sWrap } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-notice';
export const iconCls = prefixCls + '-icon';
export const iconWrapCls = prefixCls + '-icon-wrap';
export const contentCls = prefixCls + '-content';
export const actionCls = prefixCls + '-action';
export const closeCls = prefixCls + '-close';

const colorMapMap: Record<
    string,
    {
        color: DesignToken;
        border: DesignToken;
        background: DesignToken;
        icon: DesignToken;
    }
> = {
    info: {
        color: 'T_COLOR_TEXT_DEFAULT_DARK',
        border: 'T_COLOR_LINE_NOTICE_LIGHT',
        background: 'T_COLOR_BG_NOTICE_LIGHT',
        icon: 'T_COLOR_TEXT_PRIMARY_DEFAULT'
    },
    success: {
        color: 'T_COLOR_TEXT_DEFAULT_DARK',
        border: 'T_COLOR_LINE_SUCCESS_LIGHT',
        background: 'T_COLOR_BG_SUCCESS_LIGHT',
        icon: 'T_COLOR_TEXT_SUCCESS'
    },
    warning: {
        color: 'T_COLOR_TEXT_DEFAULT_DARK',
        border: 'T_COLOR_LINE_WARNING_LIGHT',
        background: 'T_COLOR_BG_WARNING_LIGHT',
        icon: 'T_COLOR_TEXT_WARNING'
    },
    error: {
        color: 'T_COLOR_TEXT_DEFAULT_DARK',
        border: 'T_COLOR_LINE_ERROR_LIGHT',
        background: 'T_COLOR_BG_ERROR_LIGHT',
        icon: 'T_COLOR_TEXT_ERROR'
    },
    disabled: {
        color: 'T_COLOR_TEXT_DISABLED',
        border: 'T_COLOR_LINE_DISABLED_LIGHT',
        background: 'T_COLOR_BG_DISABLED_LIGHT',
        icon: 'T_COLOR_TEXT_DISABLED'
    }
};

const map: Record<keyof typeof colorMapMap, keyof typeof colorMapMap> = {
    default: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'success',
    disabled: 'disabled'
};

export const NoticeWrap = sWrap<{ styleType: string }>()(
    styled('div')(props => {
        const {
            styleType,
            theme: { designTokens: DT }
        } = props;

        const style = map[styleType];
        const { color, border, background, icon } = colorMapMap[style];

        return css`
            display: flex;
            position: relative;
            box-sizing: border-box;
            width: 100%;
            padding: 10px 16px;
            margin: 0;
            border-radius: 1px;
            line-height: 18px;
            overflow: hidden;
            color: ${DT[color]};
            border: ${DT.T_LINE_WIDTH_BASE} solid ${DT[border]};
            background: ${DT[background]};

            .${iconWrapCls}, .${actionCls}, .${closeCls} {
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                height: 18px;
                line-height: 18px;
            }
            .${iconWrapCls} {
                width: 15px;
                padding-right: 8px;
                font-size: 15px;
                color: inherit;
            }
            .${iconWrapCls} .${iconCls} {
                fill: ${DT[icon]};
                color: ${DT[icon]};
            }
            .${contentCls} {
                flex: 1;
            }
            .${actionCls} {
                padding-left: 8px;
                white-space: nowrap;
                text-align: right;
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }
            .${closeCls} {
                padding-left: 8px;
                width: 12px;
                > .${iconCls} {
                    cursor: pointer;
                }
            }
        `;
    })
);
