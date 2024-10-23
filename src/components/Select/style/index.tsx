import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Input from 'src/components/Input';
import SvgIcon from 'src/components/SvgIcon';
import Menu from 'src/components/Menu';
import Button from 'src/components/Button';
import { InputWrap, InputWrapProps } from 'src/components/Input/style';
import { execSizeCal, getControlSpacingBySize, inlineBlockWithVerticalMixin, sWrap } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-select';
export const selectorContentCls = prefixCls + '-content';
export const selectAllBtnWrapCls = prefixCls + '-select-all-btn-wrap';
export const selectInputCls = prefixCls + '-input';
export const overflowCls = prefixCls + '-overflow';
export const staticCls = prefixCls + '-static';
export const measureWrapCls = prefixCls + '-measure-wrap';
export const measureCls = prefixCls + '-measure';
export const measureContentCls = prefixCls + '-measure-content';
export const placeholderCls = prefixCls + '-placeholder';
export const contentCls = prefixCls + '-content';
export const inputCls = prefixCls + '-input';
export const inputWrapCls = inputCls + '-wrap';
export const clearCls = prefixCls + '-clear';
export const restItemCls = prefixCls + '-rest-item';
export const listCls = prefixCls + '-list';

export const SelectSearchInput = styled(Input.Search)`
    min-width: 100px;
    margin: 0 8px;
    margin-top: 10px;
`;

export const SSelector = sWrap<InputWrapProps>({})(styled(Button)(props => {
    const {
        theme: { designTokens: DT },
        status,
    } = props;
    return css`
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
        `;
}));

export const SSelectorMultiple = sWrap<InputWrapProps>({})(
    styled(InputWrap)(props => {
        const {
            theme: { designTokens: DT },
            focused,
            disabled,
            empty,
            size,
            block,
            status
        } = props;

        const spacing = getControlSpacingBySize(DT, size);
        const halfSpacing = execSizeCal(spacing, '/2');

        let cursor = 'pointer';
        if (disabled) cursor = 'default';

        return css`
            cursor: ${cursor};
            ${
                !block &&
                css`
                    width: 200px;
                `
            }
            .${placeholderCls} {
                color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                text-indent: ${halfSpacing};
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                position: absolute;
                left: 0;
                right: 0;
                pointer-events: none;
            }
            .${contentCls} {
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }
            ${
                !focused &&
                css`
                    :hover {
                        .${contentCls} {
                            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                        }
                    }
                `
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
                    .${contentCls} {
                        color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                    }
                    .${clearCls} {
                        opacity: 1;
                        cursor: pointer;
                    }
                `
            }
            .${overflowCls}:not(.${staticCls}) {
                overflow: hidden;
                flex: 1 0;
            }
            .${overflowCls} {
                display: flex;
                align-items: center;
                max-width: 100%;
                white-space: nowrap;
                flex: 0;
                position: relative;
                padding: 0 ${halfSpacing};
                margin-right: -4px;
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
            .${measureWrapCls} {
                overflow: hidden;
                position: relative;
                padding: 0;
            }
            .${measureCls} {
                position: absolute;
                left: 0;
                right: 0;
                height: 0;
                overflow: hidden;
                display: flex;
                .${measureContentCls} {
                    flex-shrink: 0;
                    padding: 0 ${halfSpacing};
                    min-width: 30px;
                }
            }
            ${
                status === 'error' &&
                css`
                    &&& {
                        box-shadow: ${DT.T_SHADOW_INSET_ERROR};
                        border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
                        background: ${DT.T_COLOR_BG_ERROR_LIGHT};
                    }
                `
            }
        `;
    })
);

export const SSelectorSingle = sWrap<InputWrapProps & { search?: any }>({})(
    styled(InputWrap)(props => {
        const {
            theme: { designTokens: DT },
            disabled,
            empty,
            focused,
            search,
            status,
        } = props;
        
        let cursor = 'pointer';
        if (disabled) cursor = 'default';
        return css`
            cursor: ${cursor};
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            min-width: 80px;
            overflow: hidden;
            ${
                !disabled &&
                css`
                    :hover {
                        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    }
                `
            }
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
            .${inputWrapCls} {
                position: relative;
                overflow: hidden;
                :empty {
                    display: initial;
                }
            }
            .${inputCls} {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
            .${placeholderCls} {
                color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .${contentCls} {
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }
            ${
                !focused &&
                css`
                    :hover {
                        .${contentCls} {
                            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                        }
                    }
                `
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
            ${
                !empty &&
                !disabled &&
                focused &&
                search &&
                css`
                    .${contentCls} {
                        color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                    }
                `
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
export const MenuWrap = sWrap<{ maxWidth?: string }>({})(
    styled('div')(props => {
        const {
            maxWidth,
            theme: { designTokens: DT }
        } = props;

        return css`
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
            background: ${DT.T_COLOR_BG_MENU};
            border-radius: ${DT.T_CORNER_SM};
            display: inline-block;
            width: 100%;
            min-width: 78px;
            padding: 8px 0;
            ${
                maxWidth &&
                css`
                    max-width: ${maxWidth};
                `
            }
            /* stylelint-disable selector-type-no-unknown */
            & > ${ExtraWrap}:last-child {
                margin-bottom: 10px;
            }
            /* stylelint-enable selector-type-no-unknown */
            .${selectAllBtnWrapCls} {
                line-height: 32px;
                padding: 0 8px;
                margin: 0 8px;
                cursor: pointer;
                color: ${DT.T_COLOR_TEXT_REMARK_DARK};
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                :hover {
                    background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                }
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
        padding: 0;
        ${customStyle.popupWidth
            ? css`
                  width: ${customStyle.popupWidth};
              `
            : null}
    `;
});

export const SelectWrap = sWrap<{ disabled?: boolean; multiple?: boolean; block?: boolean }>({})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            disabled,
            block
        } = props;

        return css`
            box-sizing: border-box;
            position: relative;
            max-width: 100%;
            font-size: ${DT.T_TYPO_FONT_SIZE_1};
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            ${inlineBlockWithVerticalMixin};
            .${listCls} {
                display: block;
                width: 400px;
                max-height: 80px;
                overflow: auto;
                margin-top: 8px;
                cursor: default;
            }
            ${block &&
            css`
                display: block;
                .${listCls} {
                    width: auto;
                }
            `}
            ${disabled &&
            css`
                color: ${DT.T_COLOR_TEXT_DISABLED};
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
            color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
        `;
    })
);

export const SRestList = sWrap({})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            padding: 4px 0;
            cursor: default;
            .${restItemCls} {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 28px;
                padding: 0 8px 0 16px;
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
                    color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                    :hover {
                        color: ${DT.T_COLOR_TEXT_REMARK_DARK};
                    }
                }
            }
        `;
    })
);
