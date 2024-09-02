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
export const subAreaCls = prefixCls + '-sub-area';
export const subAreaContentCls = prefixCls + '-sub-area-content';

export const HeaderWrap = withProps({
    className: headerCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            padding-left: ${DT.T_CARD_HEADER_PADDING_LEFT};
            padding-right: ${DT.T_CARD_HEADER_PADDING_RIGHT};
            margin-top: ${DT.T_CARD_HEADER_PADDING_TOP};
            margin-bottom: ${DT.T_CARD_HEADER_PADDING_BOTTOM};
            ${clearFixMixin};
        `;
    })
);

export const TitleWrap = withProps({
    className: titleCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            line-height: ${DT.T_CARD_HEADER_FONT_LINE_HEIGHT};
            font-weight: ${DT.T_CARD_HEADER_FONT_FONT_WEIGHT};
        `;
    })
);

export const CommentWrap = withProps({
    className: commentCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            line-height: ${DT.T_CARD_COMMENT_FONT_LINE_HEIGHT};
            font-weight: ${DT.T_CARD_COMMENT_FONT_FONT_WEIGHT};
        `;
    })
);

export const ActionWrap = withProps({
    className: actionCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            line-height: 28px;
            padding-left: ${DT.T_CARD_ACTION_LEFT};
            padding-right: ${DT.T_CARD_ACTION_RIGHT};
            margin-top: ${DT.T_CARD_ACTION_TOP};
            margin-bottom: ${DT.T_CARD_ACTION_BOTTOM};
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
            padding-left: ${DT.T_CARD_CONTENT_PADDING_LEFT};
            padding-right: ${DT.T_CARD_CONTENT_PADDING_RIGHT};
            margin-top: ${DT.T_CARD_CONTENT_PADDING_TOP};
            margin-bottom: ${DT.T_CARD_CONTENT_PADDING_BOTTOM};
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
            padding-left: ${DT.T_CARD_FOOTER_PADDING_LEFT};
            padding-right: ${DT.T_CARD_FOOTER_PADDING_RIGHT};
            padding-top: ${DT.T_CARD_FOOTER_PADDING_TOP};
            padding-bottom: ${DT.T_CARD_FOOTER_PADDING_BOTTOM};
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
                line-height: ${DT.T_CARD_SECONDARY_FONT_LINE_HEIGHT};
                font-size: ${DT.T_CARD_SECONDARY_FONT_SIZE};
                font-weight: ${DT.T_CARD_SECONDARY_FONT_FONT_WEIGHT};
                margin-bottom: ${DT.T_CARD_SECONDARY_PADDING_BOTTOM};
                color: ${DT.T_CARD_SECONDARY_FONT_COLOR_DEFAULT};
            }
            .${subAreaContentCls} {
                /* empty */
            }
            & + & {
                &::before {
                    content: ' ';
                    display: block;
                    height: 1px;
                    background: ${DT.T_CARD_LINE_COLOR_DEFAULT};
                    margin: ${DT.T_CARD_LINE_PADDING_VERTICAL} 0;
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
                margin-bottom: ${DT.T_CARD_FOOTER_MARGIN_BOTTOM};
            }
            .${headerCls}:nth-of-type(2),
            .${actionCls}:nth-of-type(2),
            .${contentCls}:nth-of-type(2) {
                margin-top: ${DT.T_CARD_HEADER_PADDING_TOP};
            }

            background: ${DT.T_CARD_COLOR_BG_DEFAULT};
            font-size: ${DT.T_TYPO_FONT_SIZE_1};
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_MD};
            border-radius: ${DT.T_CORNER_LG};
            .${titleCls} {
                color: ${DT.T_CARD_HEADER_FONT_COLOR_DEFAULT};
                font-size: ${DT.T_CARD_HEADER_FONT_SIZE};
            }
            .${commentCls} {
                color: ${DT.T_CARD_COMMENT_FONT_COLOR_DEFAULT};
                font-size: ${DT.T_CARD_COMMENT_FONT_SIZE};
            }
            .${footerCls} {
                border-top: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_CARD_LINE_COLOR_DEFAULT};
                margin-top: ${DT.T_CARD_FOOTER_MARGIN_TOP};
            }
        `;
    })
);
