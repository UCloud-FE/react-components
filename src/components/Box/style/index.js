import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-box';

const spacingMap = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xlg: 20,
    xxlg: 24
};

const maxColumns = 12;

const percentage = v => {
    return +(v * 100).toFixed(8) + '%';
};

export const BoxWrap = withProps({
    className: prefixCls
})(
    styled('div')(props => {
        const {
            spacing,
            direction,
            wrap,
            justifyContent,
            alignItems,
            alignContent,
            span,
            flex,
            order,
            container,
            width,
            height,
            padding
        } = props;
        const isVertical = direction === 'column' || direction === 'column-reverse';

        let margin = [],
            boxMargin = [],
            cleanMargin = [],
            hSpace = null,
            vSpace = null;
        if (Array.isArray(spacing)) {
            [hSpace, vSpace] = spacing;
        } else if (spacing != null) {
            if (isVertical) {
                vSpace = spacing;
            } else {
                hSpace = spacing;
            }
        }
        hSpace = spacingMap[hSpace] || hSpace;
        if (hSpace != null) {
            hSpace = hSpace / 2;
            margin.push(css`
                margin-right: ${hSpace}px;
                margin-left: ${hSpace}px;
            `);
            boxMargin.push(css`
                padding-right: ${hSpace}px;
                padding-left: ${hSpace}px;
                margin-right: 0;
                margin-left: 0;
            `);
            cleanMargin.push(css`
                margin-right: -${hSpace}px;
                margin-left: -${hSpace}px;
            `);
        }
        vSpace = spacingMap[vSpace] || vSpace;
        if (vSpace != null) {
            margin.push(css`
                margin-bottom: ${vSpace}px;
            `);
            boxMargin.push(css`
                padding-bottom: ${vSpace}px;
                margin-bottom: 0;
            `);
            cleanMargin.push(css`
                margin-bottom: -${vSpace}px;
            `);
        }
        let boxPadding = [];
        if (padding) {
            if (typeof padding === 'string' || typeof padding === 'number') {
                boxPadding.push(css`
                    padding: ${spacingMap[padding] ? spacingMap[padding] + 'px' : padding};
                `);
            } else if (Array.isArray(padding)) {
                let [hP, vP] = padding;
                vP = spacingMap[vP] ? spacingMap[vP] + 'px' : vP;
                if (vP) {
                    boxPadding.push(css`
                        padding-top: ${vP};
                        padding-bottom: ${vP};
                    `);
                }
                hP = spacingMap[hP] ? spacingMap[hP] + 'px' : hP;
                if (hP) {
                    boxPadding.push(css`
                        padding-left: ${hP};
                        padding-right: ${hP};
                    `);
                }
            }
        }
        return css`
            box-sizing: border-box;

            ${
                container &&
                css`
                    display: flex;
                `
            }
            ${
                span != null &&
                css`
                    width: ${percentage(span / maxColumns)};
                `
            }
            ${
                flex != null &&
                css`
                    flex: ${flex};
                `
            }
            ${
                order != null &&
                css`
                    order: ${order};
                `
            }
            ${
                wrap != null &&
                css`
                    flex-wrap: ${wrap};
                `
            }
            ${
                direction != null &&
                css`
                    flex-direction: ${direction};
                `
            }
            ${
                justifyContent != null &&
                css`
                    justify-content: ${justifyContent};
                `
            }
            ${
                alignItems != null &&
                css`
                    align-items: ${alignItems};
                `
            }
            ${
                alignContent != null &&
                css`
                    align-content: ${alignContent};
                `
            }
            ${
                width &&
                css`
                    width: ${width};
                `
            }
            ${
                height &&
                css`
                    height: ${height};
                `
            }
            ${boxPadding};
            ${cleanMargin};

            &&&>* {
                ${margin};
                &.${prefixCls} {
                    ${boxMargin};
                }
            }
        `;
    })
);
