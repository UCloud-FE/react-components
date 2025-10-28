import React, { CSSProperties, ReactNode, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import SvgIcon from 'src/components/SvgIcon';
import {
    execSizeCal,
    getControlFontSizeBySize,
    getControlHeightBySize,
    getControlSpacingBySize,
    sWrap
} from 'src/style';
import config from 'src/config';
import Icon from 'src/components/Icon';
import deprecatedLog from 'src/utils/deprecatedLog';

import { InputProps } from '../Input';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-input';
export const focusedCls = prefixCls + '-focused';
export const disabledCls = prefixCls + '-disabled';
export const blockCls = prefixCls + '-block';
export const inputPrefixCls = prefixCls + '-prefix';
export const inputSuffixCls = prefixCls + '-suffix';
export const clearCls = prefixCls + '-clear';
export const inputBlockWrapCls = prefixCls + '-block-wrap';

export const SearchIcon = styled(SvgIcon)`
    cursor: pointer;
`;

const deprecatedLogForIcon = deprecatedLog('Input icon', 'suffix');
export const Prefix = React.memo(function Prefix({ children }: { children?: ReactNode }) {
    return children ? <span className={inputPrefixCls}>{children}</span> : null;
});
export const Suffix = React.memo(function Suffix({
    icon,
    children
}: {
    icon?: string | ReactNode;
    children?: ReactNode;
}) {
    if (icon) {
        deprecatedLogForIcon();
    }
    let suffix = null;
    if (children) {
        suffix = children;
    } else if (typeof icon === 'string') {
        suffix = <Icon type={icon} />;
    } else if (React.isValidElement(icon)) {
        suffix = icon;
    }
    if (suffix) {
        return <span className={inputSuffixCls}>{suffix}</span>;
    }
    return null;
});
export const Clear = React.memo(function Clear({
    clearable,
    ...rest
}: Pick<InputProps, 'clearable'> & HTMLAttributes<HTMLSpanElement>) {
    if (clearable) {
        return (
            <span {...rest} className={clearCls}>
                <SvgIcon type="cross-circle-filled" />
            </span>
        );
    }
    return null;
});

export const InputPart = styled.span<{ stretch?: boolean; visible?: boolean }>(props => {
    const { stretch, visible } = props;
    return css`
        &&& {
            flex: ${stretch ? '1 1 auto' : '0 0 auto'};
            visibility: ${visible === false ? 'hidden' : 'visible'};
        }
    `;
});

export type InputWrapProps = Pick<InputProps, 'block' | 'disabled' | 'status' | 'customStyle'> &
    Required<Pick<InputProps, 'size'>> & {
        focused?: boolean;
        empty?: boolean;
        cursor?: CSSProperties['cursor'];
    };

export const InputWrap = sWrap<InputWrapProps, HTMLSpanElement>({
    className: ({ focused, disabled, block }) =>
        classnames(prefixCls, focused && focusedCls, disabled && disabledCls, block && blockCls)
})(
    styled.span(props => {
        const {
            theme: { designTokens: DT },
            disabled,
            size,
            focused,
            status,
            customStyle,
            empty,
            cursor
        } = props;
        const height = getControlHeightBySize(DT, size);
        const fontSize = getControlFontSizeBySize(DT, size);
        const spacing = getControlSpacingBySize(DT, size);
        const halfSpacing = execSizeCal(spacing, '/2');

        return css`
            position: relative;
            box-sizing: border-box;
            height: ${height};
            max-width: 100%;
            font-size: ${fontSize};
            border-radius: ${DT.T_CORNER_SM};
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            fill: currentColor;
            border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
            box-shadow: ${DT.T_INPUT_COLOR_SHADOW_DEFAULT};
            background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
            transition: .18s cubic-bezier(.4,0,.2,1);
            cursor: ${cursor};
            display:  inline-flex;
            vertical-align: middle;
            align-items: center;

            :hover {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
            }

            .${clearCls} {
                height: 100%;
                align-items: center;
                display: flex;
                color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                fill: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                opacity: 0;
                transition: opacity 0.3s, color 0.1s, fill 0.1s;
                &:hover {
                    color: ${DT.T_COLOR_TEXT_REMARK_DARK};
                    fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
                }
            }
            &, .${inputPrefixCls}, .${inputSuffixCls}, .${clearCls}, input, ${InputPart} {
                padding: 0 ${halfSpacing};
            }

            &.${blockCls} {
                display: flex;
            }

            .${inputPrefixCls}, .${inputSuffixCls}, ${InputPart} {
                display: inline-flex;
                height: 100%;
                align-items: center;
                flex: 0 0 auto;
            }
            ${InputPart}[hidden] {
                display: none;
            }
            .${inputBlockWrapCls} {
                height: ${{ sm: 16, md: 18, lg: 20 }[size]}px;
                display: flex;
                align-items: center;
                flex: 1;
                min-width: 0px;
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
                &::-ms-clear {
                    display: none;
                }
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
                        box-shadow: ${DT.T_INPUT_COLOR_SHADOW_ERROR};
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
