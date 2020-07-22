import styled, { css } from 'styled-components';

import config from 'config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-combine';

export const controllerPrefix = prefixCls + '-controller';

const spacingMap = {
    compact: '-1px',
    sm: '8px',
    md: '12px',
    lg: '12px'
};

export const CombineWrap = styled.div.attrs({
    className: prefixCls
})(
    ({ spacing }) => css`
        position: relative;

        > .${controllerPrefix}+.${controllerPrefix} {
            vertical-align: bottom;
            display: inline-block;
            margin-left: ${spacingMap[spacing] || spacing};

            &:focus {
                z-index: 2;
            }
            &:hover {
                z-index: 3;
            }
        }
        > ${CombineWrap} {
            display: inline-block;
        }
    `
);
