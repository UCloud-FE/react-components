import styled from '@emotion/styled';
import { css } from '@emotion/core';

import withProps from 'src/utils/withProps';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixClsNavWarp = _prefixCls + '-nav-wrap';
export const prefixClsMenu = _prefixCls + '-nav';
export const prefixClsMenuItem = _prefixCls + '-nav-menu-item';
export const prefixClsTitleContent = prefixClsMenuItem + '-title-content';
export const prefixClsTitleText = prefixClsMenuItem + '-title-text';

export const NavWarp = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            height: 100%;
            font-size: ${DT.T_TYPO_FONT_SIZE_2};
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};

            .${prefixClsMenu}-expand {
                .${prefixClsMenuItem}-icon {
                    margin-right: 13px;
                }

                /* 选中的MenuItem小标题 */
                .${prefixClsMenu}-item-selected.${prefixClsMenu}-menu-item-small {
                    background-color: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    opacity: 1;
                    &.${prefixClsMenu}-item-active .${prefixClsMenuItem}-icon {
                        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                        opacity: 1;
                    }
                    .${prefixClsTitleText}, .${prefixClsMenuItem}-icon {
                        opacity: 1;
                    }
                }

                /* hover的MenuItem小标题 */
                .${prefixClsMenu}-item-active.${prefixClsMenu}-menu-item-small {
                    .${prefixClsMenuItem}-icon {
                        color: ${DT.T_IDE_DEFAULT_COLOR_BG_DEFAULT};
                        opacity: 0.65;
                    }
                }

                /* 小标题MenuItem和SubMenu特殊处理样式 */
                .${prefixClsMenu}-menu-item-small, .${prefixClsMenu}-submenu-small > .${prefixClsMenu}-submenu-title {
                    height: 32px;
                    line-height: 32px;
                    font-size: ${DT.T_TYPO_FONT_SIZE_1};
                    color: ${DT.T_IDE_DEFAULT_COLOR_BG_DEFAULT};

                    .${prefixClsTitleText}, .${prefixClsMenuItem}-icon {
                        opacity: 0.65;
                    }

                    .${prefixClsMenu}-submenu-arrow {
                        line-height: 32px;
                    }
                }

                .${prefixClsMenu}-submenu-small.${prefixClsMenu}-submenu-selected > .${prefixClsMenu}-submenu-title {
                    .${prefixClsTitleText} {
                        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    }
                    .${prefixClsMenuItem}-icon {
                        color: ${DT.T_IDE_DEFAULT_COLOR_BG_DEFAULT};
                        opacity: 0.65;
                    }
                }

                /* 小标题SubMenu hover icon样式处理 */
                .${prefixClsMenu}-submenu-small.${prefixClsMenu}-submenu-active > .${prefixClsMenu}-submenu-title {
                    .${prefixClsMenuItem}-icon {
                        color: ${DT.T_IDE_DEFAULT_COLOR_BG_DEFAULT};
                    }
                }
            }

            /* MenuItem hover 样式 */
            .${prefixClsMenuItem}-active {
                &.${prefixClsMenuItem}-small, &.${prefixClsMenuItem} {
                    background-color: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                }
                .${prefixClsMenuItem}-icon {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    opacity: 1;
                }
            }

            .${prefixClsMenu}-submenu {
                &:hover {
                    cursor: pointer;
                }
            }

            .${prefixClsMenu}-submenu-title {
                display: flex;
                .${prefixClsMenu}-submenu-arrow {
                    opacity: 0;
                }
                &:hover {
                    .${prefixClsMenu}-submenu-arrow {
                        opacity: 1;
                    }
                }
            }

            .${prefixClsTitleContent} {
                padding: 0 8px;
                width: calc(100% - 16px);
                display: flex;
                flex-direction: row;
                align-items: center;
                flex: 1;
                overflow: hidden;
            }

            .${prefixClsTitleText} {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .${prefixClsMenu}-submenu-title, .${prefixClsMenu}-menu-item {
                padding-left: 8px;
                margin-right: 16px;
                display: inline-block;
                border-radius: ${DT.T_CORNER_SM};
                font-size: ${DT.T_TYPO_FONT_SIZE_2};
            }

            /* SubMenu 和 MenuItem 选中 */
            .${prefixClsMenu}-item-active, .${prefixClsMenu}-submenu-active > .${prefixClsMenu}-submenu-title {
                background-color: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                .${prefixClsTitleText} {
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                }

                .${prefixClsMenuItem}-icon {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            }

            .${prefixClsMenu}-item-active.${prefixClsMenu}-item-selected {
                .${prefixClsTitleText} {
                    color: ${DT.T_COLOR_BG_PRIMARY_1};
                }
            }

            .${prefixClsMenu}-submenu-selected > .${prefixClsMenu}-submenu-title {
                .${prefixClsTitleText} {
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                }
                .${prefixClsMenuItem}-icon {
                    color: ${DT.T_COLOR_BG_PRIMARY_1};
                    opacity: 1;
                }
            }

            .${prefixClsMenu}-item-selected {
                background-color: ${DT.T_CHART_TIMEPICKER_BG_DEFAULT};
                color: ${DT.T_COLOR_BG_PRIMARY_1};
            }

            .${prefixClsMenu}-menu-item, .${prefixClsMenu}-submenu > .${prefixClsMenu}-submenu-title {
                height: 36px;
                line-height: 36px;
            }

            .${prefixClsMenu}-submenu-small {
                margin-bottom: 20px;
            }

            .${prefixClsMenuItem}-icon {
                width: 18px;
                height: 18px;
                line-height: 18px;
                text-align: center;
            }

            .${prefixClsMenuItem}-collapsed > .${prefixClsTitleContent}, .${prefixClsMenuItem}-collapsed {
                .${prefixClsTitleText} {
                    display: none;
                }
                .${prefixClsMenuItem}-icon {
                    display: inline-block;
                }
            }

            .${prefixClsMenu}-submenu-small .${prefixClsMenuItem} {
                position: relative;
                display: block;
                white-space: nowrap;
            }

            .${prefixClsMenuItem} {
                position: relative;
                display: block;
                white-space: nowrap;
                &:hover {
                    cursor: pointer;
                }
            }

            .${prefixClsMenu}-submenu-normal {
                line-height: 36px;
                .${prefixClsMenu}-sub {
                    position: relative;
                    margin: 8px 0;
                    &::after {
                        content: ' ';
                        left: 20px;
                        top: 0;
                        width: 1px;
                        height: 100%;
                        background: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                        position: absolute;
                    }
                }
            }

            & > .${prefixClsMenu}-item {
                padding-top: 20px;
                height: 32px;
                line-height: 32px;
            }

            .menu-icon,
            .${_prefixCls}-nav-submenu-arrow {
                transition: all 0.3s;
                z-index: 2;
            }

            .${prefixClsMenuItem}-pop-has-selected {
                .${prefixClsMenuItem}-icon {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            }
            .${prefixClsMenuItem}.${prefixClsMenuItem}-pop-has-selected {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                background-color: ${DT.T_CHART_TIMEPICKER_BG_DEFAULT};
            }

            .${prefixClsMenu}-hidden {
                display: none;
            }
            .${prefixClsMenu}-collapse {
                overflow: hidden;
                transition: height 0.3s ease-out;
            }

            .${prefixClsMenu} > li.${prefixClsMenu}-submenu {
                padding: 0;
            }

            .${prefixClsMenu}-item, .${prefixClsMenu}-submenu-title {
                margin: 0;
                position: relative;
                display: flex;
                align-items: center;
                white-space: nowrap;
            }

            .${prefixClsMenu}-submenu-popup {
                position: absolute;
            }
            .${prefixClsMenu}-submenu-popup .submenu-title-wrapper {
                padding-right: 20px;
            }

            .${prefixClsMenu} .${prefixClsMenu}-submenu-title .anticon,
            .${prefixClsMenu} .${prefixClsMenu}-item .anticon {
                width: 14px;
                height: 14px;
                margin-right: 8px;
                top: -1px;
            }

            .${prefixClsMenuItem}-tooltop-text {
                color: ${DT.T_COLOR_BG_NOTICE_DARK};
            }

            .${prefixClsMenu}-inline .${prefixClsMenu}-submenu-arrow {
                display: inline-block;
                vertical-align: baseline;
                text-align: center;
                text-transform: none;
                text-rendering: auto;
                margin-right: 8px;
                line-height: 36px;
                transition: transform 0.3s;
            }

            .${prefixClsMenu}-inline
                .${prefixClsMenu}-submenu-open
                > .${prefixClsMenu}-submenu-title
                .${prefixClsMenu}-submenu-arrow {
                transform: rotate(-180deg);
            }

            .${prefixClsMenu}-sub.${prefixClsMenu}-inline {
                padding: 0;
                border: none;
                border-radius: 0;
                box-shadow: none;
            }

            .${prefixClsMenu}-open-slide-up-enter, .${prefixClsMenu}-open-slide-up-appear {
                animation-duration: 0.3s;
                animation-fill-mode: both;
                transform-origin: 0 0;
                opacity: 0;
                animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
                animation-play-state: paused;
            }
            .${prefixClsMenu}-open-slide-up-leave {
                animation-duration: 0.3s;
                animation-fill-mode: both;
                transform-origin: 0 0;
                opacity: 1;
                animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
                animation-play-state: paused;
            }
            .${prefixClsMenu}-open-slide-up-enter.${prefixClsMenu}-open-slide-up-enter-active,
                .${prefixClsMenu}-open-slide-up-appear.${prefixClsMenu}-open-slide-up-appear-active {
                animation-name: rcMenuOpenSlideUpIn;
                animation-play-state: running;
            }
            .${prefixClsMenu}-open-slide-up-leave.${prefixClsMenu}-open-slide-up-leave-active {
                animation-name: rcMenuOpenSlideUpOut;
                animation-play-state: running;
            }

            @keyframes rcMenuOpenSlideUpIn {
                0% {
                    opacity: 0;
                    transform-origin: 0% 0%;
                    transform: scaleY(0);
                }
                100% {
                    opacity: 1;
                    transform-origin: 0% 0%;
                    transform: scaleY(1);
                }
            }
            @keyframes rcMenuOpenSlideUpOut {
                0% {
                    opacity: 1;
                    transform-origin: 0% 0%;
                    transform: scaleY(1);
                }
                100% {
                    opacity: 0;
                    transform-origin: 0% 0%;
                    transform: scaleY(0);
                }
            }
            .${prefixClsMenu}-open-zoom-enter, .${prefixClsMenu}-open-zoom-appear {
                opacity: 0;
                animation-duration: 0.3s;
                animation-fill-mode: both;
                transform-origin: 0 0;
                animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
                animation-play-state: paused;
            }
            .${prefixClsMenu}-open-zoom-leave {
                animation-duration: 0.3s;
                animation-fill-mode: both;
                transform-origin: 0 0;
                animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
                animation-play-state: paused;
            }
            .${prefixClsMenu}-open-zoom-enter.${prefixClsMenu}-open-zoom-enter-active,
                .${prefixClsMenu}-open-zoom-appear.${prefixClsMenu}-open-zoom-appear-active {
                animation-name: rcMenuOpenZoomIn;
                animation-play-state: running;
            }
            .${prefixClsMenu}-open-zoom-leave.${prefixClsMenu}-open-zoom-leave-active {
                animation-name: rcMenuOpenZoomOut;
                animation-play-state: running;
            }
        `;
    })
);

export const NavPopWrap = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            .uc-fe-menu {
                border-radius: ${DT.T_CORNER_LG};
                .uc-fe-menu-item,
                .uc-fe-menu-popup-title,
                .uc-fe-menu-popup-content .uc-fe-menu-item {
                    border-radius: ${DT.T_CORNER_LG};
                    margin: 0px 4px;
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    opacity: 0.65;
                }
                .uc-fe-menu-item:hover,
                .uc-fe-menu-popup-title :hover,
                .uc-fe-menu-popup-content .uc-fe-menu-item:hover {
                    background-color: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                }
                .uc-fe-menu-selected {
                    opacity: 1;
                    background-color: ${DT.T_CHART_TIMEPICKER_BG_DEFAULT};
                    &:hover {
                        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                        background-color: ${DT.T_CHART_TIMEPICKER_BG_DEFAULT};
                    }
                }
                .uc-fe-menu-popup-title.uc-fe-menu-selected,
                .uc-fe-menu-item.uc-fe-menu-selected {
                    opacity: 1;
                    color: ${DT.T_COLOR_BG_PRIMARY_1};
                    &:hover {
                        color: ${DT.T_COLOR_BG_PRIMARY_1};
                        background-color: ${DT.T_CHART_TIMEPICKER_BG_DEFAULT};
                    }
                }
            }
        `;
    })
);
