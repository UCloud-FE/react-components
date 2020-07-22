import styled, { css } from 'styled-components';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import config from 'config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-popconfirm';

export const PopupWrap = styled.div(() => {
    return css`
        min-width: 186px;
        max-width: 300px;
        box-sizing: border-box;
        padding: 12px 16px 12px 44px;
    `;
});

export const ContentWrap = styled.div(
    ({ theme: { designTokens: DT } }) => css`
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        max-height: 72px;
        overflow: auto;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
    `
);
export const FooterWrap = styled.div(
    () => css`
        text-align: right;
        margin-top: 12px;
    `
);
export const IconWrap = styled.div(
    ({ theme: { designTokens: DT } }) => css`
        position: absolute;
        left: 14px;
        top: 14px;
        fill: ${DT.T_COLOR_TEXT_WARNING};
    `
);

addDefaultThemeProps(ContentWrap, IconWrap);
