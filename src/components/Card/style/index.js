import styled, { css } from 'styled-components';

import defaultTheme from 'src/components/ThemeProvider/theme';
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
const themeMixin = ({ theme: { colorList, colorMap, fontSize, Card: cardTheme, titleFontSize } }) => css`
    border: 1px solid ${cardTheme.border};
    background: ${colorList.white};
    font-size: ${fontSize};
    color: ${colorMap.default.text};
    ${HeaderWrap} {
        color: ${colorList.title};
        font-size: ${titleFontSize};
    }
    ${CommentWrap} {
        color: ${colorList.subtitle};
        font-size: ${fontSize};
    }
    ${FooterWrap} {
        border-top: 1px solid ${cardTheme.border};
    }
`;
/* stylelint-enable no-duplicate-selectors */

export const CardWrap = styled.div`
    box-sizing: border-box;
    border-radius: 4px;
    text-align: left;
    padding-bottom: 12px;
    ${themeMixin};
`;
CardWrap.defaultProps = {
    theme: defaultTheme
};
