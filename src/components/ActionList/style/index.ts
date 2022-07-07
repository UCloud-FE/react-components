import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Combine from 'src/components/Combine';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-actionlist';

export const SWrap = styled(Combine)(() => {
    return css`
        white-space: nowrap;
    `;
});
