import styled, { css } from 'styled-components';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import { clearFixMixin } from 'src/style';

const sharedGutter = css`
    padding: 0 16px;
    margin-top: 12px;
`;

export const HeaderWrap = styled.div`
    line-height: 28px;
    font-weight: bold;
    ${clearFixMixin};
    ${sharedGutter};
`;

export const CommentWrap = styled.div`
    display: block;
    line-height: 22px;
    font-weight: normal;
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
    line-height: 1;
    ${sharedGutter};
    padding-top: 12px;
    ${clearFixMixin};
`;

/* stylelint-disable no-duplicate-selectors */
const themeMixin = ({ theme: { colorList, colorMap, fontSize, titleFontSize, Card: cardTheme = {} } }) => css`
    border: 1px solid ${colorList.secondary5};
    background: ${colorList.white};
    font-size: ${fontSize};
    color: ${colorMap.default.text};
    ${HeaderWrap} {
        color: ${colorList.title};
        font-size: ${titleFontSize};
        ${cardTheme['Header']};
    }
    ${CommentWrap} {
        color: ${colorList.subtitle};
        font-size: ${fontSize};
        ${cardTheme['Comment']};
    }
    ${ActionWrap} {
        ${cardTheme['Action']};
    }
    ${ContentWrap} {
        ${cardTheme['Content']};
    }
    ${FooterWrap} {
        border-top: 1px solid ${colorList.secondary5};
        ${cardTheme['Footer']};
    }
    ${cardTheme['&']};
`;
/* stylelint-enable no-duplicate-selectors */

export const CardWrap = styled.div`
    box-sizing: border-box;
    border-radius: 4px;
    text-align: left;
    padding-bottom: 12px;
    ${themeMixin};
`;

addDefaultThemeProps(CardWrap);
