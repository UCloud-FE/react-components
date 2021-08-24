import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { sWrap } from 'src/style';

export const PanelWrap = sWrap<{ open?: boolean }>({})(
    styled('div')(props => {
        return css`
            ${!props.open &&
            css`
                display: none;
            `};
        `;
    })
);
