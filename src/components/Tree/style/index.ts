import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import { sWrap } from 'src/style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-tree';
export const singleCls = prefixCls + '-single';
export const multipleCls = prefixCls + '-multiple';
export const disabledCls = prefixCls + '-disabled';
export const itemCls = prefixCls + '-item';
export const selectedCls = prefixCls + '-selected';
export const expandCls = prefixCls + '-expand-icon';
export const contentCls = prefixCls + '-content';
export const indentCls = prefixCls + '-indent';
export const outerIndentCls = prefixCls + '-indent-outer';
export const innerIndentCls = prefixCls + '-indent-inner';
export const wrapCls = prefixCls + '-wrap';
export const latestCls = prefixCls + '-latest';
export const expandedCls = prefixCls + '-expanded';
export const expandPlaceholderCls = prefixCls + '-expand-ph';
export const loadingIconCls = prefixCls + '-loading-icon';

export const STree = sWrap<{ disabled: boolean }, HTMLDivElement>({})(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            background: ${DT.T_COLOR_BG_TRANSPARENT};
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

            .${itemCls} {
                display: flex;
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                min-height: 36px;

                .${indentCls} {
                    width: 32px;
                    position: relative;
                    &.${innerIndentCls} {
                        ::after {
                            content: ' ';
                            box-sizing: border-box;
                            display: inline-block;
                            height: 100%;
                            width: 1px;
                            border-left: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                            margin-left: 50%;
                        }
                        &.${latestCls} {
                            ::after {
                                height: 50%;
                                width: 4px;
                                border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                            }
                        }
                    }
                }
                .${wrapCls} {
                    flex: 1;
                    padding: 0 8px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    :hover {
                        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                    }
                    .${contentCls} {
                        margin-left: 8px;
                    }
                }

                &.${disabledCls} {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    .${wrapCls} {
                        cursor: default;
                    }
                }
            }

            &.${singleCls} .${itemCls}.${selectedCls} {
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }

            .${expandPlaceholderCls}, .${expandCls}, .${loadingIconCls} {
                display: inline-block;
                width: 16px;
                height: 16px;
                line-height: 16px;
                margin-right: 8px;
            }
            .${loadingIconCls} {
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
            .${expandCls} {
                text-align: center;
                cursor: pointer;
                transition: transform 0.2s;
                position: relative;

                :before {
                    content: ' ';
                    display: inline-block;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 5px 0 5px 6px;
                    border-color: transparent transparent transparent ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                    position: absolute;
                    top: 3px;
                    left: 5px;
                }

                &.${disabledCls} {
                    cursor: default;
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    :before {
                        border-color: transparent transparent transparent ${DT.T_COLOR_TEXT_DISABLED};
                    }
                }
                &.${expandedCls} {
                    transform: rotate(90deg);
                }
            }
        `;
    })
);
