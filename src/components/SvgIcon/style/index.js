import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { spinMixin, inlineBlockWithVerticalMixin } from 'src/style';
import withProps from 'src/utils/withProps';

export const SvgIconWrapper = withProps({})(
    styled('svg')(props => {
        const { color, size, spin } = props;

        return css`
            transition: all 0.3s;

            ${inlineBlockWithVerticalMixin};

            fill: currentcolor;

            ${color &&
            css`
                fill: ${color};
            `};

            ${css`
                width: ${size};
                height: ${size};
            `};
            ${spin && spinMixin};
        `;
    })
);
