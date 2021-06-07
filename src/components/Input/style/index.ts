import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';
import { InputHTMLAttributes } from 'react';

import Icon from 'src/components/Icon';
import { getHeightBySize, inlineBlockWithVerticalMixin, sWrap } from 'src/style';
import config from 'src/config';
import { Override } from 'src/type';

import { InputProps } from '../Input';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-input';
export const focusedCls = prefixCls + '-focused';
export const disabledCls = prefixCls + '-disabled';
export const blockCls = prefixCls + '-block';
export const inputWrapCls = prefixCls + '-wrap';
export const inputPrefixCls = prefixCls + '-prefix';
export const inputSuffixCls = prefixCls + '-suffix';
export const clearCls = prefixCls + '-clear';

export const SearchIcon = styled(Icon)`
    cursor: pointer;
`;

export const SWrap = sWrap<
    Pick<Override<InputHTMLAttributes<HTMLInputElement>, InputProps>, 'disabled' | 'status' | 'customStyle'> &
        Required<Pick<InputProps, 'size'>> & {
            focused: boolean;
            empty: boolean;
        },
    HTMLSpanElement
>({
    className: ({ focused, disabled }) => classnames(prefixCls, focused && focusedCls, disabled && disabledCls)
})(
    styled.span(props => {
        const {
            theme: { designTokens: DT },
            disabled,
            size,
            focused,
            status,
            customStyle,
            empty
        } = props;
        const height = getHeightBySize(DT, size);

        return css`
            position: relative;
            box-sizing: border-box;
            font-size: 12px;
            border-radius: ${DT.T_CORNER_SM};
            height: ${height};
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            fill: currentColor;
            border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
            box-shadow: ${DT.T_SHADOW_INSET_DEFAULT};
            background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
            transition: .18s cubic-bezier(.4,0,.2,1);
            ${inlineBlockWithVerticalMixin};

            :hover {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
            }

            .${clearCls} {
                height: 100%;
                align-items: center;
                display: flex;
                fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
                opacity: 0;
                transition: opacity 0.3s;
            }
            .${inputWrapCls}, .${inputPrefixCls}, .${inputSuffixCls}, .${clearCls}, input {
                padding: 0 4px;
            }

            &.${blockCls} {
                display: block;
            }

            .${inputWrapCls} {
                height: 100%;
                display: flex;
                align-items: center;
            }
            .${inputPrefixCls}, .${inputSuffixCls} {
                display: flex;
                height: 100%;
                align-items: center;
            }

            input {
                box-sizing: border-box;
                height: 100%;
                margin: 0;
                font-size: inherit;
                color: inherit;
                flex: 1 1 130px;
                min-width: 0px;
                &,
                &:hover,
                &:focus {
                    border: none;
                    outline: none;
                    background: none;
                }
                &::placeholder {
                    opacity: 1;
                    color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                }
            }
            ${
                !empty &&
                css`
                    :hover,
                    &.${focusedCls} {
                        .${clearCls} {
                            opacity: 1;
                            cursor: pointer;
                        }
                    }
                `
            }

            ${
                focused &&
                !disabled &&
                css`
                    && {
                        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                        border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                        background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    }
                `
            };



            ${
                status === 'error' &&
                css`
                    &&& {
                        box-shadow: ${DT.T_SHADOW_INSET_ERROR};
                        border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
                        background: ${DT.T_COLOR_BG_ERROR_LIGHT};
                    }
                `
            };

            ${
                disabled &&
                css`
                    box-shadow: none;
                    &,
                    &:hover {
                        color: ${DT.T_COLOR_TEXT_DISABLED};
                        /* fix disabled color in safari */
                        -webkit-text-fill-color: ${DT.T_COLOR_TEXT_DISABLED};
                        border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    }
                `
            };

            ${
                customStyle?.border &&
                css`
                    border: ${customStyle.border} !important;
                `
            }
            ${
                customStyle?.boxShadow &&
                css`
                    box-shadow: ${customStyle.boxShadow} !important;
                `
            }
            ${
                customStyle?.background &&
                css`
                    background: ${customStyle.background} !important;
                `
            }
        `;
    })
);
