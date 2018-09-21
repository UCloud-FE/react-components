import styled, { css } from 'styled-components';

import { clearFixMixin, FontSize, Color } from 'src/style';

const sharedGutter = css`
    padding: 0 16px;
    margin-top: 12px;
`;

export const HeaderWrap = styled.div`
    line-height: 28px;
    color: ${Color.font.title};
    font-size: ${FontSize.sm};
    font-weight: bold;
    ${clearFixMixin};
    ${sharedGutter};
`;

export const CommentWrap = styled.div`
    display: block;
    line-height: 22px;
    font-size: ${FontSize.xs};
    font-weight: normal;
    color: ${Color.border.default};
`;

export const ActionWrap = styled.div`
    line-height: 28px;
    ${clearFixMixin};
    ${sharedGutter};
`;

export const ContentWrap = styled.div`
    min-height: 30px;
    ${sharedGutter};
`;

export const FooterWrap = styled.div`
    border-top: 1px solid ${Color.border.defaultLight};
    line-height: 1;
    ${sharedGutter};
    padding-top: 12px;
    ${clearFixMixin};
`;

export const CardWrap = styled.div`
    box-sizing: border-box;
    border: 1px solid ${Color.border.defaultLight};
    border-radius: 4px;
    background-color: ${Color.bg.white};
    text-align: left;
    padding-bottom: 12px;
`;
