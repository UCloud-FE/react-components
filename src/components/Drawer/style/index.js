import React from 'react';
import styled, { css, withTheme } from 'styled-components';

import RcDrawer from 'src/libs/rc-drawer';
import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import defaultTheme from 'src/components/ThemeProvider/theme';
import SvgIcon from 'src/components/SvgIcon';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-drawer';

const propsMixin = ({ zIndex, show, theme: { designTokens: DT }, getContainer }) => css`
    background: ${DT.T_COLOR_BG_CONTENT_1};
    .${prefixCls}-mask, .${prefixCls}-content-wrapper {
        z-index: ${zIndex};
        position: ${getContainer ? 'absolute' : 'fixed'};
    }

    &.${prefixCls}-open.${prefixCls}-left .${prefixCls}-content-wrapper {
        box-shadow: ${DT.T_SHADOW_BLOCK_RIGHT_LG};
    }
    &.${prefixCls}-open.${prefixCls}-right .${prefixCls}-content-wrapper {
        box-shadow: ${DT.T_SHADOW_BLOCK_LEFT_LG};
    }
    &.${prefixCls}-open.${prefixCls}-top .${prefixCls}-content-wrapper {
        box-shadow: ${DT.T_SHADOW_BLOCK_BOTTOM_LG};
    }
    &.${prefixCls}-open.${prefixCls}-bottom .${prefixCls}-content-wrapper {
        box-shadow: ${DT.T_SHADOW_BLOCK_TOP_LG};
    }

    ${show
        ? css`
              .${prefixCls}-mask {
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
              }
          `
        : css`
              /* display: none; */
          `};
`;

// eslint-disable-next-line react/prop-types,no-unused-vars
const CleanPropsRcDrawer = ({ show, theme, zIndex, ...rest }) => {
    return <RcDrawer {...rest} />;
};

const closeHandlerPropsMixin = ({ theme: { designTokens: DT } }) => css`
    background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
    box-shadow: ${DT.T_SHADOW_BUTTON_PRIMARY};
    :hover {
        background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_HOVER};
        box-shadow: ${DT.T_SHADOW_BUTTON_PRIMARY_HOVER};
    }
`;

export const CloseHandlerWrapper = styled.span`
    display: inline-block;
    text-align: center;
    position: absolute;
    cursor: pointer;
    font-size: 0px;
    transition: all 0.3s;

    ${closeHandlerPropsMixin};
`;

export const CloseIcon = withTheme(({ theme: { designTokens: DT } = defaultTheme }) => {
    return <SvgIcon type="boldCross" color={DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT} />;
});

/* stylelint-disable no-descending-specificity */
export const DrawerWrap = styled(CleanPropsRcDrawer).attrs({
    prefixCls: prefixCls
})(
    ({ theme: { designTokens: DT } }) => css`
        outline: none;

        .${prefixCls}-mask {
            background: ${DT.T_MODAL_COLOR_LAYER_DEFAULT};
            opacity: 0;
        }

        &.${prefixCls}-open {
            .${prefixCls}-mask {
                opacity: 1;
            }
        }

        .${prefixCls}-content {
            height: 100%;
            width: 100%;
            overflow: auto;
        }

        .${prefixCls}-content-wrapper {
            height: 100%;
            width: 100%;
            position: absolute;
            background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
        }
        .${prefixCls}-content-wrapper, .${prefixCls}-mask {
            transition: all 0.1s;
        }

        &.${prefixCls}-left, &.${prefixCls}-right {
            ${CloseHandlerWrapper} {
                width: 24px;
                height: 48px;
                line-height: 48px;
                top: 110px;
            }
        }
        &.${prefixCls}-left {
            .${prefixCls}-content-wrapper {
                top: 0;
                left: 0;
                height: 100%;
            }
            ${CloseHandlerWrapper} {
                right: -24px;
                border-radius: 0px 4px 4px 0px;
            }
        }
        &.${prefixCls}-right {
            .${prefixCls}-content-wrapper {
                top: 0;
                right: 0;
                height: 100%;
            }
            ${CloseHandlerWrapper} {
                left: -24px;
                border-radius: 4px 0px 0px 4px;
            }
        }
        &.${prefixCls}-top, &.${prefixCls}-bottom {
            ${CloseHandlerWrapper} {
                width: 48px;
                height: 24px;
                line-height: 24px;
                left: 50%;
                margin-left: -24px;
            }
        }
        &.${prefixCls}-top {
            .${prefixCls}-content-wrapper {
                top: 0;
                left: 0;
                width: 100%;
            }
            ${CloseHandlerWrapper} {
                bottom: -24px;
                border-radius: 0px 0px 4px 4px;
            }
        }
        &.${prefixCls}-bottom {
            .${prefixCls}-content-wrapper {
                bottom: 0;
                left: 0;
                width: 100%;
            }
            ${CloseHandlerWrapper} {
                top: -24px;
                border-radius: 4px 4px 0px 0px;
            }
        }

        ${propsMixin};
    `
);

addDefaultThemeProps(DrawerWrap, CloseHandlerWrapper);
