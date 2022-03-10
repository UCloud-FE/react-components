import type { CSSProperties } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import {
    execSizeCal,
    getControlFontSizeBySize,
    getControlHeightBySize,
    getControlSpacingBySize,
    Size,
    sWrap
} from 'src/style';

export interface InputWrapProps {
    size: Size;
    focused?: boolean;
    disabled?: boolean;
    cursor?: CSSProperties['cursor'];
    block?: boolean;
}

export const InputPart = styled.span``;

const InputWrap = sWrap<InputWrapProps, HTMLSpanElement>({})(
    styled('span', { shouldForwardProp: prop => isPropValid(prop) && prop !== 'cursor' })(props => {
        const {
            theme: { designTokens: DT },
            focused,
            disabled,
            size,
            cursor,
            block
        } = props;
        const height = getControlHeightBySize(DT, size);
        const fontSize = getControlFontSizeBySize(DT, size);
        const spacing = getControlSpacingBySize(DT, size);
        const halfSpacing = execSizeCal(spacing, '/2');

        return css`
            position: relative;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            height: ${height};
            max-width: 100%;
            font-size: ${fontSize};
            border-radius: ${DT.T_CORNER_SM};
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            fill: currentColor;
            border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
            box-shadow: ${DT.T_SHADOW_INSET_DEFAULT};
            background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
            transition: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
            vertical-align: middle;
            cursor: ${cursor};
            &,
            input,
            ${InputPart} {
                padding: 0 ${halfSpacing};
            }

            :hover {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
            }

            ${block &&
            css`
                display: flex;
            `}

            ${focused &&
            !disabled &&
            css`
                && {
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                    background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
                }
            `};

            ${disabled &&
            css`
                box-shadow: none;
                cursor: default;
                &,
                &:hover {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    /* fix disabled color in safari */
                    -webkit-text-fill-color: ${DT.T_COLOR_TEXT_DISABLED};
                    border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                }
            `};

            ${status === 'error' &&
            css`
                &&& {
                    box-shadow: ${DT.T_SHADOW_INSET_ERROR};
                    border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
                    background: ${DT.T_COLOR_BG_ERROR_LIGHT};
                }
            `};

            input {
                box-sizing: border-box;
                height: 100%;
                margin: 0;
                font-size: inherit;
                color: inherit;
                flex: 1 1 130px;
                min-width: 0px;
                &,
                &:hover,
                &:focus {
                    border: none;
                    outline: none;
                    background: none;
                }
                &::placeholder {
                    opacity: 1;
                    color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                }
                &::-ms-clear {
                    display: none;
                }
            }

            ${InputPart} {
                display: inline-flex;
                height: 100%;
                align-items: center;
                flex: 0 0 auto;
                :empty {
                    display: none;
                }
            }
        `;
    })
);

export default InputWrap;
