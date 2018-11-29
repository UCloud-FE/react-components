import styled, { css } from 'styled-components';

import { clearFixMixin } from 'src/style';

const sharedGutter = css`
    padding: 0 16px;
    margin-top: 12px;
`;

export const HeaderWrap = styled.div(
    ({ theme: { colorList, titleFontSize } }) => css`
        line-height: 28px;
        color: ${colorList.title};
        font-size: ${titleFontSize};
        font-weight: bold;
        ${clearFixMixin};
        ${sharedGutter};
    `
);

export const CommentWrap = styled.div(
    ({ theme: { colorMap, fontSize } }) => css`
        display: block;
        line-height: 22px;
        font-size: ${fontSize};
        font-weight: normal;
        color: ${colorMap.default.border};
    `
);

export const ActionWrap = styled.div`
    line-height: 28px;
    ${clearFixMixin};
    ${sharedGutter};
`;

export const ContentWrap = styled.div`
    min-height: 30px;
    ${sharedGutter};
`;

export const FooterWrap = styled.div(
    ({ theme: { Card: cardTheme } }) => css`
        border-top: 1px solid ${cardTheme.border};
        line-height: 1;
        ${sharedGutter};
        padding-top: 12px;
        ${clearFixMixin};
    `
);

export const CardWrap = styled.div(
    ({ theme: { colorList, fontSize, Card: cardTheme } }) => css`
        box-sizing: border-box;
        border: 1px solid ${cardTheme.border};
        border-radius: 4px;
        background: ${colorList.white};
        text-align: left;
        padding-bottom: 12px;
        font-size: ${fontSize};
    `
);
