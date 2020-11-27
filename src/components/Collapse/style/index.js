import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const PanelWrap = styled('div')(props => {
    return css`
        ${!props.open &&
        css`
            display: none;
        `};
    `;
});
