import styled from '@emotion/styled';
import { css } from '@emotion/core';

import withProps from 'src/utils/withProps';

const themeMixin = props => {
    const {
        theme: { designTokens: DT, fontSize }
    } = props;

    return css`
        font-size: ${fontSize};
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
        background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
        &:hover,
        &:focus {
            border-color: ${DT.T_COLOR_LINE_PRIMARY_HOVER};
        }
        &:focus {
            border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        }
        &::placeholder {
            opacity: 1;
            color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
        }
        &[disabled] {
            color: ${DT.T_COLOR_TEXT_DISABLED};
            border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
        }
    `;
};

export const TextareaWrap = withProps()(styled('textarea')`
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
`);
