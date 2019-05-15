import styled, { css } from 'styled-components';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import { clearFixMixin } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-card';

const sharedGutter = css`
    padding: 0 24px;
    margin-top: 16px;
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
    line-height: 20px;
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
const themeMixin = ({ theme: { colorList, colorMap, fontSize, Card: cardTheme = {} } }) => css`
    background: ${colorList.white};
    font-size: ${fontSize};
    color: ${colorMap.default.text};
    box-shadow: 0px 1px 0px 0px rgba(223, 224, 241, 1), 0px 1px 3px 0px rgba(182, 188, 224, 0.5),
        0px 4px 12px 0px rgba(218, 221, 238, 0.5);
    ${HeaderWrap} {
        color: ${colorList.title};
        font-size: 16px;
    }
    ${CommentWrap} {
        color: ${colorList.subtitle};
        font-size: ${fontSize};
    }
    ${FooterWrap} {
        border-top: 1px solid ${colorList.secondary5};
        padding: 16px 24px;
        margin-top: 24px;
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
    overflow: auto;

    /* stylelint-disable selector-type-no-unknown*/
    ${HeaderWrap}:last-child, ${ActionWrap}:last-child, ${ContentWrap}:last-child {
        margin-bottom: 24px;
    }

    ${HeaderWrap}:first-child, ${ActionWrap}:first-child, ${ContentWrap}:first-child {
        margin-top: 24px;
    }

    ${themeMixin};
`;

addDefaultThemeProps(CardWrap);
