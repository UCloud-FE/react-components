import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import RcDrawer from 'src/libs/rc-drawer';
import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-drawer';
export const closeCls = prefixCls + '-close';

const propsMixin = props => {
    const {
        zIndex,
        show,
        theme: { designTokens: DT },
        getContainer
    } = props;

    return css`
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
};

// eslint-disable-next-line react/prop-types,no-unused-vars
const CleanPropsRcDrawer = ({ show, theme, zIndex, ...rest }) => {
    return <RcDrawer {...rest} />;
};

const closeHandlerPropsMixin = props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
        background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
        box-shadow: ${DT.T_SHADOW_BUTTON_PRIMARY};
        :hover {
            background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_HOVER};
            box-shadow: ${DT.T_SHADOW_BUTTON_PRIMARY_HOVER};
        }
    `;
};

export const CloseHandlerWrapper = withProps({
    className: closeCls
})(
    styled('span')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            display: inline-block;
            text-align: center;
            position: absolute;
            cursor: pointer;
            font-size: 0px;
            transition: all 0.3s;

            ${closeHandlerPropsMixin(props)};
            color: ${DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT};
            fill: ${DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT};
        `;
    })
);

export const DrawerWrap = withProps({
    prefixCls: prefixCls
})(
    styled(CleanPropsRcDrawer)(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
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
                background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
            }

            .${prefixCls}-content-wrapper {
                height: 100%;
                width: 100%;
                position: absolute;
            }
            .${prefixCls}-content-wrapper, .${prefixCls}-mask {
                transition: all 0.1s;
            }

            &.${prefixCls}-left, &.${prefixCls}-right {
                .${closeCls} {
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
                .${closeCls} {
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
                .${closeCls} {
                    left: -24px;
                    border-radius: 4px 0px 0px 4px;
                }
            }
            &.${prefixCls}-top, &.${prefixCls}-bottom {
                .${closeCls} {
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
                .${closeCls} {
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
                .${closeCls} {
                    top: -24px;
                    border-radius: 4px 4px 0px 0px;
                }
            }

            ${propsMixin(props)};
        `;
    })
);
