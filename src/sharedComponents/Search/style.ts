import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import { sWrap } from 'src/style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-shared-search';
export const highlightCls = prefixCls + '-highlight';
export const countCls = prefixCls + '-count';
export const emptyTipCls = prefixCls + '-empty-tip';
export const loadingCls = prefixCls + '-loading';
export const inputCls = prefixCls + '-input';
export const emptyContentCls = prefixCls + '-empty-content';

export const SWrap = sWrap<unknown, HTMLDivElement>({})(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            .${highlightCls} {
                background: ${DT.T_COLOR_BG_HIGHLIGHT};
            }
            .${inputCls} {
                margin-bottom: 8px;
            }
            .${countCls} {
                line-height: 16px;
                padding-left: 8px;
                border-left: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }
            .${emptyTipCls} {
                padding: 8px 0 8px 32px;
            }
            .${loadingCls} {
                height: 36px;
            }
            .${emptyContentCls} {
                display: none;
            }
        `;
    })
);
