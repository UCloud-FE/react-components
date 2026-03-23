import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import { sWrap } from 'src/style';

const { prefixCls: _prefixCls } = config;
const componentName = 'cascade';

export const prefixCls = _prefixCls + '-' + componentName;
export const itemsCls = prefixCls + '-items';
export const itemWidthAutoCls = prefixCls + '-item-width-auto';
export const itemCls = prefixCls + '-item';
export const dividerCls = prefixCls + '-divider';
export const emptyCls = prefixCls + '-empty';
export const titleCls = prefixCls + '-title';
export const iconCls = prefixCls + '-icon';
export const errorCls = prefixCls + '-error';

const prefixAttr = 'data-' + componentName;
export const expandedAttr = prefixAttr + '-expanded';
export const selectedAttr = prefixAttr + '-selected';
export const valueAttr = prefixAttr + '-item-value';

export const SCascade = sWrap({})(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            display: flex;

            .${errorCls},
            .${emptyCls},
            .${itemsCls} {
                box-sizing: border-box;
                padding: 8px;
                width: 240px;
            }
            .${itemWidthAutoCls} {
                width: auto;
            }
            .${emptyCls} {
                line-height: 32px;
                color: ${DT.T_COLOR_TEXT_DISABLED};
                text-align: center;
            }
            .${itemsCls} {
                height: 180px;
                overflow: auto;
            }
            .${itemsCls} + .${itemsCls} {
                &::before {
                    content: ' ';
                    background: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                    display: block;
                }
            }
            .${itemCls} {
                box-sizing: border-box;
                line-height: 20px;
                padding: 8px;
                display: flex;
                cursor: pointer;
                align-items: center;
                justify-content: space-between;

                &[${expandedAttr}],
                &:hover:not([disabled]) {
                    background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
                }
                &[${selectedAttr}] {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
                &[disabled] {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    cursor: default;
                }
                .${titleCls} {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .${iconCls} {
                    flex-shrink: 0;
                }
            }
            .${dividerCls} {
                width: 1px;
                padding: 16px 0;
                background: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                background-clip: content-box;
            }
        `;
    })
);
