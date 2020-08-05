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

        > .${controllerPrefix} {
            vertical-align: middle;
            display: inline-block;
        }
        > .${controllerPrefix}+.${controllerPrefix} {
            margin-left: ${spacingMap[spacing] || spacing};

            &:focus {
                z-index: 2;
            }
            &:hover {
                z-index: 3;
            }
        }
    `
);
