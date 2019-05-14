import styled, { css } from 'styled-components';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const themeMixin = ({ theme: { colorList, colorMap, fontSize } }) => css`
    font-size: ${fontSize};
    color: ${colorMap.default.text};
    border: 1px solid ${colorMap.default.border};
    background: ${colorMap.default.background};
    &:hover,
    &:focus {
        border-color: ${colorMap.active.border};
    }
    &::placeholder {
        color: ${colorList.placeholder};
    }
    &[disabled] {
        border-color: ${colorMap.disabled.border};
        background: ${colorMap.disabled.background};
        color: ${colorMap.disabled.text};
    }
`;

export const TextareaWrap = styled.textarea`
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 4px 8px;
    border-radius: 2px;
    line-height: 1.5;
    min-height: ${12 * 1.5 + (4 + 1) * 2}px;
    resize: vertical;
    outline: none;
    ${themeMixin};
`;
addDefaultThemeProps(TextareaWrap);
