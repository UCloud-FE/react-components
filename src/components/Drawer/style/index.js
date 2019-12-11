import React from 'react';
import styled, { css } from 'styled-components';

import RcDrawer from 'src/libs/rc-drawer';
import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-drawer';

const propsMixin = ({
    zIndex,
    show,
    theme: {
        TColorMap: { shadowBlock: TBlockShadowColorMap }
    },
    getContainer
}) => css`
    .${prefixCls}-mask, .${prefixCls}-content-wrapper {
        z-index: ${zIndex};
        position: ${getContainer ? 'absolute' : 'fixed'};
    }

    &.${prefixCls}-open.${prefixCls}-left .${prefixCls}-content-wrapper {
        box-shadow: ${TBlockShadowColorMap.rightLg};
    }
    &.${prefixCls}-open.${prefixCls}-right .${prefixCls}-content-wrapper {
        box-shadow: ${TBlockShadowColorMap.leftLg};
    }
    &.${prefixCls}-open.${prefixCls}-top .${prefixCls}-content-wrapper {
        box-shadow: ${TBlockShadowColorMap.bottomLg};
    }
    &.${prefixCls}-open.${prefixCls}-bottom .${prefixCls}-content-wrapper {
        box-shadow: ${TBlockShadowColorMap.topLg};
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

const closeHandlerPropsMixin = ({
    theme: {
        TColorMap: { shadowButton: TButtonShadowColorMap, gradient: TGradientColorMap }
    }
}) => css`
    background: ${TGradientColorMap.primary};
    box-shadow: ${TButtonShadowColorMap.primary};
    :hover {
        background: ${TGradientColorMap.primaryHover};
        box-shadow: ${TButtonShadowColorMap.primaryHover};
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

/* stylelint-disable no-descending-specificity */
export const DrawerWrap = styled(CleanPropsRcDrawer).attrs({
    prefixCls: prefixCls
})`
    outline: none;

    .${prefixCls}-mask {
        background-color: rgba(0, 0, 0, 0.7);
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
        background: #fff;
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
`;

addDefaultThemeProps(DrawerWrap, CloseHandlerWrapper);
