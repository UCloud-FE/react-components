import styled, { css, injectGlobal } from 'styled-components';

import { prefixCls as popoverPrefixCls } from 'src/components/Popover/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import config from 'config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-tooltip';

/* stylelint-disable property-no-unknown,no-duplicate-selectors */
const arrowWidth = '6px';
const borderWidth = '1px';

export const tooltipPopupClassName = prefixCls + '-popup';

export const ContentWrap = styled.div(({ theme: { Tooltip: tooltipTheme }, themeType }) => {
    tooltipTheme = tooltipTheme[themeType];
    return css`
        padding: 8px 10px;
        text-align: left;
        text-decoration: none;
        border-radius: 3px;

        background-color: ${tooltipTheme.content.background};
        border: ${borderWidth} solid ${tooltipTheme.content.border};
        color: ${tooltipTheme.content.text};
    `;
});

const arrowMixin = css`
    display: inline-block;
    position: absolute;
    width: 0;
    height: 0;
    border-width: 0;
    border-color: transparent;
    border-style: solid;
`;

export const Arrow = styled.span`
    ${arrowMixin};
`;
export const ArrowInner = styled.span`
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
                left: 15%;
            }
        }
        &.${popoverPrefixCls}-placement-bottomRight,
        &.${popoverPrefixCls}-placement-topRight {
            ${Arrow} {
                right: 15%;
            }
        }
        &.${popoverPrefixCls}-placement-leftTop,
        &.${popoverPrefixCls}-placement-rightTop {
            ${Arrow} {
                top: 15%;
                margin-top: 0;
            }
        }
        &.${popoverPrefixCls}-placement-leftBottom,
        &.${popoverPrefixCls}-placement-rightBottom {
            ${Arrow} {
                bottom: 15%;
            }
        }
        &.${popoverPrefixCls}-placement-top,
        &.${popoverPrefixCls}-placement-bottom {
            ${Arrow} {
                left: 50%;
            }
        }
        &.${popoverPrefixCls}-placement-left,
        &.${popoverPrefixCls}-placement-right {
            ${Arrow} {
                top: 50%;
            }
        }
    }
`;

export const TooltipWrap = styled.div(({ theme: { Tooltip: tooltipTheme }, themeType }) => {
    tooltipTheme = tooltipTheme[themeType];
    return css`
        ${Arrow} {
            border-color: ${tooltipTheme.arrow.border};
        }
        ${ArrowInner} {
            border-color: ${tooltipTheme.arrow.background};
        }
    `;
});
addDefaultThemeProps(ContentWrap, TooltipWrap);
