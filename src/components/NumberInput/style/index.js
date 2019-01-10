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
    theme: { colorList, colorMap, Height, HeightNumber },
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
        `};

    ${Input} {
        line-height: ${HeightNumber[size] - 2}px;

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
            border: 1px solid ${colorMap.default.border};
            padding-right: ${HeightNumber[size] - 6}px;

            &:hover {
                border-color: ${colorMap.active.border};
            }

            ${focused &&
                css`
                    border-color: ${colorMap.active.border};
                `};

            ${disabled &&
                css`
                    border-color: ${colorMap.disabled.border};
                `};

            ${Input} {
                padding: 0 0 0 8px;
                text-align: left;

                width: ${HeightNumber[size] + 6}px;
            }

            ${HandlerUp}, ${HandlerDown} {
                right: 0;

                height: ${(+Height[size].replace('px', '') - 2) / 2}px;
                line-height: ${(+Height[size].replace('px', '') - 2) / 2}px;
                width: ${HeightNumber[size] - 6}px;

                &:hover {
                    color: ${colorMap.active.icon};
                }
            }

            ${HandlerUp} {
                border-width: 0 0 0 1px;
                top: 0;
            }
            ${HandlerDown} {
                border-width: 1px 0 0 1px;
                bottom: 0;
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

                height: ${HeightNumber[size] - 2}px;
                width: ${HeightNumber[size] + 6}px;
            }
            ${InputWrap} {
                border: 1px solid ${colorMap.default.border};
                margin: 0 -1px 0 -1px;
                &:hover {
                    border-color: ${colorMap.active.border};
                    z-index: 1;
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

                &:hover {
                    color: ${colorMap.active.icon};
                    border-color: ${colorMap.active.border};
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
                border: 1px solid ${colorMap.default.border};
                margin: 0 4px;

                height: ${HeightNumber[size] - 2}px;
                width: ${HeightNumber[size] - 2}px;

                &:hover {
                    border-color: ${colorMap.active.border};
                    z-index: 1;
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
                &:hover {
                    color: ${colorMap.active.icon};
                    border-color: ${colorMap.active.border};
                    z-index: 1;
                }
                height: ${Height[size]};
                width: ${Height[size]};
                line-height: ${HeightNumber[size] - 2}px;
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
    className: ({ styleType, focused }) =>
        classnames(prefixCls, `${prefixCls}-styletype-${styleType}`, focused && `${prefixCls}-focused`)
})`
    position: relative;
    box-sizing: border-box;
    border-radius: 2px;
    ${inlineBlockWithVerticalMixin};
    ${propsMixin};
    ${({ theme: { NumberInput: numberInputTheme = {} } }) => numberInputTheme['&']};
`;
addDefaultThemeProps(NumberInputWrap, Handler);
