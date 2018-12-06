import styled, { css } from 'styled-components';
import { TransitionGroup } from 'react-transition-group';

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

const map = {
    default: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'success'
};

export const MessageWrap = styled.div(({ styleType, theme: { colorMap } }) => {
    const color = colorMap[map[styleType]];
    return css`
        word-break: break-all;
        line-height: 16px;
        font-size: 14px;
        padding: 10px;
        border-radius: 2px;
        border: 1px solid ${colorMap.default.border};
        color: ${colorMap.default.text};

        border-color: ${color.border};
        background: ${color.background};

        ${/*sc-sel*/ IconWrap} {
            color: ${color.icon};
        }
    `;
});

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
