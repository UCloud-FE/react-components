import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import styledWrap from 'src/utils/styledWrap';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-link';

export const SLink = styledWrap<unknown, HTMLAnchorElement>({ className: prefixCls })(
    styled.a(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            &,
            &:link,
            &:visited {
                text-decoration: none;
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
            &:hover,
            &:active {
                text-decoration: underline;
                color: ${DT.T_COLOR_TEXT_PRIMARY_HOVER};
            }
        `;
    })
);
