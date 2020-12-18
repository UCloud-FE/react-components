import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import classNames from 'classnames';

import ColGroup from './ColGroup';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import ExpandableRow from './ExpandableRow';

class BaseTable extends React.Component {
    static propTypes = {
        fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        columns: PropTypes.array.isRequired,
        tableClassName: PropTypes.string.isRequired,
        hasHead: PropTypes.bool.isRequired,
        hasBody: PropTypes.bool.isRequired,
        store: PropTypes.object.isRequired,
        expander: PropTypes.object.isRequired,
        getRowKey: PropTypes.func,
        tableLayout: PropTypes.oneOf(['fixed', 'auto'])
    };

    static contextTypes = {
        table: PropTypes.any
    };

    getColumns(cols) {
        const { columns = [] } = this.props;
        const { table } = this.context;
        const { prefixCls } = table.props;
        return (cols || columns).map(column => ({
            ...column,
            className: column.fixed
                ? classNames(`${prefixCls}-fixed-columns-in-body`, column.className)
                : column.className
        }));
    }

    renderRows = (renderData, indent, ancestorKeys = []) => {
        const { table } = this.context;
        const { columnManager, components } = table;
        const { prefixCls, childrenColumnName, rowClassName, rowRef, onRow } = table.props;
        const { getRowKey, expander } = this.props;

        const rows = [];

        for (let i = 0; i < renderData.length; i++) {
            const record = renderData[i];
            const key = getRowKey(record, i);
            const className = typeof rowClassName === 'string' ? rowClassName : rowClassName(record, i, indent);

            const leafColumns = this.getColumns(columnManager.leafColumns());

            const rowPrefixCls = `${prefixCls}-row`;

            const row = (
                <ExpandableRow
                    {...expander.props}
                    index={i}
                    prefixCls={rowPrefixCls}
                    record={record}
                    key={key}
                    rowKey={key}
                    needIndentSpaced={expander.needIndentSpaced}
                    onExpandedChange={expander.handleExpandChange}
                >
                    {(
                        expandableRow // eslint-disable-line
                    ) => (
                        <TableRow
                            indent={indent}
                            className={className}
                            record={record}
                            index={i}
                            prefixCls={rowPrefixCls}
                            childrenColumnName={childrenColumnName}
                            columns={leafColumns}
                            onRow={onRow}
                            rowKey={key}
                            ancestorKeys={ancestorKeys}
                            ref={rowRef(record, i, indent)}
                            components={components}
                            {...expandableRow}
                        />
                    )}
                </ExpandableRow>
            );

            rows.push(row);

            expander.renderRows(this.renderRows, rows, record, i, indent, key, ancestorKeys);
        }
        return rows;
    };

    render() {
        const { table } = this.context;
        const { components } = table;
        const { prefixCls, scroll, data } = table.props;
        const { expander, tableClassName, hasHead, hasBody, fixed, tableLayout } = this.props;
        const tableStyle = {};

        if (!fixed && scroll.x && scroll.x !== true) {
            tableStyle.width = scroll.x;
        }
        if (tableLayout === 'fixed') {
            tableStyle.tableLayout = 'fixed';
        }
        const Table = hasBody ? components.table : 'table';
        const BodyWrapper = components.body.wrapper;

        let body;
        if (hasBody) {
            body = <BodyWrapper className={`${prefixCls}-tbody`}>{this.renderRows(data, 0)}</BodyWrapper>;
        }

        const columns = this.getColumns();

        return (
            <Table className={tableClassName} style={tableStyle} key="table">
                <ColGroup columns={columns} fixed={fixed} />
                {hasHead && <TableHeader expander={expander} columns={columns} fixed={fixed} />}
                {body}
            </Table>
        );
    }
}

export default connect()(BaseTable);
