import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import SvgIcon from 'src/components/SvgIcon';
import { sWrap } from 'src/style';
import config from 'src/config';
import InputWrap from 'src/sharedComponents/InputWrap';

import { InputProps } from '../Input';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-input';
export const focusedCls = prefixCls + '-focused';
export const disabledCls = prefixCls + '-disabled';
export const blockCls = prefixCls + '-block';
export const inputPrefixCls = prefixCls + '-prefix';
export const inputSuffixCls = prefixCls + '-suffix';
export const clearCls = prefixCls + '-clear';

export const SearchIcon = styled(SvgIcon)(props => {
    return css`
        cursor: ${props.disabled ? 'default' : 'pointer'};
    `;
});

export const SWrap = sWrap<
    Pick<InputProps, 'disabled' | 'status' | 'customStyle' | 'block'> &
        Required<Pick<InputProps, 'size'>> & {
            focused: boolean;
            empty: boolean;
        },
    HTMLSpanElement
>({
    className: ({ focused, disabled }) => classnames(prefixCls, focused && focusedCls, disabled && disabledCls)
})(
    styled(InputWrap)(props => {
        const {
            theme: { designTokens: DT },
            customStyle,
            empty,
            disabled
        } = props;

        return css`
            .${clearCls} {
                height: 100%;
                align-items: center;
                display: flex;
                color: ${DT.T_COLOR_TEXT_REMARK_DARK};
                fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
                opacity: 0;
                transition: opacity 0.3s;
            }

            ${
                !empty &&
                !disabled &&
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
