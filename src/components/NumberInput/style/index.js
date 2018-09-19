import styled, { css } from 'styled-components';

import { Color, inlineBlockWithVerticalMixin, Height, calculateSize } from 'src/style';

/* stylelint-disable no-duplicate-selectors, selector-type-no-unknown, no-descending-specificity */

export const InputWrap = styled.div`
    position: relative;
`;

export const Input = styled.input`
    border: none;
    outline: none;
    padding: 0;
    color: inherit;

    line-height: ${({ size }) => calculateSize(Height[size], -2)};

    ${inlineBlockWithVerticalMixin};

    ${({ disabled }) =>
        disabled &&
        css`
            background: ${Color.bg.disabled};
        `};

    &::placeholder {
        color: ${Color.font.grayLight};
    }
`;

export const InputSuffix = styled.span`
    color: #c3cad9;
    margin: 0 4px;

    ${inlineBlockWithVerticalMixin};
`;

const handlerMixin = css`
    position: absolute;
    box-sizing: border-box;
    text-align: center;
    border-radius: 2px;
    border-style: solid;
    color: inherit;
    cursor: pointer;
    background: #fff;

    border-color: ${Color.border.default};

    ${inlineBlockWithVerticalMixin};

    ${({ disabled }) =>
        disabled &&
        css`
            cursor: not-allowed;
            pointer-events: none;
        `};
`;

export const HandlerUp = styled.span`
    ${handlerMixin};
`;

export const HandlerDown = styled.span`
    ${handlerMixin};
`;

export const NumberInputWrap = styled.div`
    position: relative;
    box-sizing: border-box;
    border-radius: 2px;

    color: ${Color.font.default};
    height: ${({ size }) => Height[size]};

    ${inlineBlockWithVerticalMixin};

    ${({ disabled }) =>
        disabled &&
        css`
            pointer-events: none;
            color: ${Color.font.disabled};
        `};

    ${({ styleType, focused, size, hideHandler, disabled }) =>
        styleType === 'default' &&
        css`
            border: 1px solid ${Color.border.default};

            padding-right: ${calculateSize(Height[size], -6)};

            &:hover {
                border-color: ${Color.border.blue};
            }

            ${focused &&
                css`
                    border-color: ${Color.border.blue};
                `};

            ${disabled &&
                css`
                    border-color: ${Color.border.disabled};
                `};

            ${Input} {
                padding: 0 0 0 8px;
                text-align: left;

                width: ${calculateSize(Height[size], 6)};
            }

            ${HandlerUp}, ${HandlerDown} {
                right: 0;

                height: ${(+Height[size].replace('px', '') - 2) / 2}px;
                line-height: ${(+Height[size].replace('px', '') - 2) / 2}px;
                width: ${calculateSize(Height[size], -6)};

                &:hover {
                    color: ${Color.font.blue};
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

    ${({ styleType, focused, size, hideHandler, disabled }) =>
        styleType === 'split' &&
        css`
            padding: 0 ${Height[size]};
            ${Input} {
                padding: 0 8px;
                text-align: left;

                height: ${calculateSize(Height[size], -2)};
                width: ${calculateSize(Height[size], 6)};
            }
            ${InputWrap} {
                border: 1px solid ${Color.border.default};
                margin: 0 -1px 0 -1px;
                &:hover {
                    border-color: ${Color.border.blue};
                    z-index: 1;
                }
                ${focused &&
                    css`
                        border-color: ${Color.border.blue};
                    `};
                ${disabled &&
                    css`
                        border-color: ${Color.border.disabled};
                    `};
            }
            ${HandlerUp}, ${HandlerDown} {
                text-align: center;
                top: 0;
                height: ${Height[size]};
                width: ${Height[size]};
                line-height: ${calculateSize(Height[size], -2)};

                &:hover {
                    color: ${Color.font.blue};
                    border-color: ${Color.border.blue};
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

    ${({ styleType, focused, size, hideHandler, disabled }) =>
        styleType === 'pagination' &&
        css`
            padding: 0 ${Height[size]};
            ${Input} {
                text-align: center;
                border: 1px solid ${Color.border.default};
                margin: 0 4px;

                height: ${calculateSize(Height[size], -2)};
                width: ${calculateSize(Height[size], -2)};

                &:hover {
                    border-color: ${Color.border.blue};
                    z-index: 1;
                }
                ${focused &&
                    css`
                        border-color: ${Color.border.blue};
                    `};
                ${disabled &&
                    css`
                        border-color: ${Color.border.disabled};
                    `};
            }
            ${HandlerUp}, ${HandlerDown} {
                text-align: center;
                top: 0;
                &:hover {
                    color: ${Color.font.blue};
                    border-color: ${Color.border.blue};
                    z-index: 1;
                }
                height: ${Height[size]};
                width: ${Height[size]};
                line-height: ${calculateSize(Height[size], -2)};
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
