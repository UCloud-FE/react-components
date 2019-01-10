import styled, { css } from 'styled-components';
import RcTabs from 'rc-tabs';

import config from 'src/config';
import { clearFixMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-tabs';

/* stylelint-disable no-descending-specificity */
export const TabsWrap = styled(RcTabs).attrs({
    className: ({ styleType }) => `${prefixCls}-styletype-${styleType}`
})(
    ({ theme: { colorMap, colorList, Tabs: tabsTheme }, styleType, tabBarPosition }) => css`
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
                position: relative;
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

            ${styleType === 'default' &&
                css`
                    &-ink-bar {
                        display: none !important;
                    }
                    &-tab:hover {
                        background-color: ${tabsTheme['default:hover'].background};
                        border-color: ${tabsTheme['default:hover'].border};
                    }
                    &-tab-active,
                    &-tab-active:hover {
                        ${tabsTheme['default:active']};
                    }
                `};

            ${styleType === 'ink' &&
                css`
                    &-ink-bar {
                        width: 2px;
                        height: 2px;
                        position: absolute;
                        transition: transform 0.3s;
                        ${tabsTheme.inkBar};
                    }
                    &-tab:hover {
                        ${tabsTheme['ink:hover']};
                    }
                    &-tab-active {
                        ${tabsTheme['ink:active']};
                    }
                `};
        }

        &.${prefixCls} {
            ${tabBarPosition === 'top' &&
                css`
                    .${prefixCls}-top-bar {
                        border-bottom: 1px solid ${colorList.secondary4};
                        .${prefixCls} {
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
                            &-ink-bar {
                                bottom: 0;
                            }
                        }
                    }
                    .${prefixCls}-top-content {
                        width: 100%;
                    }
                `}

            ${tabBarPosition === 'bottom' &&
                css`
                    .${prefixCls}-bottom-bar {
                        border-top: 1px solid ${colorList.secondary4};
                        .${prefixCls} {
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
                            &-ink-bar {
                                top: 0;
                            }
                        }
                    }
                    .${prefixCls}-bottom-content {
                        width: 100%;
                    }
                `}

            ${tabBarPosition === 'left' &&
                css`
                    .${prefixCls}-left-bar {
                        border-right: 1px solid ${colorList.secondary4};
                        float: left;
                        height: 100%;
                        .${prefixCls} {
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
                            &-ink-bar {
                                right: 0;
                            }
                        }
                    }
                    .${prefixCls}-left-content {
                        overflow: hidden;
                        height: 100%;
                    }
                `}

            ${tabBarPosition === 'right' &&
                css`
                    .${prefixCls}-right-bar {
                        border-left: 1px solid ${colorList.secondary4};
                        float: right;
                        height: 100%;
                        .${prefixCls} {
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
                            &-ink-bar {
                                left: 0;
                            }
                        }
                    }
                    .${prefixCls}-right-content {
                        overflow: hidden;
                        height: 100%;
                    }
                `}
            ${(tabBarPosition === 'top' || tabBarPosition === 'bottom') &&
                css`
                    .${prefixCls}-top-bar, .${prefixCls}-bottom-bar {
                        .${prefixCls}-nav-scroll {
                            width: 100%;
                        }
                        .${prefixCls}-nav-container-scrolling {
                            padding: 0 20px;
                        }
                        .${prefixCls}-tab-prev {
                            left: 0;
                        }
                        .${prefixCls}-tab-next {
                            right: 0;
                        }
                        .${prefixCls}-tab-prev, .${prefixCls}-tab-next {
                            top: 50%;
                            margin-top: -10px;
                        }
                        .${prefixCls}-tab-prev-icon:before {
                            content: '\\2039';
                        }
                        .${prefixCls}-tab-next-icon:before {
                            content: '\\203A';
                        }
                    }
                `}
            ${(tabBarPosition === 'left' || tabBarPosition === 'right') &&
                css`
                    .${prefixCls}-left-bar, .${prefixCls}-right-bar {
                        .${prefixCls}-nav-scroll {
                            height: 100%;
                        }
                        .${prefixCls}-nav-container-scrolling {
                            padding: 20px 0;
                        }
                        .${prefixCls}-tab-prev {
                            top: 0;
                        }
                        .${prefixCls}-tab-next {
                            bottom: 0;
                        }
                        .${prefixCls}-tab-prev, .${prefixCls}-tab-next {
                            left: 50%;
                            margin-left: -10px;
                            transform: rotate(90deg);
                        }
                        .${prefixCls}-tab-prev-icon:before {
                            content: '\\2039';
                        }
                        .${prefixCls}-tab-next-icon:before {
                            content: '\\203A';
                        }
                    }
                `}
        }
        ${tabsTheme['&']};
    `
);

addDefaultThemeProps(TabsWrap);
