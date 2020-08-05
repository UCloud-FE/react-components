import styled from 'styled-components';

import config from 'src/config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-editable-list';

export const liGridCls = prefixCls + '-li-grid';
export const liCls = prefixCls + '-li';
export const itemCls = prefixCls + '-item';
export const actionCls = prefixCls + '-action';

export const ListWrap = styled('div')`
    > .${liCls}+.${liCls} {
        margin-top: 16px;
    }
    > .${liGridCls}+.${liGridCls} {
        margin-top: 16px;
    }
    .${liCls} {
        .${itemCls}, .${actionCls} {
            display: inline-block;
        }
        .${actionCls} {
            margin-left: 24px;
        }
    }
`;
