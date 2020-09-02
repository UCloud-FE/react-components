import styled from '@emotion/styled';
import { css } from '@emotion/core';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import config from 'config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-popconfirm';

export const PopupWrap = styled('div')(() => {
    return css`
        min-width: 186px;
        max-width: 300px;
        box-sizing: border-box;
        padding: 12px 16px 12px 40px;
    `;
});
export const ContentWrap = styled('div')(props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        max-height: 72px;
        overflow: auto;
        word-break: normal;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
    `;
});
export const FooterWrap = styled('div')(
    () => css`
        text-align: right;
        margin-top: 12px;
    `
);
export const IconWrap = styled('div')(props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
        position: absolute;
        left: 12px;
        top: 14px;
        fill: ${DT.T_COLOR_TEXT_WARNING};
    `;
});

addDefaultThemeProps(ContentWrap, IconWrap);
