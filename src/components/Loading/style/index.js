import styled, { css } from 'styled-components';

import Icon from 'src/components/Icon';
import { fadeIn, fadeOut } from 'src/style/animation';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

export const animationDuration = 500;
export const animationName = 'uc-fe-animation-fade';

export const LoadingWrap = styled.div`
    position: relative;

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
`;

export const Mask = styled.div(
    ({ theme: { designTokens: DT } }) => css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        background: ${DT.T_LOADING_COLOR_LAYER_DEFAULT};
    `
);

export const IndicatorWrap = styled.div`
    display: table;
    width: 100%;
    height: 100%;

    & > div {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
`;

export const LoadingIcon = styled(Icon)(
    ({ theme: { designTokens: DT } }) => css`
        font-size: 20px;
        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
    `
);

export const ContentWrap = styled.div`
    position: relative;
`;

export const TipWrap = styled.p(
    ({ theme: { fontSize, designTokens: DT } }) => css`
        text-align: center;
        font-size: ${fontSize};
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        margin-top: 5px;
    `
);

addDefaultThemeProps(TipWrap, LoadingIcon, Mask);
