import styled from '@emotion/styled';
import { css } from '@emotion/core';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import { clearFixMixin } from 'src/style';
import config from 'src/config';

import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-card';

const sharedGutter = css`
    padding: 0 24px;
    margin-top: 16px;
`;

export const HeaderWrap = styled(
    withProps({
        className: prefixCls + '-header'
    })(styled('div')`
        ${clearFixMixin};
        ${sharedGutter};
    `)
)`
    /* empty */
`;

export const TitleWrap = styled(
    withProps({
        className: prefixCls + '-title'
    })(styled('div')`
        line-height: 28px;
        font-weight: bold;
    `)
)`
    /* empty */
`;

export const CommentWrap = styled(
    withProps({
        className: prefixCls + '-comment'
    })(styled('div')`
        line-height: 20px;
        font-weight: normal;
    `)
)`
    /* empty */
`;

export const ActionWrap = styled(
    withProps({
        className: prefixCls + '-action'
    })(styled('div')`
        line-height: 28px;
        ${clearFixMixin};
        ${sharedGutter};
    `)
)`
    /* empty */
`;

export const ContentWrap = styled(
    withProps({
        className: prefixCls + '-content'
    })(styled('div')`
        ${sharedGutter};
    `)
)`
    /* empty */
`;

export const FooterWrap = styled(
    withProps({
        className: prefixCls + '-footer'
    })(styled('div')`
        line-height: 1;
        ${sharedGutter};
        padding-top: 12px;
        ${clearFixMixin};
    `)
)`
    /* empty */
`;

/* stylelint-disable no-duplicate-selectors */
const themeMixin = props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
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
};
/* stylelint-enable no-duplicate-selectors */

export const CardWrap = styled('div')`
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
