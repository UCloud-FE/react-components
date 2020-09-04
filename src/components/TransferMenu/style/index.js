import styled from '@emotion/styled';

import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-transfer-menu';
export const menuCls = prefixCls + '-transfer-menu';

export const MenuWrap = styled('div')`
    .${menuCls} {
        max-height: 300px;
    }
`;
