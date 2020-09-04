import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { spinMixin } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-icon';

const iconSpinMixin = css`
    ${spinMixin};
    line-height: normal;
`;

export const IconWrap = styled('i')(props => {
    const { spin } = props;

    return css`
        vertical-align: baseline;
        &&& {
            ${spin && iconSpinMixin};
        }
    `;
});
