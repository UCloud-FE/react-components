import styled, { css } from 'styled-components';
import { TransitionGroup } from 'react-transition-group';

import { Color } from 'src/style';
import { fadeIn, fadeOut } from 'src/style/animation';

export const animationDuration = 500;
export const animationName = 'uc-fe-animation-fade';

export const IconWrap = styled.span`
    display: table-cell;
    font-size: 15px;
    width: 15px;
    padding-right: 8px;
    padding-top: 2px;
`;

export const ContentWrap = styled.div`
    display: table-cell;
    vertical-align: middle;
`;

const IconColorMap = {
    default: 'default',
    error: 'red',
    warning: 'yellow',
    info: 'blue'
};

const BorderColorMap = {
    default: 'default',
    error: 'red',
    warning: 'yellow',
    info: 'blueBright'
};
const BgColorMap = {
    default: 'default',
    error: 'red',
    warning: 'yellow',
    info: 'blueLight'
};

export const MessageWrap = styled.div`
    word-break: break-all;
    line-height: 16px;
    font-size: 14px;
    padding: 10px;
    border-radius: 2px;
    border: 1px solid ${Color.border.default};
    color: ${Color.font.default};

    ${({ styleType }) => css`
        border-color: ${Color.border[BorderColorMap[styleType]]};
        background: ${Color.bg[BgColorMap[styleType]]};

        ${/*sc-sel*/ IconWrap} {
            color: ${Color.font[IconColorMap[styleType]]};
        }
    `};
`;

export const MessageContentWrap = styled(TransitionGroup)`
    position: fixed;
    top: 0;
    width: 300px;
    margin-left: 50%;
    left: -50px;
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
        margin-bottom: 10px;
    }
`;
