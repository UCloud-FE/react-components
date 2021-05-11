import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { inlineBlockWithVerticalMixin } from 'src/style';
import Icon from 'src/components/Icon';
import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-input';
export const blockCls = prefixCls + '-block';
export const inputWrapCls = prefixCls + '-wrap';
export const inputPrefixCls = prefixCls + '-prefix';
export const inputSuffixCls = prefixCls + '-suffix';

export const SearchIcon = styled(Icon)`
    cursor: pointer;
`;

export const InputWrap = withProps({
    className: prefixCls
})(
    styled('span')(props => {
        const {
            theme: { designTokens: DT, Height, materialVars },
            disabled,
            size,
            focused,
            status,
            customStyle
        } = props;
        return css`
            position: relative;
            box-sizing: border-box;
            font-size: 12px;
            border-radius: ${DT.T_CORNER_SM};
            height: ${Height[size]};
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
            box-shadow: ${DT.T_SHADOW_INSET_DEFAULT};
            background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
            transition: ${materialVars.transitionDown};
            ${inlineBlockWithVerticalMixin};

            :hover {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
            }

            .${inputWrapCls}, .${inputPrefixCls}, .${inputSuffixCls}, input {
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
                        -webkit-text-fill-color: currentcolor;
                        border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    }
                    .${inputSuffixCls}, .${inputPrefixCls} {
                        color: inherit;
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
