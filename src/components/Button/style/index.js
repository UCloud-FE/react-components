import styled, { css } from 'styled-components';

import { calculateSize, inlineBlockWithVerticalMixin } from 'src/style';

const styleTypeMixin = ({ styleType, theme: { Button: buttonTheme } }) => css`
    color: ${buttonTheme[styleType].text};
    border-color: ${buttonTheme[styleType].border};
    background: ${buttonTheme[styleType].background};
    &:hover {
        color: ${buttonTheme[styleType + ':hover'].text};
        border-color: ${buttonTheme[styleType + ':hover'].border};
        background: ${buttonTheme[styleType + ':hover'].background};
    }
`;

const sizeMixin = ({ size, theme: { Height, Padding } }) => css`
    height: ${Height[size]};
    line-height: ${calculateSize(Height[size], -2)};
    padding: 0 ${Padding[size]};
`;

const loadingMixin = css`
    position: relative;
    pointer-events: none;

    &:before {
        position: absolute;
        top: -1px;
        left: -1px;
        bottom: -1px;
        right: -1px;
        background: white;
        opacity: 0.35;
        content: '';
        border-radius: inherit;
        z-index: 1;
        transition: opacity 0.2s;
        pointer-events: none;
    }
`;

const shapeMixin = ({ shape, size, theme: { Height } }) => {
    if (shape === 'circle') {
        return css`
            border-radius: 50%;
            padding: 0;
            overflow: hidden;
            width: ${Height[size]};
        `;
    }
};

export const ButtonWrap = styled.button(
    ({
        theme: {
            fontSize,
            colorMap: { disabled: disabledColorMap }
        }
    }) => css`
        box-sizing: border-box;
        border-radius: 2px;
        border-width: 1px;
        border-style: solid;
        text-align: center;
        text-decoration: none;
        font-size: ${fontSize};
        cursor: pointer;
        outline: none;

        ${inlineBlockWithVerticalMixin};
        ${styleTypeMixin};
        ${sizeMixin};
        ${shapeMixin};
        ${({ loading }) => loading && loadingMixin};

        &[disabled] {
            border-color: ${disabledColorMap.border};
            background: ${disabledColorMap.background};
            color: ${disabledColorMap.text};
            cursor: not-allowed;
            pointer-events: none;
        }
    `
);
