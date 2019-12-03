import styled, { css } from 'styled-components';

import { spinMixin, inlineBlockWithVerticalMixin } from 'src/style';

export const SvgIconWrapper = styled.svg.attrs({
    xmlns: 'http://www.w3.org/2000/svg'
})`
    transition: all 0.3s;

    ${inlineBlockWithVerticalMixin};

    ${({ color }) =>
        color &&
        css`
            fill: ${color};
        `};

    ${({ size }) => css`
        width: ${size};
        height: ${size};
    `} ${({ spin }) => spin && spinMixin};
`;
