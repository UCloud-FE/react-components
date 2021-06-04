import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import { sWrap } from 'src/style';
import Loading from 'src/components/Loading';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-auto-complete';
export const inputCls = prefixCls + '-input';
export const loadingIconCls = prefixCls + '-loading-icon';
export const popupWrapCls = prefixCls + '-popup';
export const menuCls = popupWrapCls + '-menu';

export const SWrap = sWrap({
    className: prefixCls
})(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            position: relative;
            display: inline-block;

            .${inputCls} {
                width: 200px;
            }
            .${loadingIconCls} {
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
        `;
    })
);

export const PopupWrap = sWrap<{ loading?: boolean; indicator?: ReactNode }>({
    className: popupWrapCls
})(styled(Loading)`
    .${menuCls} {
        width: 100%;
    }
`);
