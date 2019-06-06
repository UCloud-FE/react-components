import styled, { css } from 'styled-components';
import RcDrawer from 'rc-drawer';

import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-drawer';

const propsMixin = ({ zIndex = 1010, show, theme: { materialVars }, getContainer }) => css`
    .${prefixCls}-mask, .${prefixCls}-content-wrapper {
        z-index: ${zIndex};
        position: ${getContainer ? 'absolute' : 'fixed'};
    }

    &.${prefixCls}-open .${prefixCls}-content-wrapper {
        box-shadow: ${materialVars.whiteBoxShadow};
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

/* stylelint-disable no-descending-specificity */
export const DrawerWrap = styled(RcDrawer).attrs({
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

    .${prefixCls}-content-wrapper {
        height: 100%;
        width: 100%;
        position: absolute;
        background: #fff;
        overflow: auto;
    }
    .${prefixCls}-content-wrapper, .${prefixCls}-mask {
        transition: all 0.1s;
    }

    &.${prefixCls}-left {
        .${prefixCls}-content-wrapper {
            top: 0;
            left: 0;
            height: 100%;
        }
    }
    &.${prefixCls}-right {
        .${prefixCls}-content-wrapper {
            top: 0;
            right: 0;
            height: 100%;
        }
    }
    &.${prefixCls}-top {
        .${prefixCls}-content-wrapper {
            top: 0;
            left: 0;
            width: 100%;
        }
    }
    &.${prefixCls}-bottom {
        .${prefixCls}-content-wrapper {
            bottom: 0;
            left: 0;
            width: 100%;
        }
    }

    ${propsMixin};
`;

addDefaultThemeProps(DrawerWrap);
