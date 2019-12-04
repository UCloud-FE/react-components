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
})`
    color: #c3cad9;
    margin: 0 4px;

    ${inlineBlockWithVerticalMixin};
`;

const Handler = styled.span.attrs({
    className: ({ disabled }) =>
        classnames({
            [`${prefixCls}-handler`]: true,
            [`${prefixCls}-handler-disabled`]: disabled
        })
})(
    ({ disabled, theme: { colorMap } }) => css`
        position: absolute;
        box-sizing: border-box;
        text-align: center;
        border-radius: 2px;
        border-style: solid;
        color: inherit;
        cursor: pointer;
        background: #fff;
        box-shadow: 0 2px 4px 0 #e4e5f2, 0 1px 1px 0 rgba(162, 166, 191, 0.32), 0 1px 0 0 rgba(223, 224, 241, 0.7);
        ${inlineBlockWithVerticalMixin};

        border-color: ${colorMap.default.border};

        ${disabled &&
            css`
                cursor: not-allowed;
                pointer-events: none;
                color: ${colorMap.disabled.text};
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
    theme: { colorList, colorMap, Height, HeightNumber, materialVars = {} },
    styleType,
    focused,
    size,
    hideHandler,
    disabled
}) => css`
    color: ${colorMap.default.text};
    height: ${Height[size]};

    ${disabled &&
        css`
            pointer-events: none;
            color: ${colorMap.disabled.text};
            -webkit-text-fill-color: currentcolor;
        `};

    ${Input} {
        line-height: ${HeightNumber[size] - 2}px;
        height: ${HeightNumber[size] - 2}px;

        ${inlineBlockWithVerticalMixin};

        ${({ disabled }) =>
            disabled &&
            css`
                background: ${colorMap.disabled.background};
            `};

        &::placeholder {
            color: ${colorList.placeholder};
        }
    }

    ${styleType === 'default' &&
        css`
            border: 1px solid #dfe0f1;
            padding-right: ${HeightNumber[size] - 6}px;
            border-right-width: 0;
            transition: ${materialVars.transitiondown};

            &:hover {
                border-color: #c3cad9;
            }

            ${InputWrap} {
                box-shadow: ${materialVars.innerShadow};
                background: #fafafc;
                :hover {
                    background: #f6f6fb;
                }
            }
            ${focused &&
                css`
                    &,
                    &:hover {
                        border-color: ${colorMap.active.border};
                    }
                    ${InputWrap} {
                        background: #f6f6fb;
                    }
                `};

            ${disabled &&
                css`
                    border-color: ${colorMap.disabled.border};
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
                    color: ${colorMap.active.icon};
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
                border-top-color: #e8e9f5;
            }

            ${hideHandler &&
                css`
                    padding-right: 0;
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
                border: 1px solid ${colorMap.default.border};
                margin: 0 -1px 0 -1px;
                box-shadow: ${materialVars.innerShadow};
                background: #fafafc;
                border-color: #dfe0f1;
                transition: ${materialVars.transitionDown};
                margin: 0;
                &:hover {
                    border-color: #c3cad9;
                    z-index: 1;
                    background: #f6f6fb;
                }
                ${focused &&
                    css`
                        border-color: ${colorMap.active.border};
                    `};
                ${disabled &&
                    css`
                        border-color: ${colorMap.disabled.border};
                    `};
            }
            ${HandlerUp}, ${HandlerDown} {
                text-align: center;
                top: 0;
                height: ${Height[size]};
                width: ${Height[size]};
                line-height: ${HeightNumber[size] - 2}px;
                border-color: transparent;

                &:hover {
                    color: ${colorMap.active.icon};
                    z-index: 1;
                }
            }
            ${HandlerUp} {
                right: 0;
                border-width: 1px;
            }
            ${HandlerDown} {
                left: 0;
                border-width: 1px;
            }
            ${focused &&
                css`
                    ${InputWrap}, ${InputWrap}:hover {
                        background-color: #f6f6fb;
                        border-color: ${colorMap.active.border};
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
                border: 1px solid #dfe0f1;
                margin: 0 4px;

                width: ${HeightNumber[size] - 2}px;
                box-shadow: ${materialVars.innerShadow};
                transition: ${materialVars.transitionDown};
                background: #fafafc;

                &:hover {
                    z-index: 1;
                    background: #f6f6fb;
                    border-color: #c3cad9;
                }
                ${focused &&
                    css`
                        &,
                        &:hover {
                            background: #f6f6fb;
                            border-color: ${colorMap.active.border};
                        }
                    `};
                ${disabled &&
                    css`
                        border-color: ${colorMap.disabled.border};
                        box-shadow: none;
                    `};
            }
            ${HandlerUp}, ${HandlerDown} {
                text-align: center;
                top: 0;
                height: ${Height[size]};
                width: ${Height[size]};
                line-height: ${HeightNumber[size] - 2}px;
                border-color: transparent;
                &:hover {
                    color: ${colorMap.active.icon};
                    z-index: 1;
                }
            }
            ${HandlerUp} {
                right: 0;
                border-width: 1px;
            }
            ${HandlerDown} {
                left: 0;
                border-width: 1px;
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
    ${({ theme: { NumberInput: numberInputTheme = {} } }) => numberInputTheme['&']};
`;
addDefaultThemeProps(NumberInputWrap, Handler);
