import styled, { css } from 'styled-components';

export const PanelWrap = styled.div`
    ${props =>
        !props.open &&
        css`
            display: none;
        `};
`;
