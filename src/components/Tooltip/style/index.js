import styled, { css } from 'styled-components';
import _ from 'lodash';

import { Color } from 'src/style';
/* stylelint-disable property-no-unknown,no-duplicate-selectors */

const arrowWidth = '6px';
const borderWidth = '1px';

export const ContentWrap = styled.div`
    padding: 8px 10px;
    text-align: left;
    text-decoration: none;
    border-radius: 3px;

    ${({ theme }) => css`
        background-color: ${theme.content.background};
        border: ${borderWidth} solid ${theme.content.borderColor};
        color: ${theme.content.color};
    `};
`;

const arrowMixin = css`
    display: inline-block;
    position: absolute;
    width: 0;
    height: 0;
    border-width: 0;
    border-color: transparent;
    border-style: solid;
`;

export const Arrow = styled.span`
    ${arrowMixin};
`;
export const ArrowInner = styled.span`
    ${arrowMixin};
`;

const Position = ['top', 'right', 'bottom', 'left'];

const offsetPosition = (position, offset) => {
    const index = _.findIndex(Position, p => p === position);
    return Position[(index + offset) % 4];
};

export const TooltipWrap = styled.div`
    ${({ placement, theme }) => {
        let position = placement.match(/([a-z]+)[A-Z]*/);
        if (!position) return;
        position = position[1];

        return css`
            ${Arrow} {
                ${offsetPosition(position, 2)}: -${arrowWidth};
                margin-${offsetPosition({ bottom: 'top', left: 'right' }[position] || position, 3)}: -${arrowWidth};
                border-${position}-width: ${arrowWidth};
                border-${offsetPosition(position, 1)}-width: ${arrowWidth};
                border-${offsetPosition(position, 3)}-width: ${arrowWidth};

                border-${position}-color: ${theme.arrow.borderColor};
            }

            ${ArrowInner} {
                ${offsetPosition(position, 2)}: ${borderWidth};
                margin-${offsetPosition({ bottom: 'top', left: 'right' }[position] || position, 3)}: -${arrowWidth};
                border-${position}-width: ${arrowWidth};
                border-${offsetPosition(position, 1)}-width: ${arrowWidth};
                border-${offsetPosition(position, 3)}-width: ${arrowWidth};

                border-${position}-color: ${theme.arrow.background};
            }
        `;
    }};

    ${({ placement }) => {
        let position = placement.match(/([a-z]+)([A-Za-z]*)/);
        if (!position || position[2]) return;
        position = position[1];

        return css`
            ${Arrow} {
                ${offsetPosition({ bottom: 'top', left: 'right' }[position] || position, 3)}: 50%;
            }
        `;
    }};
    ${({ placement }) =>
        /Left$/.test(placement) &&
        css`
            ${Arrow} {
                left: 15%;
            }
        `};
    ${({ placement }) =>
        /Right$/.test(placement) &&
        css`
            ${Arrow} {
                right: 15%;
            }
        `};
    ${({ placement }) =>
        /Top$/.test(placement) &&
        css`
            ${Arrow} {
                top: 15%;
                margin-top: 0;
            }
        `};
    ${({ placement }) =>
        /Bottom$/.test(placement) &&
        css`
            ${Arrow} {
                bottom: 15%;
            }
        `};
`;

export const themeMap = {
    light: {
        arrow: {
            background: Color.bg.white,
            borderColor: Color.border.default
        },
        content: {
            background: Color.bg.white,
            borderColor: Color.border.default,
            color: Color.font.default
        }
    },
    dark: {
        arrow: {
            background: Color.bg.black,
            borderColor: Color.border.black
        },
        content: {
            background: Color.bg.black,
            borderColor: Color.border.black,
            color: Color.font.white
        }
    }
};
