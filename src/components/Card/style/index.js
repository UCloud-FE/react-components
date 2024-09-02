import { css } from '@emotion/core';
import styled from '@emotion/styled';

import config from 'src/config';
import { clearFixMixin } from 'src/style';

import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-card';
export const headerCls = prefixCls + '-header';
export const titleCls = prefixCls + '-title';
export const commentCls = prefixCls + '-comment';
export const actionCls = prefixCls + '-action';
export const contentCls = prefixCls + '-content';
export const footerCls = prefixCls + '-footer';
export const subAreaCls = prefixCls + '-sub-area';
export const subAreaContentCls = prefixCls + '-sub-area-content';

const sharedGutter = T_CARD_OUTSIDE_PADDING => {
    return css`
        padding: 0 ${T_CARD_OUTSIDE_PADDING};
        margin-top: 16px;
    `;
};

export const HeaderWrap = withProps({
    className: headerCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            ${sharedGutter(DT.T_CARD_OUTSIDE_PADDING)};
            ${clearFixMixin};
        `;
    })
);

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
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            line-height: 28px;
            ${sharedGutter(DT.T_CARD_OUTSIDE_PADDING)};
            ${clearFixMixin};
        `;
    })
);

export const ContentWrap = withProps({
    className: contentCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            ${sharedGutter(DT.T_CARD_OUTSIDE_PADDING)};
        `;
    })
);

export const FooterWrap = withProps({
    className: footerCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            line-height: 1;
            ${sharedGutter(DT.T_CARD_OUTSIDE_PADDING)};
            padding-top: 12px;
            ${clearFixMixin};
        `;
    })
);

export const SubAreaWrap = withProps({
    className: subAreaCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            .${titleCls} {
                line-height: 22px;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 16px;
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            }
            .${subAreaContentCls} {
                /* empty */
            }
            & + & {
                &::before {
                    content: ' ';
                    display: block;
                    height: 1px;
                    background: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                    margin: 16px 0;
                }
            }
        `;
    })
);

export const CardWrap = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            box-sizing: border-box;
            text-align: left;
            overflow: auto;

            .${headerCls}:last-of-type, .${actionCls}:last-of-type, .${contentCls}:last-of-type {
                margin-bottom: ${DT.T_CARD_OUTSIDE_PADDING};
            }
            .${headerCls}:nth-of-type(2),
            .${actionCls}:nth-of-type(2),
            .${contentCls}:nth-of-type(2) {
                margin-top: ${DT.T_CARD_OUTSIDE_PADDING};
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
                padding: 16px ${DT.T_CARD_OUTSIDE_PADDING};
                margin-top: ${DT.T_CARD_OUTSIDE_PADDING};
            }
        `;
    })
);
