import React from 'react';
import PropTypes from 'prop-types';
import { INTERNAL_COL_DEFINE } from './utils';

export default function ColGroup(props, { table }) {
    const { prefixCls, expandIconAsCell } = table.props;

    let cols = [];

    if (expandIconAsCell) {
        cols.push(<col className={`${prefixCls}-expand-icon-col`} key="rc-table-expand-icon-col" />);
    }

    const leafColumns = table.columnManager.leafColumns();

    cols = cols.concat(
        leafColumns.map(c => {
            return <col key={c.key || c.dataIndex} style={{ width: c.width }} {...c[INTERNAL_COL_DEFINE]} />;
        })
    );

    return <colgroup>{cols}</colgroup>;
}

ColGroup.contextTypes = {
    table: PropTypes.any
};
