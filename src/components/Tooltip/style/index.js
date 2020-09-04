import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { injectGlobal } from 'emotion';

import { prefixCls as popoverPrefixCls } from 'src/components/Popover/style';
import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-tooltip';

const arrowWidth = '6px';
const borderWidth = '1px';

export const tooltipPopupClassName = prefixCls + '-popup';
export const contentCls = prefixCls + '-cls';

export const ContentWrap = withProps({
    className: contentCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            themeType,
            popupWrapperPadding
        } = props;

        let map = {
            light: {
                text: DT.T_COLOR_TEXT_DEFAULT_DARK,
                border: DT.T_POPOVER_COLOR_LINE_LIGHT,
                background: DT.T_POPOVER_COLOR_BG_LIGHT
            },
            dark: {
                text: DT.T_COLOR_TEXT_WHITE,
                border: DT.T_POPOVER_COLOR_BG_DARK,
                background: DT.T_POPOVER_COLOR_BG_DARK
            }
        };
        map = map[themeType];
        return css`
            padding: ${popupWrapperPadding || '8px 10px'};
            text-align: left;
            text-decoration: none;
            border-radius: 3px;
            word-break: keep-all;
            box-sizing: border-box;
            line-height: 12px;
            color: ${map.text};
            border: ${DT.T_LINE_WIDTH_BASE} solid ${map.border};
            background: ${map.background};
        `;
    })
);

const arrowMixin = css`
    display: inline-block;
    position: absolute;
    width: 0;
    height: 0;
    border-width: 0;
    border-color: transparent;
    border-style: solid;
`;

export const Arrow = styled('span')`
    ${arrowMixin};
`;
export const ArrowInner = styled('span')`
    ${arrowMixin};
`;

injectGlobal`
    .${tooltipPopupClassName} {
        &.${popoverPrefixCls}-placement-bottom,
        &.${popoverPrefixCls}-placement-bottomLeft,
        &.${popoverPrefixCls}-placement-bottomRight {
            ${Arrow}, ${ArrowInner} {
                margin-left: -${arrowWidth};
                border-width: 0 ${arrowWidth} ${arrowWidth} ${arrowWidth};
                border-top-color: transparent;
                border-left-color: transparent;
                border-right-color: transparent;
            }
            ${Arrow} {
                top: -${arrowWidth};
            }
            ${ArrowInner} {
                top: ${borderWidth};
            }
        }
        &.${popoverPrefixCls}-placement-top,
        &.${popoverPrefixCls}-placement-topLeft,
        &.${popoverPrefixCls}-placement-topRight {
            ${Arrow}, ${ArrowInner} {
                margin-left: -${arrowWidth};
                border-width: ${arrowWidth} ${arrowWidth} 0 ${arrowWidth};
                border-bottom-color: transparent;
                border-left-color: transparent;
                border-right-color: transparent;
            }
            ${Arrow} {
                bottom: -${arrowWidth};
            }
            ${ArrowInner} {
                bottom: ${borderWidth};
            }
        }
        &.${popoverPrefixCls}-placement-left,
        &.${popoverPrefixCls}-placement-leftTop,
        &.${popoverPrefixCls}-placement-leftBottom {
            ${Arrow}, ${ArrowInner} {
                margin-top: -${arrowWidth};
                border-width: ${arrowWidth} 0 ${arrowWidth} ${arrowWidth};
                border-top-color: transparent;
                border-bottom-color: transparent;
                border-right-color: transparent;
            }
            ${Arrow} {
                right: -${arrowWidth};
            }
            ${ArrowInner} {
                right: ${borderWidth};
            }
        }
        &.${popoverPrefixCls}-placement-right,
        &.${popoverPrefixCls}-placement-rightTop,
        &.${popoverPrefixCls}-placement-rightBottom {
            ${Arrow}, ${ArrowInner} {
                margin-top: -${arrowWidth};
                border-width: ${arrowWidth} ${arrowWidth} ${arrowWidth} 0;
                border-top-color: transparent;
                border-bottom-color: transparent;
                border-left-color: transparent;
            }
            ${Arrow} {
                left: -${arrowWidth};
            }
            ${ArrowInner} {
                left: ${borderWidth};
            }
        }
        &.${popoverPrefixCls}-placement-bottomLeft,
        &.${popoverPrefixCls}-placement-topLeft {
            ${Arrow} {
                left: 16px;
            }
            .${contentCls} {
                min-width: 32px;
            }
        }
        &.${popoverPrefixCls}-placement-bottomRight,
        &.${popoverPrefixCls}-placement-topRight {
            ${Arrow} {
                right: 10px;
            }
            .${contentCls} {
                min-width: 32px;
            }
        }
        &.${popoverPrefixCls}-placement-leftTop,
        &.${popoverPrefixCls}-placement-rightTop {
            ${Arrow} {
                top: 5px;
                margin-top: 0;
            }
            .${contentCls} {
                min-height: 22px;
            }
        }
        &.${popoverPrefixCls}-placement-leftBottom,
        &.${popoverPrefixCls}-placement-rightBottom {
            ${Arrow} {
                bottom: 5px;
            }
            .${contentCls} {
                min-height: 22px;
            }
        }
        &.${popoverPrefixCls}-placement-top,
        &.${popoverPrefixCls}-placement-bottom {
            ${Arrow} {
                left: 50%;
            }
            .${contentCls} {
                min-width: 32px;
            }
        }
        &.${popoverPrefixCls}-placement-left,
        &.${popoverPrefixCls}-placement-right {
            ${Arrow} {
                top: 50%;
            }
            .${contentCls} {
                min-height: 22px;
            }
        }
    }
`;

export const TooltipWrap = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            themeType
        } = props;

        let map = {
            light: {
                border: DT.T_POPOVER_COLOR_LINE_LIGHT,
                background: DT.T_POPOVER_COLOR_BG_LIGHT
            },
            dark: {
                border: DT.T_POPOVER_COLOR_BG_DARK,
                background: DT.T_POPOVER_COLOR_BG_DARK
            }
        };
        map = map[themeType];
        return css`
            ${Arrow} {
                border-color: ${map.border};
            }
            ${ArrowInner} {
                border-color: ${map.background};
            }
        `;
    })
);
