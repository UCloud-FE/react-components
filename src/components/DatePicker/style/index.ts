import classnames from 'classnames';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Select from 'src/components/Select';
import { tableCls } from 'src/components/Calendar/style';
import { timePrefixCls } from 'src/components/TimePicker/style';
import { prefixCls as inputPrefixCls, focusedCls as inputFocusedCls } from 'src/components/Input/style';
import { InputProps } from 'src/components/Input';
import { inlineBlockWithVerticalMixin, Theme, sWrap, getHeightBySize, Size } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-datepicker';
export const dateSeparatorCls = prefixCls + '-date-separator';
export const shortcutCls = prefixCls + '-shortcut';
export const footerCls = prefixCls + '-footer';
export const readonlyInputCls = prefixCls + '-input-readonly';
export const tipCls = prefixCls + '-tip';
export const errorTipCls = tipCls + '-error';
export const tipIconCls = tipCls + '-icon';

export const PickerContainer = sWrap<
    { disabled?: boolean; isMonth?: boolean; hasTime?: boolean; status?: InputProps['status'] },
    HTMLDivElement
>({
    className: ({ disabled, isMonth }) =>
        classnames(prefixCls, isMonth && `${prefixCls}-month`, disabled && `${prefixCls}-disabled`)
})(
    styled('div')(({ hasTime, disabled, status, theme: { designTokens: DT } }) => {
        return css`
            ${inlineBlockWithVerticalMixin};
            width: ${hasTime ? 180 : 140}px;
            .${inputPrefixCls} {
                input {
                    height: 20px;
                    margin: 0 4px;
                    will-change: background;
                    transition: background 0.2s;
                }
            }
            ${!disabled &&
            css`
                :hover {
                    .${inputPrefixCls} {
                        input {
                            background: ${status === 'error'
                                ? DT.T_INPUT_COLOR_BG_HL_ERROR
                                : DT.T_INPUT_COLOR_BG_HL_DEFAULT};
                        }
                    }
                }
                .${inputPrefixCls}.${inputFocusedCls} {
                    input {
                        background: ${status === 'error'
                            ? DT.T_INPUT_COLOR_BG_HL_ERROR
                            : DT.T_INPUT_COLOR_BG_HL_DEFAULT};
                    }
                }
            `}
        `;
    })
);

export const SPopup = sWrap({})(
    styled('div')((props: { theme: Theme }) => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
            background: ${DT.T_COLOR_BG_DEFAULT_DARK};
            border-radius: 2px;
            .${footerCls} {
                &:empty {
                    display: none;
                }
                padding: 12px;
                .${shortcutCls} {
                    cursor: pointer;
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            }
            .${tableCls} {
                width: 282px;
                min-height: 232px;
            }
            .${timePrefixCls} {
                background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
                padding: 0 0 0 16px;
                border-left: 1px solid ${DT.T_COLOR_BG_DEFAULT_DARK};
            }
            .${tipCls}, .${errorTipCls} {
                line-height: 20px;
                background: ${DT.T_COLOR_BG_DEFAULT_DARK};
                padding: 12px 16px;
                display: flex;
                align-items: center;
                .${tipIconCls} {
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                }
            }
            .${tipCls} {
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                .${tipIconCls} {
                    fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            }
            .${errorTipCls} {
                color: ${DT.T_COLOR_TEXT_ERROR};
                .${tipIconCls} {
                    fill: ${DT.T_COLOR_TEXT_ERROR};
                }
            }
        `;
    })
);

export const SRangeInputWrap = sWrap<{
    size: Size;
    focused: boolean;
    disabled?: boolean;
    readonly?: boolean;
    status?: string;
}>({})(
    styled.span(props => {
        const {
            theme: { designTokens: DT },
            focused,
            disabled,
            size,
            readonly,
            status
        } = props;
        const height = getHeightBySize(DT, size);
        return css`
            display: inline-flex;
            height: ${height};
            align-items: center;
            box-sizing: border-box;
            ${
                !readonly &&
                css`
                    border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                    border-radius: ${DT.T_CORNER_SM};
                    box-shadow: ${DT.T_SHADOW_INSET_DEFAULT};
                    background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
                    :hover {
                        border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                        background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
                    }
                    ${focused &&
                    !disabled &&
                    css`
                        && {
                            border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                            background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                        }
                    `};
                    ${disabled &&
                    css`
                        box-shadow: none;
                        &,
                        &:hover {
                            border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                        }
                    `};
                    ${status === 'error' &&
                    css`
                        &&& {
                            box-shadow: ${DT.T_SHADOW_INSET_ERROR};
                            border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
                            background: ${DT.T_COLOR_BG_ERROR_LIGHT};
                        }
                    `};
                `
            }
            .${inputPrefixCls} {
                flex-grow: 1;
            }
            .${readonlyInputCls} {
                padding: 0 8px
            }
        `;
    })
);

export const RangeContainer = sWrap<{ disabled?: boolean }>({
    className: ({ disabled }) => classnames(`${prefixCls}-range`, disabled && `${prefixCls}-range-disabled`)
})(
    styled('div')`
        display: inline-flex;
        align-items: center;
    `
);

export const RangeInputWrap = sWrap<{
    isMonth?: boolean;
    hasTime?: boolean;
    hasPrefix?: boolean;
    hasSuffix?: boolean;
    disabled?: boolean;
    status?: InputProps['status'];
}>()(
    styled.div(({ isMonth, hasTime, hasPrefix, hasSuffix, disabled, status, theme: { designTokens: DT } }) => {
        return css`
            width: ${(isMonth ? 69 : hasTime ? 145 : 106) + (hasPrefix ? 20 : 0) + (hasSuffix ? 28 : 0)}px;
            .${inputPrefixCls} {
                input {
                    height: 20px;
                    margin: 0 4px;
                    will-change: background;
                    transition: background 0.2s;
                }
            }
            ${!disabled &&
            css`
                :hover {
                    .${inputPrefixCls} {
                        input {
                            background: ${status === 'error'
                                ? DT.T_INPUT_COLOR_BG_HL_ERROR
                                : DT.T_INPUT_COLOR_BG_HL_DEFAULT};
                        }
                    }
                }
                .${inputPrefixCls}.${inputFocusedCls} {
                    input {
                        background: ${status === 'error'
                            ? DT.T_INPUT_COLOR_BG_HL_ERROR
                            : DT.T_INPUT_COLOR_BG_HL_DEFAULT};
                    }
                }
            `}
        `;
    })
);

export const RangeSelect = styled(Select)`
    margin-right: 8px;
`;

export const RangeDateSeparator = sWrap({
    className: dateSeparatorCls
})(
    styled('span')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            margin: 0 4px;
            width: 12px;
            height: 1px;
            background: ${DT.T_COLOR_LINE_DEFAULT_DARK};
            pointer-events: none;

            ${inlineBlockWithVerticalMixin};
        `;
    })
);
