import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { TransitionGroup } from 'react-transition-group';

import SvgIcon from 'src/components/SvgIcon';
import { slideUpOut, slideInRight } from 'src/style/animation';
import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-message';
export const titleCls = prefixCls + '-title';
export const contentCls = prefixCls + '-content';

export const animationDuration = 400;
export const animationName = 'uc-fe-animation-fade';

const colorMap = {
    success: 'T_COLOR_TEXT_SUCCESS',
    warning: 'T_COLOR_TEXT_WARNING',
    error: 'T_COLOR_TEXT_ERROR',
    loading: 'T_COLOR_TEXT_PRIMARY_DEFAULT',
    default: 'T_COLOR_TEXT_PRIMARY_DEFAULT'
};

export const TipIcon = withProps()(
    styled(SvgIcon)(props => {
        const {
            styleType,
            theme: { designTokens: DT }
        } = props;

        return css`
            fill: ${DT[colorMap[styleType]]};
        `;
    })
);

export const IconWrap = styled('div')`
    display: flex;
    font-size: 20px;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    position: absolute;
    top: 17px;
    left: 16px;
`;
export const CloseIconWrap = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            display: flex;
            font-size: 20px;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            position: absolute;
            top: 17px;
            right: 16px;
            cursor: pointer;
            svg {
                fill: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }
        `;
    })
);

export const LeftPrefix = withProps()(
    styled('div')(props => {
        const {
            styleType,
            theme: { designTokens: DT }
        } = props;

        return css`
            position: absolute;
            top: -1px;
            bottom: -1px;
            left: -1px;
            width: 4px;
            background-color: ${DT[colorMap[styleType]]};
        `;
    })
);

export const TitleWrap = withProps({
    className: titleCls
})(
    styled('h3')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            margin: 0px;
            padding-right: 36px;
            padding-left: 44px;
            word-break: break-all;
            font-size: 14px;
            font-weight: bold;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            line-height: 24px;
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
            padding-right: 36px;
            padding-left: 44px;
            word-break: break-all;
            font-size: 14px;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            line-height: 24px;
        `;
    })
);

export const FooterWrap = styled('div')`
    text-align: right;
    margin-right: 16px;
    margin-left: 44px;
    margin-top: 8px;
`;

export const MessageWrap = withProps({
    className: prefixCls
})(
    styled('div')(props => {
        const {
            styleType,
            theme: { designTokens: DT }
        } = props;

        return css`
            box-sizing: border-box;
            width: 340px;
            min-height: 56px;
            padding: 15px 0;
            border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            background: ${DT.T_COLOR_BG_DEFAULT_BRIGHT};
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
            position: relative;
            transition: all 0.3s ease-in-out;
            opacity: 1;
        `;
    })
);

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
        animation-name: ${slideInRight};
        animation-timing-function: cubic-bezier(0.3, 1.3, 0.3, 1);
    }
    .${animationName}-leave, .${animationName}-exit {
        animation-name: ${slideUpOut};
        animation-timing-function: cubic-bezier(0.34, 0.69, 0.1, 1);
    }

    .${prefixCls} {
        position: relative;
        margin-bottom: 16px;
        margin-right: 16px;
        margin-left: auto;
    }
`;
