import styled, { css } from 'styled-components';
import RcTabs from 'rc-tabs';

import config from 'src/config';
import { clearFixMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-tabs';

/* stylelint-disable no-descending-specificity */
export const TabsWrap = styled(RcTabs)(
    ({ theme: { colorMap, colorList, Tabs: tabsTheme } }) => css`
        overflow: hidden;
        ${clearFixMixin};

        .${prefixCls} {
            &-bar {
                outline: none;
                position: relative;
            }
            &-tabpane {
                width: 100%;
                height: 100%;
                flex-shrink: 0;
                box-sizing: border-box;
                &-inactive {
                    display: none;
                }
            }
            &-tab {
                padding: 8px 12px;
                border: 1px solid transparent;
                border-radius: 2px 2px 0 0;
                font-size: 14px;
                box-sizing: border-box;
                cursor: pointer;
            }
            &-nav {
                display: inline-block;
                white-space: nowrap;
            }
            &-nav-animated {
                transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
            }
            &-nav-wrap {
                overflow: hidden;
                height: 100%;
            }
            &-nav-container {
                position: relative;
                height: 100%;
                box-sizing: border-box;
            }
            &-tab-prev,
            &-tab-next {
                display: none;
                position: absolute;
                font-size: 16px;
                line-height: 20px;
                height: 20px;
                width: 20px;
                text-align: center;
                cursor: pointer;
            }
            &-tab-btn-disabled {
                pointer-events: none;
                color: ${colorMap.disabled.text};
            }

            &-tab-prev.${prefixCls}-tab-arrow-show, &-tab-next.${prefixCls}-tab-arrow-show {
                display: inline-block;
            }

            &-tab-disabled {
                cursor: not-allowed;
                pointer-events: none;
                color: ${colorMap.disabled.text};
            }

            ${({ styleType }) =>
                styleType === 'default' &&
                css`
                    &-ink-bar {
                        display: none !important;
                    }
                    &-tab:hover {
                        background-color: ${tabsTheme['default:hover'].text};
                        border-color: ${tabsTheme['default:hover'].border};
                    }
                    &-tab-active,
                    &-tab-active:hover {
                        color: ${tabsTheme['default:active'].text};
                        border-color: ${tabsTheme['default:active'].border};
                        background-color: ${colorList.primary4};
                    }
                `};

            ${({ styleType }) =>
                styleType === 'ink' &&
                css`
                    &-ink-bar {
                        width: 2px;
                        height: 2px;
                        position: absolute;
                        background-color: ${tabsTheme.ink.bar};
                        transition: transform 0.3s;
                    }
                    &-tab:hover {
                        color: ${tabsTheme['ink:active'].text};
                    }
                    &-tab-active {
                        color: ${tabsTheme['ink:active'].text};
                    }
                `};
        }

        &.${prefixCls} {
            &-top .${prefixCls} {
                &-bar {
                    border-bottom: 1px solid ${colorList.secondary4};
                }
                &-nav-container {
                    margin-bottom: -1px;
                }
                &-tab {
                    margin-bottom: -1px;
                    display: inline-block;

                    &:hover {
                        border-bottom-color: ${colorList.secondary4};
                    }
                    &-active,
                    &-active:hover {
                        border-bottom-color: ${colorList.primary4};
                    }
                }
                &-content {
                    width: 100%;
                }
                &-ink-bar {
                    bottom: 0;
                }
            }

            &-bottom .${prefixCls} {
                &-bar {
                    border-top: 1px solid ${colorList.secondary4};
                }
                &-nav-container {
                    margin-top: -1px;
                }
                &-tab {
                    margin-top: -1px;
                    display: inline-block;

                    &:hover {
                        border-top-color: ${colorList.secondary4};
                    }
                    &-active,
                    &-active:hover {
                        border-top-color: ${colorList.primary4};
                    }
                }
                &-content {
                    width: 100%;
                }
                &-ink-bar {
                    top: 0;
                }
            }

            &-left .${prefixCls} {
                &-bar {
                    border-right: 1px solid ${colorList.secondary4};
                    float: left;
                    height: 100%;
                }
                &-nav-container {
                    margin-right: -1px;
                }
                &-tab {
                    margin-right: -1px;

                    &:hover {
                        border-right-color: ${colorList.secondary4};
                    }
                    &-active,
                    &-active:hover {
                        border-right-color: ${colorList.primary4};
                    }
                }
                &-content {
                    overflow: hidden;
                    height: 100%;
                }
                &-ink-bar {
                    right: 0;
                }
            }

            &-right .${prefixCls} {
                &-bar {
                    border-left: 1px solid ${colorList.secondary4};
                    float: right;
                    height: 100%;
                }
                &-nav-container {
                    margin-left: -1px;
                }
                &-tab {
                    margin-left: -1px;

                    &:hover {
                        border-left-color: ${colorList.secondary4};
                    }
                    &-active,
                    &-active:hover {
                        border-left-color: ${colorList.primary4};
                    }
                }
                &-content {
                    overflow: hidden;
                    height: 100%;
                }
                &-ink-bar {
                    left: 0;
                }
            }

            &-top .${prefixCls}-nav-scroll, &-bottom .${prefixCls}-nav-scroll {
                width: 100%;
            }
            &-left .${prefixCls}-nav-scroll, &-right .${prefixCls}-nav-scroll {
                height: 100%;
            }

            &-left .${prefixCls}-nav-container-scrolling, &-right .${prefixCls}-nav-container-scrolling {
                padding: 20px 0;
            }
            &-top .${prefixCls}-nav-container-scrolling, &-bottom .${prefixCls}-nav-container-scrolling {
                padding: 0 20px;
            }
            &-top .${prefixCls}-tab-prev, &-bottom .${prefixCls}-tab-prev {
                left: 0;
            }
            &-top .${prefixCls}-tab-next, &-bottom .${prefixCls}-tab-next {
                right: 0;
            }
            &-top
                .${prefixCls}-tab-prev,
                &-bottom
                .${prefixCls}-tab-prev,
                &-top
                .${prefixCls}-tab-next,
                &-bottom
                .${prefixCls}-tab-next {
                top: 50%;
                margin-top: -10px;
            }
            &-left
                .${prefixCls}-tab-prev,
                &-right
                .${prefixCls}-tab-prev,
                &-left
                .${prefixCls}-tab-next,
                &-right
                .${prefixCls}-tab-next {
                left: 50%;
                margin-left: -10px;
                transform: rotate(90deg);
            }

            &-right .${prefixCls}-tab-prev, &-left .${prefixCls}-tab-prev {
                top: 0;
            }
            &-right .${prefixCls}-tab-next, &-left .${prefixCls}-tab-next {
                bottom: 0;
            }

            &-left .${prefixCls}-tab-prev-icon:before, &-right .${prefixCls}-tab-prev-icon:before {
                content: '\\2039';
            }
            &-left .${prefixCls}-tab-next-icon:before, &-right .${prefixCls}-tab-next-icon:before {
                content: '\\203A';
            }
            &-top .${prefixCls}-tab-prev-icon:before, &-bottom .${prefixCls}-tab-prev-icon:before {
                content: '\\2039';
            }
            &-top .${prefixCls}-tab-next-icon:before, &-bottom .${prefixCls}-tab-next-icon:before {
                content: '\\203A';
            }
        }
    `
);
addDefaultThemeProps(TabsWrap);
