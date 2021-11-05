import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { clearFixMixin } from 'src/style';
import withProps from 'src/utils/withProps';

export const Outer = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            height: 10px;
            background: ${DT.T_PROGRESS_COLOR_BG_DEFAULT};
            border-radius: 5px;
            overflow: hidden;
            position: relative;
        `;
    })
);

export const Inner = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            color,
            percent
        } = props;

        return css`
            width: ${percent}%;
            height: 100%;
            border: none;
            border-radius: 5px;
            transition: width 0.5s;
            position: relative;
            background: ${color
                ? {
                      success: DT.T_COLOR_BG_SUCCESS_DARK,
                      warn: DT.T_COLOR_BG_WARNING_DARK,
                      error: DT.T_COLOR_BG_ERROR_DARK,
                      default: DT.T_COLOR_BG_PRIMARY_1
                  }[color] || color
                : DT.T_COLOR_BG_PRIMARY_1};
        `;
    })
);

export const CurrentText = styled('span')(props => {
    const { percent } = props;

    return css`
        position: relative;
        left: ${percent}%;
        transition: left 0.5s;
        width: 50px;
        margin-left: -25px;
        display: inline-block;
        text-align: center;
    `;
});

export const TextWrap = styled('span')`
    position: relative;
    height: 18px;
    line-height: 18px;

    ${clearFixMixin};
`;

export const EndText = styled('span')`
    float: right;
`;
