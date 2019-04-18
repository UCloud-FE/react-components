import styled, { css } from 'styled-components';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import { clearFixMixin } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-card';

const sharedGutter = css`
    padding: 0 16px;
    margin-top: 12px;
`;

export const HeaderWrap = styled.div.attrs({
    className: prefixCls + '-header'
})`
    ${clearFixMixin};
    ${sharedGutter};
`;

export const TitleWrap = styled.div.attrs({
    className: prefixCls + '-title'
})`
    line-height: 28px;
    font-weight: bold;
`;

export const CommentWrap = styled.div.attrs({
    className: prefixCls + '-comment'
})`
    line-height: 22px;
    font-weight: normal;
`;

export const ActionWrap = styled.div.attrs({
    className: prefixCls + '-action'
})`
    line-height: 28px;
    ${clearFixMixin};
    ${sharedGutter};
`;

export const ContentWrap = styled.div.attrs({
    className: prefixCls + '-content'
})`
    ${sharedGutter};
`;

export const FooterWrap = styled.div.attrs({
    className: prefixCls + '-footer'
})`
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

export const CardWrap = styled.div.attrs({
    className: prefixCls
})`
    box-sizing: border-box;
    border-radius: 4px;
    text-align: left;

    ${/* sc-sel */ HeaderWrap}:last-child,
        ${/* sc-sel */ ActionWrap}:last-child,
        ${/* sc-sel */ ContentWrap}:last-child,
        ${/* sc-sel */ FooterWrap}:last-child {
        margin-bottom: 12px;
    }

    ${themeMixin};
`;

addDefaultThemeProps(CardWrap);
