import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin } from 'src/style';
import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;

export const prefixCls = _prefixCls + '-pagination';

export const PaginationWrap = styled.ul(
    ({ theme: { designTokens: DT, fontSize, Height, HeightNumber } }) => css`
        font-size: ${fontSize};
        user-select: none;
        ${inlineBlockWithVerticalMixin};

        .${prefixCls} {
            &-item,
            &-prev,
            &-next,
            &-jump-prev,
            &-jump-next {
                outline: none;
                box-sizing: border-box;
                text-align: center;
                border-radius: 2px;
                cursor: pointer;
                padding: 0 2px;
            }
            &-item,
            &-prev,
            &-next,
            &-jump-prev,
            &-jump-next,
            &-total {
                margin-right: 5px;

                ${inlineBlockWithVerticalMixin};
                ${({ size }) => css`
                    min-width: ${Height[size]};
                    height: ${Height[size]};
                    line-height: ${HeightNumber[size] - 2}px;
                `};
            }

            &-item {
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
            }
            &-item:hover {
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                border: 1px solid ${DT.T_COLOR_LINE_PRIMARY_HOVER};
                background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
            }
            &-prev,
            &-next {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
                background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
            }
            &-prev:hover,
            &-next:hover {
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
            }

            &-jump-prev,
            &-jump-next {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            }
            &-jump-prev:hover,
            &-jump-next:hover {
                color: ${DT.T_COLOR_TEXT_PRIMARY_HOVER};
            }

            &-item-active,
            &-item-active:hover {
                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
                background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
                cursor: default;
            }
            &-disabled,
            &-disabled:hover {
                color: ${DT.T_COLOR_TEXT_DISABLED};
                border: 1px solid ${DT.T_COLOR_LINE_DISABLED_DARK};
                box-shadow: none;
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                cursor: not-allowed;
            }

            &-prev-icon,
            &-next-icon {
                cursor: inherit;
            }

            &-options {
                &,
                &-size-changer,
                &-quick-jumper {
                    display: inline-block;
                    vertical-align: middle;
                }
                &-size-changer {
                    margin-right: 5px;
                }
                &-gobutton {
                    margin-left: 5px;
                }
            }
        }
    `
);
addDefaultThemeProps(PaginationWrap);
