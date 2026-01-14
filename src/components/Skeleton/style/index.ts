import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import config from 'src/config';
import { sWrap } from 'src/style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-skeleton';
export const contentCls = prefixCls + '-content';

const skeletonAnimation = keyframes`
    0% {
        transform: translate(-37.5%)
    }
    to {
        transform: translate(37.5%)
    }
`;

export const SWrap = sWrap<{ animated?: boolean; width?: string | number }, HTMLDivElement>({})(
    styled.div(props => {
        const {
            theme: { designTokens: DT },
            animated,
            width
        } = props;
        return css`
            .${contentCls} {
                ${width && `width: ${width};`}
                p {
                    overflow: hidden;
                    position: relative;
                    background: ${DT.T_SKELETON_COLOR_BG_LIGHT};
                    height: 16px;
                    margin-top: 12px;
                    background-clip: content-box;
                    border-radius: 2px;
                    ${animated &&
                    css`
                        &::after {
                            content: '';
                            animation: 1.5s linear infinite ${skeletonAnimation};
                            background: linear-gradient(
                                90deg,
                                ${DT.T_SKELETON_COLOR_BG_LIGHT} 25%,
                                ${DT.T_SKELETON_COLOR_BG_DARK} 37%,
                                ${DT.T_SKELETON_COLOR_BG_LIGHT} 63%
                            );
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            height: 100%;
                            right: -150%;
                            left: -150%;
                        }
                    `}
                    :first-of-type {
                        margin-top: 0;
                    }
                    /* &:last-of-type:not(:first-of-type) {
                        width: 60%;
                    } */
                }
            }
        `;
    })
);
