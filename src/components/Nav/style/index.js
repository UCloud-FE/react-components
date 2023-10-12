import styled from '@emotion/styled';
import { css } from '@emotion/core';

import withProps from 'src/utils/withProps';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixClsNavWarp = _prefixCls + '-nav-wrap';
export const prefixClsMenu = _prefixCls + '-nav';
export const prefixClsMenuItem = _prefixCls + '-nav-menu-item';
export const prefixClsMenuOuter = _prefixCls + '-menu-outer';
export const prefixClsSwitch = _prefixCls + '-switch-app';
export const prefixClsTitleContent = prefixClsMenuItem + '-title-content';
export const prefixClsTitleText = prefixClsMenuItem + '-title-text';

export const NavWarp = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            height: 100%;
            overflow: hidden;
            border: 1px solid #d9d9d9;
            box-shadow: 0 0 4px #d9d9d9;
            padding: 0 12px;
            font-size: 14px;

            @font-face {
                font-family: 'FontAwesome';
                src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.eot');
                src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.eot?#iefix')
                        format('embedded-opentype'),
                    url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.woff')
                        format('woff'),
                    url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.ttf')
                        format('truetype'),
                    url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.svg?#fontawesomeregular')
                        format('svg');
                font-weight: normal;
                font-style: normal;
            }

            .${prefixClsMenu}-item-selected.${prefixClsMenu}-menu-item-small {
                background-color: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                opacity: 1;
                &:hover {
                    background-color: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                }
            }

            .${prefixClsMenu}-submenu-title {
                .${prefixClsMenu}-submenu-arrow {
                    opacity: 0;
                }
                &:hover {
                    .${prefixClsMenu}-submenu-arrow {
                        opacity: 1;
                    }
                }
            }
            .${prefixClsTitleText} {
                // margin-left: 8px;
            }

            .${prefixClsTitleContent} {
                margin-left: 8px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .${prefixClsMenu}-submenu-title, .${prefixClsMenu}-menu-item {
                padding-left: 8px;
                margin-right: 16px;
                display: inline-block;
                border-radius: 2px;
                font-size: 14px;

                &:hover {
                    background-color: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    .${prefixClsTitleText} {
                        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    }

                    .${prefixClsMenuItem}-icon {
                        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    }
                }
            }

            .${prefixClsMenu}-submenu-small > .${prefixClsMenu}-submenu-title {
                &:hover {
                    background-color: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                }
            }

            .${prefixClsMenu}-submenu-selected > .${prefixClsMenu}-submenu-title {
                .${prefixClsTitleText} {
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                }
                .${prefixClsMenuItem}-icon {
                    color: ${DT.T_COLOR_BG_PRIMARY_1};
                }
            }

            .${prefixClsMenu}-item-selected {
                background-color: ${DT.T_CHART_TIMEPICKER_BG_DEFAULT};
                color: ${DT.T_COLOR_BG_PRIMARY_1};
                &:hover {
                    background-color: ${DT.T_CHART_TIMEPICKER_BG_DEFAULT};
                    .${prefixClsTitleText} {
                        color: ${DT.T_COLOR_BG_PRIMARY_1};
                    }
                }
            }

            .${prefixClsMenu}-submenu-small {
                margin-bottom: 20px;
            }

            .${prefixClsMenu}-menu-item-small, .${prefixClsMenu}-submenu-small > .${prefixClsMenu}-submenu-title {
                height: 32px;
                line-height: 32px;
                font-size: 12px;
                color: ${DT.T_IDE_DEFAULT_COLOR_BG_DEFAULT};
                opacity: 0.65;

                .${prefixClsMenuItem}-icon {
                    display: none;
                }
                .${prefixClsMenu}-submenu-arrow {
                    line-height: 32px;
                }
            }

            .${prefixClsMenuItem}-icon {
                margin: 8px 8px 8px 0px;
                width: 20px;
                height: 20px;
            }

            .${prefixClsMenuItem}-collapsed > .${prefixClsTitleContent}, .${prefixClsMenuItem}-collapsed {
                .${prefixClsTitleText} {
                    display: none;
                }
            }

            .${prefixClsMenu}-submenu-small .${prefixClsMenuItem} {
                position: relative;
                display: block;
                white-space: nowrap;
                height: 32px;
                line-height: 32px;
            }

            .${prefixClsMenuItem} {
                position: relative;
                display: block;
                white-space: nowrap;
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
                        background: #e2e2e2;
                        position: absolute;
                    }
                }
            }

            & > .${prefixClsMenu}-item {
                padding-top: 20px;
                height: 32px;
                line-height: 32px;
            }

            .${prefixClsMenuItem}-submenu-arrow {
                display: inline-block;
                font: normal normal normal 14px/1 FontAwesome, Helvetica, sans-serif;
                font-size: inherit;
                vertical-align: baseline;
                text-align: center;
                text-transform: none;
                text-rendering: auto;
                position: absolute;
                right: 16px;
                line-height: 1.5em;
                &:before {
                    content: '\f0da';
                }
            }

            .menu-icon,
            .${prefixClsMenuItem}-title-content, .${_prefixCls}-nav-submenu-arrow {
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
            .${prefixClsMenu}-item-group-list {
                margin: 0;
                padding: 0;
            }
            .${prefixClsMenu}-item-group-title {
                color: #999;
                line-height: 1.5;
                padding: 8px 10px;
                border-bottom: 1px solid #dedede;
            }

            .${prefixClsMenu} > li.${prefixClsMenu}-submenu {
                padding: 0;
            }

            .${prefixClsMenu}-item, .${prefixClsMenu}-submenu-title {
                margin: 0;
                position: relative;
                display: block;
                white-space: nowrap;
            }

            .${prefixClsMenu}-item.${prefixClsMenu}-item-disabled,
                .${prefixClsMenu}-submenu-title.${prefixClsMenu}-item-disabled,
                .${prefixClsMenu}-item.${prefixClsMenu}-submenu-disabled,
                .${prefixClsMenu}-submenu-title.${prefixClsMenu}-submenu-disabled {
                color: #777 !important;
            }
            .${prefixClsMenu} > .${prefixClsMenu}-item-divider {
                height: 1px;
                margin: 1px 0;
                overflow: hidden;
                padding: 0;
                line-height: 0;
                background-color: #e5e5e5;
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

            .${prefixClsMenu}-inline .${prefixClsMenu}-submenu-arrow {
                display: inline-block;
                font: normal normal normal 14px/1 FontAwesome, Helvetica, sans-serif;
                font-size: inherit;
                vertical-align: baseline;
                text-align: center;
                text-transform: none;
                text-rendering: auto;
                position: absolute;
                right: 26px;
                top: 0;
                line-height: 36px;
                transform: rotate(90deg);
                transition: transform 0.3s;
            }

            .${prefixClsMenu}-inline .${prefixClsMenu}-submenu-arrow:before {
                content: '\\F0DA';
            }

            .${prefixClsMenu}-inline
                .${prefixClsMenu}-submenu-open
                > .${prefixClsMenu}-submenu-title
                .${prefixClsMenu}-submenu-arrow {
                transform: rotate(-90deg);
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
                margin-left: 8px;

                .uc-fe-menu-item,
                .uc-fe-menu-popup-title,
                .uc-fe-menu-popup-content .uc-fe-menu-item {
                    border-radius: 2px;
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

export const SwtichAppWarp = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
            margin-bottom: 20px;
        `;
    })
);
