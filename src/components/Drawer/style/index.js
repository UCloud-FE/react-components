import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

import RcDrawer from 'src/libs/rc-drawer';
import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-drawer';
export const closeCls = prefixCls + '-close';
export const closeHandlerIconCls = _prefixCls + '-close-handler-icon';

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

        &.${prefixCls}-open.${prefixCls}-left {
            .${prefixCls}-content-wrapper {
                box-shadow: ${DT.T_DRAWER_SHADOW_RIGHT};
            }
            .${closeHandlerIconCls} {
                transform: rotate(-90deg);
            }
        }
        &.${prefixCls}-open.${prefixCls}-right {
            .${prefixCls}-content-wrapper {
                box-shadow: ${DT.T_DRAWER_SHADOW_LEFT};
            }
            .${closeHandlerIconCls} {
                transform: rotate(90deg);
            }
        }
        &.${prefixCls}-open.${prefixCls}-top {
            .${prefixCls}-content-wrapper {
                box-shadow: ${DT.T_DRAWER_SHADOW_BOTTOM};
            }
            .${closeHandlerIconCls} {
                transform: rotate(0deg);
            }
        }
        &.${prefixCls}-open.${prefixCls}-bottom {
            .${prefixCls}-content-wrapper {
                box-shadow: ${DT.T_DRAWER_SHADOW_TOP};
            }
            .${closeHandlerIconCls} {
                transform: rotate(180deg);
            }
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

export const CloseHandler = withProps({
    className: closeCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            .${closeHandlerIconCls} {
                font-size: ${DT.T_DRAWER_CLOSE_ICON_SIZE_DEFAULT};
                color: ${DT.T_DRAWER_CLOSE_ICON_COLOR_DEFAULT};
            }
        `;
    })
);

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
                background: ${DT.T_DRAWER_CONTENT_BG_COLOR};
            }

            .${prefixCls}-content-wrapper {
                height: 100%;
                width: 100%;
                position: absolute;
            }
            .${prefixCls}-content-wrapper, .${prefixCls}-mask {
                transition: all 0.1s;
            }

            &.${prefixCls}-left, &.${prefixCls}-right, &.${prefixCls}-top, &.${prefixCls}-bottom {
                .${closeCls} {
                    position: absolute;
                    width: ${DT.T_DRAWER_CLOSE_BG_SIZE_DEFAULT};
                    height: ${DT.T_DRAWER_CLOSE_BG_SIZE_DEFAULT};
                    border-radius: ${DT.T_CORNER_CIRCLE};
                    cursor: pointer;
                    transition: all 0.3s;
                    top: 50%;
                    margin-top: -24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: ${DT.T_DRAWER_RESIZER_BG_DEFAULT};
                    z-index: -1;
                    &:hover {
                        width: ${DT.T_DRAWER_CLOSE_BG_SIZE_HOVER};
                        height: ${DT.T_DRAWER_CLOSE_BG_SIZE_HOVER};
                        background-color: ${DT.T_DRAWER_RESIZER_BG_HOVER};
                        .${closeHandlerIconCls} {
                            font-size: ${DT.T_DRAWER_CLOSE_ICON_SIZE_DEFAULT};
                            color: ${DT.T_DRAWER_CLOSE_ICON_COLOR_HOVER};
                        }
                    }
                    &[hidden] {
                        display: none;
                    }
                }
            }
            &.${prefixCls}-left {
                .${prefixCls}-content-wrapper {
                    top: 0;
                    left: 0;
                    height: 100%;
                }
                .${closeCls} {
                    right: -52px;
                }
            }
            &.${prefixCls}-right {
                .${prefixCls}-content-wrapper {
                    top: 0;
                    right: 0;
                    height: 100%;
                }
                .${closeCls} {
                    left: -52px;
                }
            }
            &.${prefixCls}-top, &.${prefixCls}-bottom {
                .${closeCls} {
                    top: auto;
                    left: 50%;
                    margin-left: -24px;
                    margin-top: 0;
                }
            }
            &.${prefixCls}-top {
                .${prefixCls}-content-wrapper {
                    top: 0;
                    left: 0;
                    width: 100%;
                }
                .${closeCls} {
                    bottom: -52px;
                }
            }
            &.${prefixCls}-bottom {
                .${prefixCls}-content-wrapper {
                    bottom: 0;
                    left: 0;
                    width: 100%;
                }
                .${closeCls} {
                    top: -52px;
                }
            }

            ${propsMixin(props)};
        `;
    })
);

export const DrawerHeaderWrap = withProps({
    prefixCls: prefixCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            background: ${DT.T_DRAWER_HEADER_BG_COLOR_DEFAULT};
            font-size: ${DT.T_DRAWER_HEADER_SIZE_DEFAULT};
            font-weight: ${DT.T_TYPO_FONT_WEIGHT_BOLD};
            line-height: ${DT.T_TYPO_FONT_SIZE_6};
            color: ${DT.T_DRAWER_HEADER_TITLE_COLOR_DEFAULT};
            padding: ${DT.T_DRAWER_HEADER_PADDING_VERTICAL} ${DT.T_DRAWER_HEADER_PADDING_HORIZONAL};
            box-shadow: ${DT.T_DRAWER_HEADER_BG_SHADOW_DEFAULT};
            box-sizing: border-box;
            height: 54px;
        `;
    })
);
export const DrawerContentWrap = withProps({
    prefixCls: prefixCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            padding: ${DT.T_DRAWER_CONTENT_PADDING};
        `;
    })
);
