import styled, { css } from 'styled-components';
import { spinMixin } from 'style';
import classnames from 'classnames';

import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-icon';

const iconSpinMixin = css`
    ${spinMixin};
    line-height: normal;
`;

export const IconWrap = styled.i`
    vertical-align: baseline;
    &&& {
        ${({ spin }) => spin && iconSpinMixin};
    }
`;
