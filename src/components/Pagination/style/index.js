import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin } from 'src/style';
import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;

export const prefixCls = _prefixCls + '-pagination';

export const PaginationWrap = styled.ul(
    ({ theme: { colorMap, colorList, fontSize, Height, HeightNumber } }) => css`
        color: ${colorMap.default.text};
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
                background-color: ${colorMap.default.background};
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

            &-item,
            &-prev,
            &-next {
                border: 1px solid ${colorMap.default.border};
            }
            &-item:hover,
            &-prev:hover,
            &-next:hover {
                border-color: ${colorMap.active.border};
                color: ${colorMap.active.text};
            }
            &-jump-prev:hover,
            &-jump-next:hover {
                color: ${colorMap.active.text};
            }

            &-item-active,
            &-item-active:hover {
                border-color: ${colorMap.active.border};
                color: ${colorMap.active.text};
                background-color: ${colorList.primary5};
                cursor: default;
            }
            &-disabled,
            &-disabled:hover {
                border-color: ${colorMap.disabled.border};
                background-color: ${colorMap.disabled.background};
                color: ${colorMap.disabled.text};
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
