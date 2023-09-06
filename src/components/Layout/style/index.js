import styled from '@emotion/styled';
import { css } from '@emotion/core';
import withProps from 'src/utils/withProps';

import config from 'src/config';

const { prefixCls: _prefixCls } = config;

export const prefixCls = _prefixCls + '-layout';
export const prefixClsSider = _prefixCls + '-sider';
export const prefixClsHeader = _prefixCls + '-header';
export const prefixClsHasSider = prefixCls + '-has-sider';
export const prefixClsContent = prefixCls + '-content';
export const prefixClsFooter = prefixCls + '-footer';

export const LayoutWrap = styled('div')(() => {
    return css`
        &.${prefixCls} {
            display: flex;
            flex: auto;
            flex-direction: column;
            min-height: 40px;
        }

        &.${prefixClsHasSider} {
            flex-direction: row;
        }
    `;
});

export const HeaderWrap = styled('div')(() => {
    return css`
        &.${prefixClsHeader} {
            padding: 20px;
        }
    `;
});

export const SiderWrap = styled('aside')(() => {
    return css``;
});

export const ContentWrap = styled('div')(() => {
    return css``;
});

export const FooterWrap = styled('div')(() => {
    return css`
        &.${prefixClsFooter} {
            padding: 20px;
        }
    `;
});
