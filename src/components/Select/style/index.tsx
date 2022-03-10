import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Input, { InputProps } from 'src/components/Input';
import SvgIcon from 'src/components/SvgIcon';
import Menu from 'src/components/Menu';
import Button from 'src/components/Button';
import { inlineBlockWithVerticalMixin, sWrap } from 'src/style';
import config from 'src/config';
import InputWrap, { InputWrapProps } from 'src/sharedComponents/InputWrap';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-select';
export const selectorContentCls = prefixCls + '-content';
export const selectAllBtnWrapCls = prefixCls + '-select-all-btn-wrap';
export const selectInputCls = prefixCls + '-input';
export const overflowCls = prefixCls + '-overflow';
export const suffixCls = prefixCls + '-suffix';
export const measureCls = prefixCls + '-measure';
export const measureContentCls = prefixCls + '-measure-content';
export const placeholderCls = prefixCls + '-placeholder';
export const clearCls = prefixCls + '-clear';

export const SelectSearchInput = styled(Input.Search)`
    min-width: 100px;
    display: block;
    margin: 0 8px;
    margin-top: 10px;
`;

export const SSelector = styled(Button)`
    padding-right: 28px;
    width: 100%;
    min-width: 78px;
    justify-content: space-between;
    overflow: hidden;
    .${selectorContentCls} {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const SSelectorMultiple = sWrap<InputWrapProps & { empty?: boolean }>({})(
    styled(InputWrap)(props => {
        const {
            theme: { designTokens: DT },
            focused,
            disabled,
            empty
        } = props;

        return css`
            .${placeholderCls} {
                width: 0;
                overflow: visible;
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                text-indent: 0.3em;
                ${
                    focused &&
                    css`
                        opacity: 0.5;
                    `
                }
            }
            .${clearCls} {
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
                    :hover .${clearCls} {
                        opacity: 1;
                        cursor: pointer;
                    }
                `
            }

            ${
                !empty &&
                !disabled &&
                focused &&
                css`
                    .${clearCls} {
                        opacity: 1;
                        cursor: pointer;
                    }
                `
            }
            
            .${overflowCls} {
                display: flex;
                align-items: center;
                max-width: 100%;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                position: relative;
                .${overflowCls}-item {
                    position: relative;
                    cursor: default;
                    > * {
                        margin-right: 4px;
                    }
                    &:last-child {
                        padding-right: 0;
                    }
                }
            }
            .${overflowCls}-item-suffix {
                align-items: center;
                height: 100%;
                flex-shrink: 1;
                overflow: hidden;
            }
            .${measureCls} {
                position: relative;
                height: 100%;
                width: 100%;
                display: flex;
                overflow: hidden;
                max-width: 100%;
                .${suffixCls} {
                    width: 100%;
                    border: none;
                    outline: none;
                    background: none;
                    box-sizing: border-box;
                }
                .${measureContentCls} {
                    z-index: -1;
                    visibility: hidden;
                    overflow: hidden;
                    white-space: pre;
                    text-overflow: ellipsis;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 0;
                }
            }
        `;
    })
);

export const SSingleSelector = sWrap<InputProps & { cursor?: CSSProperties['cursor'] }>({})(
    styled(Input)(props => {
        let { cursor, disabled } = props;
        if (disabled) cursor = 'default';
        return css`
            cursor: ${cursor};
            input {
                cursor: ${cursor};
            }
            ${placeholderCls} {
                width: 0;
                overflow: visible;
            }
        `;
    })
);

export const Arrow = styled(SvgIcon)`
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -6px;
`;
export const OptionWrap = styled(Menu.Item)(props => {
    const { hidden } = props;

    return css`
        ${hidden &&
        css`
            display: none;
        `};
    `;
});
export const FooterWrap = sWrap({})(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            padding: 8px 0;
            box-shadow: ${DT.T_SHADOW_BLOCK_TOP_SM};
        `;
    })
);
export const ExtraWrap = styled('div')`
    margin: 0 8px;
`;
export const MenuWrap = sWrap({})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
            background: ${DT.T_COLOR_BG_MENU};
            border-radius: ${DT.T_CORNER_SM};
            display: inline-block;
            width: 100%;
            min-width: 78px;
            /* stylelint-disable selector-type-no-unknown */
            & > ${ExtraWrap}:last-child {
                margin-bottom: 10px;
            }
            /* stylelint-enable selector-type-no-unknown */
            .${selectAllBtnWrapCls} {
                padding: 8px;
            }
        `;
    })
);

// eslint-disable-next-line react/prop-types,no-unused-vars
const CustomMenu = React.forwardRef(function CustomMenu({ customStyle, menuCustomStyle, ...rest }: any, ref) {
    return <Menu customStyle={menuCustomStyle} {...rest} ref={ref} />;
});

export const BlockMenu = styled(CustomMenu)(props => {
    const { customStyle = {} } = props;
    const maxHeight = customStyle.optionListMaxHeight
        ? typeof customStyle.optionListMaxHeight === 'string'
            ? customStyle.optionListMaxHeight
            : customStyle.optionListMaxHeight + 'px'
        : '380px';

    return css`
        display: block;
        border: none;
        box-shadow: none;
        max-height: ${maxHeight};
        background: unset;
        ${customStyle.popupWidth
            ? css`
                  width: ${customStyle.popupWidth};
              `
            : null}
    `;
});

export const SelectWrap = sWrap<{ disabled?: boolean }>({})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            disabled
        } = props;

        return css`
            box-sizing: border-box;
            position: relative;
            max-width: 100%;
            min-width: 80px;
            width: 180px;

            ${inlineBlockWithVerticalMixin};
            font-size: ${DT.T_TYPO_FONT_SIZE_1};
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            ${disabled &&
            css`
                color: ${DT.T_COLOR_TEXT_DISABLED};
                pointer-events: none;
            `};
        `;
    })
);

export const EmptyContentWrapper = sWrap({})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            text-align: center;
            color: ${DT.T_COLOR_TEXT_REMARK_DARK};
        `;
    })
);

export const SRestList = sWrap({})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            width: 180px;
            max-height: 180px;
            overflow-y: auto;
            padding: 8px 12px;
            box-sizing: border-box;
            > div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 28px;
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                [data-role='label'] {
                    flex: 1;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                [data-role='close'] {
                    flex: 0 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    width: 20px;
                    height: 20px;
                }
            }
        `;
    })
);
