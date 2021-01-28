import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import styledWrap, { DesignToken } from 'src/utils/styledWrap';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-combine';

export const itemCls = prefixCls + '-item';
export const separatorCls = prefixCls + '-separator';

const spacingMap = {
    sm: 'T_SPACING_COMMON_XS' as DesignToken,
    md: 'T_SPACING_COMMON_SM' as DesignToken,
    lg: 'T_SPACING_COMMON_MD' as DesignToken
};

const isBuildInSpacing = (spacing: string): spacing is keyof typeof spacingMap => {
    return Object.prototype.hasOwnProperty.call(spacingMap, spacing);
};

export const CombineWrap = styledWrap<{ spacing: string }>({
    className: prefixCls
})(
    styled('div')(props => {
        const {
            spacing,
            theme: { designTokens: DT }
        } = props;
        let space: string;
        if (spacing === 'compact') {
            space = '-1px';
        } else if (isBuildInSpacing(spacing)) {
            space = DT[spacingMap[spacing]];
        } else {
            space = spacing;
        }

        return css`
            > .${itemCls}, > .${separatorCls} {
                vertical-align: middle;
                display: inline-block;
            }
            > .${itemCls} {
                &:focus {
                    z-index: 2;
                }
                &:hover {
                    z-index: 3;
                }
            }
            > .${itemCls}+.${itemCls}, > .${separatorCls}+.${itemCls}, > .${itemCls}+.${separatorCls} {
                margin-left: ${space};
            }
        `;
    })
);
