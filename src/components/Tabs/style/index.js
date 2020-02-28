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
    ({ theme: { designTokens: DT }, tabBarPosition, styleType, size }) => css`
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
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                border: 1px solid transparent;
                border-radius: 2px 2px 0 0;
                box-sizing: border-box;
                cursor: pointer;
                ${css`
                    padding: ${{
                        sm: '6px 10px',
                        md: '8px 16px',
                        lg: '8px 16px'
                    }[size]};
                    line-height: ${{
                        sm: '18px',
                        md: '20px',
                        lg: '22px'
                    }[size]};
                    font-size: ${{
                        sm: '12px',
                        md: '14px',
                        lg: '16px'
                    }[size]};
                    font-weight: ${{
                        sm: 'normal',
                        md: 'normal',
                        lg: 'bold'
                    }[size]};
                `}
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
                color: ${DT.T_COLOR_TEXT_DISABLED};
            }

            &-tab-prev.${prefixCls}-tab-arrow-show, &-tab-next.${prefixCls}-tab-arrow-show {
                display: inline-block;
            }

            &-tab-disabled,
            &-tab-disabled:hover {
                cursor: not-allowed;
                color: ${DT.T_COLOR_TEXT_DISABLED};
            }

            &-styletype-default-bar {
                .${prefixCls} {
                    &-ink-bar {
                        display: none !important;
                    }
                    &-tab:hover {
                        background: ${DT.T_TABS_DEFAULT_COLOR_BG_HOVER};
                        border-color: ${DT.T_TABS_DEFAULT_COLOR_LINE_HOVER};
                    }
                    &-tab-disabled:hover {
                        background: unset;
                        border-color: transparent;
                    }
                    &-tab-active,
                    &-tab-active:hover {
                        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                        border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                        background: ${DT.T_TABS_DEFAULT_COLOR_BG_DEFAULT};
                    }
                }
            }

            &-styletype-ink-bar {
                .${prefixCls} {
                    &-ink-bar {
                        width: 2px;
                        height: 2px;
                        position: absolute;
                        transition: transform 0.3s;
                        background: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                    }
                    &-tab {
                        border: 1px solid transparent !important;
                    }
                    &-tab:hover {
                        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    }
                    &-tab-disabled:hover {
                        color: ${DT.T_COLOR_TEXT_DISABLED};
                    }
                    &-tab-active,
                    &-tab-active:hover {
                        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    }
                }
            }
        }

        &.${prefixCls} {
            ${tabBarPosition === 'top' &&
                css`
                    .${prefixCls}-top-bar {
                        border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                        .${prefixCls} {
                            &-nav-container {
                                bottom: -1px;
                            }
                            &-tab {
                                display: inline-block;

                                &:hover {
                                    border-bottom-color: ${DT.T_TABS_DEFAULT_COLOR_BG_HOVER};
                                }
                                &-disabled:hover {
                                    border-bottom-color: transparent;
                                }
                                &-active,
                                &-active:hover {
                                    border-bottom-color: ${DT.T_TABS_DEFAULT_COLOR_BG_DEFAULT};
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
                        border-top: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                        .${prefixCls} {
                            &-nav-container {
                                top: -1px;
                            }
                            &-tab {
                                display: inline-block;

                                &:hover {
                                    border-top-color: ${DT.T_TABS_DEFAULT_COLOR_BG_HOVER};
                                }
                                &-disabled:hover {
                                    border-top-color: transparent;
                                }
                                &-active,
                                &-active:hover {
                                    border-top-color: ${DT.T_TABS_DEFAULT_COLOR_BG_DEFAULT};
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
                        border-right: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                        float: left;
                        height: 100%;
                        .${prefixCls} {
                            &-nav-container {
                                right: -1px;
                            }
                            &-tab {
                                &:hover {
                                    border-right-color: ${DT.T_TABS_DEFAULT_COLOR_BG_HOVER};
                                }
                                &-disabled:hover {
                                    border-right-color: transparent;
                                }
                                &-active,
                                &-active:hover {
                                    border-right-color: ${DT.T_TABS_DEFAULT_COLOR_BG_DEFAULT};
                                }
                                text-align: right;
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
                        border-left: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                        float: right;
                        height: 100%;
                        .${prefixCls} {
                            &-nav-container {
                                left: -1px;
                            }
                            &-tab {
                                &:hover {
                                    border-left-color: ${DT.T_TABS_DEFAULT_COLOR_BG_HOVER};
                                }
                                &-disabled:hover {
                                    border-left-color: transparent;
                                }
                                &-active,
                                &-active:hover {
                                    border-left-color: ${DT.T_TABS_DEFAULT_COLOR_BG_DEFAULT};
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
        ${styleType === 'ink' &&
            css`
                .${prefixCls}-top-bar, .${prefixCls}-bottom-bar {
                    .${prefixCls}-tab+.${prefixCls}-tab {
                        margin-left: 12px;
                    }
                }
                .${prefixCls}-left-bar, .${prefixCls}-right-bar {
                    .${prefixCls}-tab+.${prefixCls}-tab {
                        margin-top: 8px;
                    }
                }
            `};
    `
);

addDefaultThemeProps(TabsWrap);
