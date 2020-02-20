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
const themeMixin = ({ theme: { designTokens: DT } }) => css`
    background: ${DT.T_CARD_COLOR_BG_DEFAULT};
    font-size: ${DT.T_TYPO_FONT_SIZE_1};
    box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_MD};
    border-radius: ${DT.T_CORNER_LG};
    ${HeaderWrap} {
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        font-size: ${DT.T_TYPO_FONT_SIZE_3};
    }
    ${CommentWrap} {
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        font-size: ${DT.T_TYPO_FONT_SIZE_1};
    }
    ${FooterWrap} {
        border-top: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        padding: 16px 24px;
        margin-top: 24px;
    }
`;
/* stylelint-enable no-duplicate-selectors */

export const CardWrap = styled.div.attrs({
    className: prefixCls
})`
    box-sizing: border-box;
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
