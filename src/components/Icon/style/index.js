import styled, { css } from 'styled-components';
import { spinMixin } from 'style';

const iconSpinMixin = css`
    ${spinMixin};
    line-height: normal;
`;

export const IconWrap = styled.i`
    &&& {
        ${({ spin }) => spin && iconSpinMixin};
    }
`;
