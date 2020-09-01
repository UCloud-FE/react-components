import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { TransitionGroup } from 'react-transition-group';

import SvgIcon from 'src/components/SvgIcon';
import { fadeIn, fadeOut } from 'src/style/animation';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

export const animationDuration = 500;
export const animationName = 'uc-fe-animation-fade';

const colorMap = {
    success: 'T_COLOR_TEXT_SUCCESS',
    warning: 'T_COLOR_TEXT_WARNING',
    error: 'T_COLOR_TEXT_ERROR',
    loading: 'T_COLOR_TEXT_PRIMARY_DEFAULT',
    default: 'T_COLOR_TEXT_PRIMARY_DEFAULT'
};

export const TipIcon = styled(SvgIcon)(props => {
    const {
        styleType,
        theme: { designTokens: DT }
    } = props;

    return css`
        fill: ${DT[colorMap[styleType]]};
    `;
});

export const IconWrap = styled('div')`
    font-size: 15px;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    position: absolute;
    top: 16px;
    left: 16px;
`;
export const CloseIconWrap = styled('div')`
    font-size: 15px;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    position: absolute;
    top: 16px;
    right: 12px;
    cursor: pointer;
`;

export const TitleWrap = styled('h3')(props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
        padding-right: 36px;
        padding-left: 44px;
        word-break: break-all;
        font-size: 14px;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        line-height: 22px;
    `;
});

export const ContentWrap = styled('div')(props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
        padding-right: 36px;
        padding-left: 44px;
        word-break: break-all;
        font-size: 12px;
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        line-height: 20px;
    `;
});

export const FooterWrap = styled('div')`
    text-align: right;
    margin-right: 16px;
    margin-top: 16px;
`;

export const MessageWrap = styled('div')(props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
        box-sizing: border-box;
        width: 340px;
        min-height: 52px;
        padding: 16px 0;
        border-radius: 4px;
        box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_MD};
        background: ${DT.T_CARD_COLOR_BG_DEFAULT};
        position: relative;

        ${TitleWrap}+${ContentWrap} {
            margin-top: 8px;
        }
    `;
});

export const MessageContentWrap = styled(TransitionGroup)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 0px;
    overflow: visible;
    z-index: 1060;

    .${animationName}-enter, .${animationName}-appear, .${animationName}-leave, .${animationName}-exit {
        animation-duration: ${animationDuration}ms;
        animation-fill-mode: both;
    }
    .${animationName}-enter, .${animationName}-appear {
        animation-name: ${fadeIn};
    }
    .${animationName}-leave, .${animationName}-exit {
        animation-name: ${fadeOut};
    }

    ${/*sc-sel*/ MessageWrap} {
        position: relative;
        margin-bottom: 16px;
        margin-right: 16px;
        margin-left: auto;
    }
`;

addDefaultThemeProps(MessageWrap, TipIcon, TitleWrap, ContentWrap);
