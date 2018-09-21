import styled from 'styled-components';

import { Color, FontSize } from 'src/style';

export const TextareaWrap = styled.textarea`
    font-size: ${FontSize.xs};
    color: ${Color.font.default};
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 4px 8px;
    border: 1px solid ${Color.border.default};
    border-radius: 2px;
    background: ${Color.bg.white};
    line-height: 1.5;
    min-height: ${12 * 1.5 + (4 + 1) * 2}px;
    resize: vertical;
    outline: none;

    &:hover,
    &:focus {
        border-color: ${Color.border.blue};
    }

    &[disabled] {
        border-color: ${Color.border.disabled};
        background: ${Color.bg.disabled};
        color: ${Color.font.disabled};
    }
`;
