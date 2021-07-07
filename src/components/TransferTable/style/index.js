import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import withProps from 'src/utils/withProps';
import { prefixCls as tablePrefixCls } from 'src/components/Table/style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-transfer-table';

export const tableWrapCls = prefixCls + '-table-wrap';

export const SWrap = withProps({
    className: tableWrapCls
})(
    styled('div')(() => {
        return css`
            .${tablePrefixCls}-row[data-disabled] {
                td {
                    opacity: 0.4;
                }
                td.${tablePrefixCls}-row-select-icon-cell {
                    opacity: 1;
                }
            }
        `;
    })
);
