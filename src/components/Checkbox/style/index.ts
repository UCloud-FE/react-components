import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import { inlineBlockWithVerticalMixin, sWrap, getHeightBySize, Theme } from 'src/style';
import { Size } from 'src/type';

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

interface CheckboxProps {
    size?: Size;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}

export const CheckboxWrap = sWrap<CheckboxProps>({})(
    styled.span(props => {
        const {
            theme: { designTokens: DT },
            size = 'md'
        } = props;

        return css`
            cursor: pointer;
            position: relative;
            white-space: nowrap;
            min-height: ${getHeightBySize(DT, size)};
            line-height: ${getHeightBySize(DT, size)};
            ${inlineBlockWithVerticalMixin};

            font-size: 0;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            > * {
                font-size: ${DT.T_TYPO_FONT_SIZE_1};
            }

            .${contentCls} {
                display: inline-block;
                vertical-align: middle;
                max-height: 100%;
                margin-left: 8px;
            }

            &.${disabledCls} {
                cursor: default;
                color: ${DT.T_COLOR_TEXT_DISABLED};
            }
            ${iconMixin(props)};
        `;
    })
);

export const SIconWrap = sWrap<CheckboxProps>({
    className: iconWrapCls
})(
    styled.span(props => {
        const {
            theme: { designTokens: DT },
            checked,
            indeterminate,
            disabled
        } = props;
        return css`
            &.${iconWrapCls} {
                display: inline-block;
                box-sizing: border-box;
                overflow: hidden;
                position: relative;
                width: 14px;
                height: 14px;
                border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                border-radius: 2px;
                vertical-align: middle;
            }

            .${iconCls} {
                visibility: hidden;
                opacity: 0;
                position: absolute;
                top: -1px;
                left: -1px;
            }

            ${
                (indeterminate || checked) &&
                css`
                    &.${iconWrapCls} {
                        border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                        background: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    }
                    .${iconCls} {
                        visibility: visible;
                        opacity: 1;
                        fill: ${DT.T_COLOR_TEXT_DEFAULT_NORMAL};
                    }
                `
            }

            ${
                disabled &&
                css`
                    &.${iconWrapCls} {
                        border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    }
                `
            }

            ${
                disabled &&
                (checked || indeterminate) &&
                css`
                    &.${iconWrapCls} {
                        background: none;
                    }
                    .${iconCls} {
                        fill: ${DT.T_COLOR_TEXT_DISABLED};
                    }
                `
            }
        `;
    })
);

export const iconMixin = (props: CheckboxProps & { theme: Theme }) => {
    const {
        theme: { designTokens: DT },
        disabled
    } = props;
    return (
        !disabled &&
        css`
            :hover {
                .${iconWrapCls} {
                    border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                }
            }
        `
    );
};

export const CheckboxGroupWrap = sWrap({
    className: groupCls
})(styled.div`
    .${prefixCls} {
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
`);
