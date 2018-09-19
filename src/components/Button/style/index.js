import styled, { css } from 'styled-components';
import { Color, FontSize, Height, Padding, calculateSize, inlineBlockWithVerticalMixin } from 'style';

const ButtonColor = {
    font: { primary: 'white', border: 'default', 'border-gray': 'default' },
    border: { primary: 'blue', border: 'default', 'border-gray': 'default' },
    bg: { primary: 'blue', border: 'white', 'border-gray': 'content' }
};

const ButtonHoverColor = {
    font: { primary: '', border: 'blue', 'border-gray': 'blue' },
    border: { primary: '', border: 'blue', 'border-gray': 'blue' },
    bg: { primary: 'blueBold', border: '', 'border-gray': '' }
};

const getColor = (map, styleName, type) => {
    return Color[styleName][map[styleName][type]] || '';
};

const styleTypeMixin = ({ styleType }) => css`
    color: ${getColor(ButtonColor, 'font', styleType)};
    border-color: ${getColor(ButtonColor, 'border', styleType)};
    background-color: ${getColor(ButtonColor, 'bg', styleType)};
    &:hover {
        color: ${getColor(ButtonHoverColor, 'font', styleType)};
        border-color: ${getColor(ButtonHoverColor, 'border', styleType)};
        background-color: ${getColor(ButtonHoverColor, 'bg', styleType)};
    }
`;

const sizeMixin = ({ size }) => css`
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
        background: #fff;
        opacity: 0.35;
        content: '';
        border-radius: inherit;
        z-index: 1;
        transition: opacity 0.2s;
        pointer-events: none;
    }
`;

const shapeMixin = ({ shape, size }) => {
    if (shape === 'circle') {
        return css`
            border-radius: 50%;
            padding: 0;
            overflow: hidden;
            width: ${Height[size]};
        `;
    }
};

export const ButtonWrap = styled.button`
    box-sizing: border-box;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    text-align: center;
    text-decoration: none;
    font-size: ${FontSize.xs};
    cursor: pointer;
    outline: none;

    ${inlineBlockWithVerticalMixin};
    ${styleTypeMixin};
    ${sizeMixin};
    ${shapeMixin};
    ${({ loading }) => loading && loadingMixin};

    &[disabled] {
        border-color: ${Color.border.disabled};
        background-color: ${Color.bg.disabled};
        color: ${Color.font.disabled};
        cursor: not-allowed;
        pointer-events: none;
    }
`;
