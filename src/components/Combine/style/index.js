import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-combine';

export const itemPrefix = prefixCls + '-item';

const spacingMap = {
    compact: '-1px',
    sm: '8px',
    md: '12px',
    lg: '12px'
};

export const CombineWrap = withProps({
    className: prefixCls
})(
    styled('div')(props => {
        const { spacing } = props;

        return css`
            position: relative;

            > .${itemPrefix} {
                vertical-align: middle;
                display: inline-block;
            }
            > .${itemPrefix}+.${itemPrefix} {
                margin-left: ${spacingMap[spacing] || spacing};

                &:focus {
                    z-index: 2;
                }
                &:hover {
                    z-index: 3;
                }
            }
        `;
    })
);
