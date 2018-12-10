import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const sizeMixin = ({ size, theme: { Height, HeightNumber, Padding } }) => css`
    height: ${Height[size]};
    line-height: ${HeightNumber[size] - 2}px;
    padding: 0 ${Padding[size]};
`;

const styleTypeMixin = ({ theme: { Button: buttonTheme }, styleType }) => {
    return css`
        ${buttonTheme[styleType]};
        :hover {
            ${buttonTheme[styleType + ':hover']};
        }
    `;
};

const shapeCircleMixin = ({ size, theme: { Height } }) => css`
    border-radius: 50%;
    padding: 0;
    overflow: hidden;
    width: ${Height[size]};
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

const disabledMixin = ({
    theme: {
        colorMap: { disabled: disabledColorMap }
    }
}) => css`
    :disabled,
    &[disabled] {
        border-color: ${disabledColorMap.border};
        background: ${disabledColorMap.background};
        color: ${disabledColorMap.text};
        cursor: not-allowed;
        pointer-events: none;
    }
`;

export const ButtonWrap = styled.button(
    ({ theme: { fontSize }, loading, shape, disabled }) => css`
        box-sizing: border-box;
        border-radius: 2px;
        border-width: 1px;
        border-style: solid;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        font-size: ${fontSize};
        ${inlineBlockWithVerticalMixin};

        ${sizeMixin};
        ${styleTypeMixin};
        ${shape === 'circle' && shapeCircleMixin};
        ${loading && loadingMixin};
        ${disabled && disabledMixin};
    `
);
addDefaultThemeProps(ButtonWrap);
