import styled from 'styled-components';

import config from 'config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-compact';

export const controllerPrefix = prefixCls + '-controller';

export const CompactWrap = styled.div`
    position: relative;
    z-index: 1;
    margin-left: 1px;

    .${controllerPrefix} {
        vertical-align: bottom;
        display: inline-block;
        margin-left: -1px;

        &:focus {
            z-index: 2;
        }
        &:hover {
            z-index: 3;
        }
    }
`;
