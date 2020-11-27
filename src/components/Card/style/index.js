import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { clearFixMixin } from 'src/style';
import config from 'src/config';

import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-card';
export const headerCls = prefixCls + '-header';
export const titleCls = prefixCls + '-title';
export const commentCls = prefixCls + '-comment';
export const actionCls = prefixCls + '-action';
export const contentCls = prefixCls + '-content';
export const footerCls = prefixCls + '-footer';

const sharedGutter = css`
    padding: 0 24px;
    margin-top: 16px;
`;

export const HeaderWrap = withProps({
    className: headerCls
})(styled('div')`
    ${sharedGutter};
    ${clearFixMixin};
`);

export const TitleWrap = withProps({
    className: titleCls
})(styled('div')`
    line-height: 28px;
    font-weight: bold;
`);

export const CommentWrap = withProps({
    className: commentCls
})(styled('div')`
    line-height: 20px;
    font-weight: normal;
`);

export const ActionWrap = withProps({
    className: actionCls
})(styled('div')`
    line-height: 28px;
    ${sharedGutter};
    ${clearFixMixin};
`);

export const ContentWrap = withProps({
    className: contentCls
})(styled('div')`
    ${sharedGutter};
`);

export const FooterWrap = withProps({
    className: footerCls
})(styled('div')`
    line-height: 1;
    ${sharedGutter};
    padding-top: 12px;
    ${clearFixMixin};
`);

export const CardWrap = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            box-sizing: border-box;
            text-align: left;
            overflow: auto;

            .${headerCls}:last-child, .${actionCls}:last-child, .${contentCls}:last-child {
                margin-bottom: 24px;
            }
            .${headerCls}:first-child, .${actionCls}:first-child, .${contentCls}:first-child {
                margin-top: 24px;
            }

            background: ${DT.T_CARD_COLOR_BG_DEFAULT};
            font-size: ${DT.T_TYPO_FONT_SIZE_1};
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_MD};
            border-radius: ${DT.T_CORNER_LG};
            .${titleCls} {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                font-size: ${DT.T_TYPO_FONT_SIZE_3};
            }
            .${commentCls} {
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                font-size: ${DT.T_TYPO_FONT_SIZE_1};
            }
            .${footerCls} {
                border-top: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                padding: 16px 24px;
                margin-top: 24px;
            }
        `;
    })
);
