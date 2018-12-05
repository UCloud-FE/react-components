import styled, { css } from 'styled-components';
import _ from 'lodash';

/* stylelint-disable property-no-unknown,no-duplicate-selectors */
const arrowWidth = '6px';
const borderWidth = '1px';

export const ContentWrap = styled.div(({ theme: { Tooltip: tooltipTheme }, themeType }) => {
    tooltipTheme = tooltipTheme[themeType];
    return css`
        padding: 8px 10px;
        text-align: left;
        text-decoration: none;
        border-radius: 3px;

        background-color: ${tooltipTheme.content.background};
        border: ${borderWidth} solid ${tooltipTheme.content.border};
        color: ${tooltipTheme.content.text};
    `;
});

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

export const TooltipWrap = styled.div(({ theme: { Tooltip: tooltipTheme }, themeType, placement }) => {
    tooltipTheme = tooltipTheme[themeType];
    let positions = placement.match(/([a-z]+)([A-Za-z]*)/);
    return css`
        ${() => {
            if (!positions) return;
            let position = positions[1];

            return css`
            ${Arrow} {
                ${offsetPosition(position, 2)}: -${arrowWidth};
                margin-${offsetPosition({ bottom: 'top', left: 'right' }[position] || position, 3)}: -${arrowWidth};
                border-${position}-width: ${arrowWidth};
                border-${offsetPosition(position, 1)}-width: ${arrowWidth};
                border-${offsetPosition(position, 3)}-width: ${arrowWidth};

                border-${position}-color: ${tooltipTheme.arrow.border};
            }

            ${ArrowInner} {
                ${offsetPosition(position, 2)}: ${borderWidth};
                margin-${offsetPosition({ bottom: 'top', left: 'right' }[position] || position, 3)}: -${arrowWidth};
                border-${position}-width: ${arrowWidth};
                border-${offsetPosition(position, 1)}-width: ${arrowWidth};
                border-${offsetPosition(position, 3)}-width: ${arrowWidth};

                border-${position}-color: ${tooltipTheme.arrow.background};
            }
        `;
        }};

        ${() => {
            if (!positions || positions[2]) return;
            let position = positions[1];

            return css`
                ${Arrow} {
                    ${offsetPosition({ bottom: 'top', left: 'right' }[position] || position, 3)}: 50%;
                }
            `;
        }};
        ${/Left$/.test(placement) &&
            css`
                ${Arrow} {
                    left: 15%;
                }
            `};
        ${/Right$/.test(placement) &&
            css`
                ${Arrow} {
                    right: 15%;
                }
            `};
        ${/Top$/.test(placement) &&
            css`
                ${Arrow} {
                    top: 15%;
                    margin-top: 0;
                }
            `};
        ${/Bottom$/.test(placement) &&
            css`
                ${Arrow} {
                    bottom: 15%;
                }
            `};
    `;
});
