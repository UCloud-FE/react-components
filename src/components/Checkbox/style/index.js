import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { inlineBlockWithVerticalMixin } from 'src/style';
import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-checkbox';
export const cardCls = prefixCls + '-card';
export const iconCls = prefixCls + '-icon';
export const iconWrapCls = prefixCls + '-icon-wrap';
export const contentCls = prefixCls + '-content';
export const disabledCls = prefixCls + '-disabled';
export const checkedCls = prefixCls + '-checked';
export const indeterminateCls = prefixCls + '-indeterminate';
export const groupCls = prefixCls + '-group';

export const CheckboxWrap = withProps()(
    styled('span')(props => {
        const {
            theme: { designTokens: DT, Height },
            size
        } = props;

        return css`
            cursor: pointer;
            position: relative;
            white-space: nowrap;
            min-height: ${Height[size]};
            line-height: ${Height[size]};
            ${inlineBlockWithVerticalMixin};

            font-size: 0;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            > * {
                font-size: ${DT.T_TYPO_FONT_SIZE_1};
            }

            .${iconWrapCls} {
                display: inline-block;
                box-sizing: border-box;
                overflow: hidden;
                position: relative;
                width: 14px;
                height: 14px;
                border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                border-radius: 2px;
                vertical-align: middle;

                .${iconCls} {
                    visibility: hidden;
                    opacity: 0;
                    position: absolute;
                    top: -1px;
                    left: -1px;
                }
            }
            .${contentCls} {
                display: inline-block;
                vertical-align: middle;
                max-height: 100%;
                margin-left: 8px;
            }

            :hover {
                .${iconWrapCls} {
                    border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                }
            }

            &.${checkedCls}, &.${indeterminateCls} {
                .${iconWrapCls} {
                    border-color: ${DT.T_COLOR_BG_PRIMARY_1};
                    background: ${DT.T_COLOR_BG_PRIMARY_1};
                }
                .${iconCls} {
                    visibility: visible;
                    opacity: 1;
                    fill: ${DT.T_COLOR_TEXT_DEFAULT_NORMAL};
                }
            }

            &.${disabledCls} {
                cursor: default;
                color: ${DT.T_COLOR_TEXT_DISABLED};
                .${iconWrapCls} {
                    border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                }
            }

            &.${disabledCls}.${checkedCls}, &.${disabledCls}.${indeterminateCls} {
                .${iconCls} {
                    fill: ${DT.T_COLOR_TEXT_DISABLED};
                }
                .${iconWrapCls} {
                    background: none;
                }
            }
        `;
    })
);

export const CheckboxGroupWrap = withProps({
    className: groupCls
})(styled('div')`
    .${prefixCls} {
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
`);
