import classnames from 'classnames';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Icon from 'src/components/Icon';
import Select from 'src/components/Select';
import { tableCls } from 'src/components/Calendar/style';
import { timePrefixCls } from 'src/components/TimePicker/style';
import { prefixCls as inputPrefixCls } from 'src/components/Input/style';
import { inlineBlockWithVerticalMixin, Theme, sWrap, getHeightBySize, Size } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-datepicker';
export const pickerPrefixCls = prefixCls + '–picker';
export const monthPickerPrefixCls = prefixCls + '-month-picker';
export const dataWrapCls = prefixCls + '-data-wrap';
export const dateSeparatorCls = prefixCls + '-data-separator';
export const shortcutCls = prefixCls + '-shortcut';
export const footerCls = prefixCls + '-footer';
export const readonlyInputCls = prefixCls + '-input-readonly';

export const PickerContainer = sWrap<{ disabled: boolean; isMonth: boolean }, HTMLDivElement>({
    className: ({ disabled, isMonth }) =>
        classnames(prefixCls, isMonth && `${prefixCls}-month`, disabled && `${prefixCls}-disabled`)
})(styled('div')(inlineBlockWithVerticalMixin));

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
                padding: 12px;
                .${shortcutCls} {
                    cursor: pointer;
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            }
            .${tableCls} {
                width: 296px;
                min-height: 288px;
            }
            .${timePrefixCls} {
                background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
                padding: 0 8px;
                border-left: 1px solid ${DT.T_COLOR_BG_DEFAULT_DARK};
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
                flex: 1;
                height: 100%;
            }
            .${readonlyInputCls} {
                min-width: 100px;
                padding: 0 8px
            }
        `;
    })
);

export const PickerIcon = styled(Icon)`
    margin-left: 5px;
    display: inline-block;
`;

export const RangeContainer = sWrap<{ disabled?: boolean }>({
    className: ({ disabled }) => classnames(`${prefixCls}-range`, disabled && `${prefixCls}-range-disabled`)
})(
    styled('div')`
        display: inline-flex;
        align-items: center;
    `
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
