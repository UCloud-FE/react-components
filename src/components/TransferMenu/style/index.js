import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-transfer-menu';
export const menuCls = prefixCls + '-transfer-menu';

export const MenuWrap = styled('div')(() => {
    return css`
        .${menuCls} {
            max-height: 300px;
        }
    `;
});
