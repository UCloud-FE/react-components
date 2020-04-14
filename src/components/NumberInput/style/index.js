import styled, { css } from 'styled-components';
import classnames from 'classnames';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import { inlineBlockWithVerticalMixin } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;

export const prefixCls = _prefixCls + '-numberinput';

/* stylelint-disable no-duplicate-selectors, selector-type-no-unknown, no-descending-specificity */

export const InputWrap = styled.div.attrs({
    className: `${prefixCls}-input-wrap`
})`
    position: relative;
`;

export const Input = styled.input.attrs({
    className: `${prefixCls}-input`
})`
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    color: inherit;
`;

export const InputSuffix = styled.span.attrs({
    className: `${prefixCls}-suffix`
})(
    ({ theme: { designTokens: DT } }) => css`
        color: ${DT.T_COLOR_TEXT_REMARK_DARK};
        margin: 0 4px;

        ${inlineBlockWithVerticalMixin};
    `
);

const Handler = styled.span.attrs({
    className: ({ disabled }) =>
        classnames({
            [`${prefixCls}-handler`]: true,
            [`${prefixCls}-handler-disabled`]: disabled
        })
})(
    ({ disabled, theme: { designTokens: DT } }) => css`
        position: absolute;
        box-sizing: border-box;
        text-align: center;
        border-radius: ${DT.T_CORNER_SM};
        border-style: solid;
        cursor: pointer;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
        background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};

        ${inlineBlockWithVerticalMixin};

        :hover {
            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
        }

        ${disabled &&
            css`
                cursor: not-allowed;
                pointer-events: none;
                color: ${DT.T_COLOR_TEXT_DISABLED};
                border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
            `};
    `
);

export const HandlerUp = styled(Handler).attrs({
    className: `${prefixCls}-handler-up`
})`
    /* empty */
`;

export const HandlerDown = styled(Handler).attrs({
    className: `${prefixCls}-handler-down`
})`
    /* empty */
`;

const propsMixin = ({
    theme: { designTokens: DT, Height, HeightNumber, materialVars = {} },
    styleType,
    focused,
    size,
    hideHandler,
    disabled
}) => css`
    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
    height: ${Height[size]};

    ${disabled &&
        css`
            pointer-events: none;
            color: ${DT.T_COLOR_TEXT_DISABLED};
            -webkit-text-fill-color: currentcolor;
        `};

    ${Input} {
        line-height: ${HeightNumber[size] - 2}px;
        height: ${HeightNumber[size] - 2}px;

        ${inlineBlockWithVerticalMixin};

        ${({ disabled }) =>
            disabled &&
            css`
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            `};

        &::placeholder {
            opacity: 1;
            color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
        }
    }

    ${styleType === 'default' &&
        css`
            border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            padding-right: ${HeightNumber[size] - 6}px;
            border-right-width: 0;
            transition: ${materialVars.transitiondown};

            &:hover {
                border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
            }

            ${InputWrap} {
                box-shadow: ${DT.T_SHADOW_INSET_1};
                background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
                :hover {
                    background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                }
            }
            ${focused &&
                css`
                    &,
                    &:hover {
                        border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                    }
                    ${InputWrap} {
                        background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    }
                `};

            ${disabled &&
                css`
                    border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                    ${InputWrap} {
                        box-shadow: none;
                    }
                `};

            ${Input} {
                padding: 0 0 0 8px;
                text-align: left;
                box-shadow: none;
                background: transparent;

                width: ${HeightNumber[size] + 6}px;
            }

            ${HandlerUp}, ${HandlerDown} {
                right: 0;
                box-sizing: content-box;
                border-radius: 0;
                height: ${(+Height[size].replace('px', '') - 2) / 2}px;
                line-height: ${(+Height[size].replace('px', '') - 2) / 2}px;
                width: ${HeightNumber[size] - 6}px;

                &:hover {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            }

            ${HandlerUp} {
                border-width: 0 0 0 1px;
                top: -1px;
                padding-top: 1px;
            }
            ${HandlerDown} {
                border-width: 1px 0 0 1px;
                bottom: 0;
                border-top-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
            }

            ${hideHandler &&
                css`
                    padding-right: 0;
                    border-right-width: 1px;
                `};
        `};

    ${styleType === 'split' &&
        css`
            padding: 0 ${Height[size]};
            ${Input} {
                padding: 0 8px;
                text-align: left;
                box-shadow: none;
                background: transparent;

                width: ${HeightNumber[size] + 6}px;
            }
            ${InputWrap} {
                margin: 0 -1px 0 -1px;
                border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                box-shadow: ${DT.T_SHADOW_INSET_1};
                background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
                transition: ${materialVars.transitionDown};
                margin: 0;
                &:hover {
                    border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                    z-index: 1;
                    background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                }
                ${focused &&
                    css`
                        border-color: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    `};
                ${disabled &&
                    css`
                        border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                    `};
            }
            ${HandlerUp}, ${HandlerDown} {
                text-align: center;
                top: 0;
                height: ${Height[size]};
                width: ${Height[size]};
                line-height: ${Height[size]};
                border-color: transparent;

                &:hover {
                    color: ${DT.T_SHADOW_BUTTON_HOVER};
                    z-index: 1;
                }
            }
            ${HandlerUp} {
                right: 0;
            }
            ${HandlerDown} {
                left: 0;
            }
            ${focused &&
                css`
                    ${InputWrap}, ${InputWrap}:hover {
                        border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                        background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                    }
                `};
            ${disabled &&
                css`
                    box-shadow: none;
                `};
            ${hideHandler &&
                css`
                    padding: 0;
                `};
        `};

    ${styleType === 'pagination' &&
        css`
            padding: 0 ${Height[size]};
            ${Input} {
                text-align: center;
                margin: 0 4px;
                width: ${HeightNumber[size] - 2}px;
                border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                box-shadow: ${DT.T_SHADOW_INSET_1};
                background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
                transition: ${materialVars.transitionDown};

                &:hover {
                    z-index: 1;
                    border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                    background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                }
                ${focused &&
                    css`
                        &,
                        &:hover {
                            border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                            background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                        }
                    `};
                ${disabled &&
                    css`
                        border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                        box-shadow: none;
                        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    `};
            }
            ${HandlerUp}, ${HandlerDown} {
                text-align: center;
                top: 0;
                height: ${Height[size]};
                width: ${Height[size]};
                line-height: ${Height[size]};
                border-color: transparent;
                &:hover {
                    z-index: 1;
                }
            }
            ${HandlerUp} {
                right: 0;
            }
            ${HandlerDown} {
                left: 0;
            }
            ${InputSuffix} {
                margin-left: 0;
            }
            ${hideHandler &&
                css`
                    padding: 0;
                    margin: 0;

                    ${Input} {
                        margin: 0;
                    }
                    ${InputSuffix} {
                        margin-left: 4px;
                        margin-right: 0px;
                    }
                `};
        `};
`;

export const NumberInputWrap = styled.div.attrs({
    className: ({ styleType, focused, disabled }) =>
        classnames(
            prefixCls,
            `${prefixCls}-styletype-${styleType}`,
            focused && `${prefixCls}-focused`,
            disabled && `${prefixCls}-disabled`
        )
})`
    position: relative;
    box-sizing: border-box;
    border-radius: 2px;
    ${inlineBlockWithVerticalMixin};
    ${propsMixin};
`;
addDefaultThemeProps(NumberInputWrap, Handler, InputSuffix);
