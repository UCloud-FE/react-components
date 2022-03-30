import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import classnames from 'classnames';

function TableHeaderRow({ row, index, height, components, onHeaderRow, prefixCls }) {
    const HeaderRow = components.header.row;
    const HeaderCell = components.header.cell;
    const rowProps = onHeaderRow(
        row.map(cell => cell.column),
        index
    );
    const customStyle = rowProps ? rowProps.style : {};
    const style = { height, ...customStyle };

    return (
        <HeaderRow {...rowProps} style={style}>
            {row.map((cell, i) => {
                let { column, style = {}, className, ...cellProps } = cell;
                const { offset, fixed } = column;
                const customProps = column.onHeaderCell ? column.onHeaderCell(column) : {};
                const { _style = {}, className: _className } = customProps;
                style = { ...style, ..._style };
                className = classnames(className, _className);
                if (column.align) {
                    style.textAlign = column.align;
                }
                if (fixed && offset != null) {
                    style.position = 'sticky';
                    style.zIndex = 2;
                    if (column.fixed === 'left') {
                        style.left = offset;
                        if (column.latestLeftFixed) {
                            className = classnames(className, `${prefixCls}-th-fixed-left-latest`);
                        }
                    } else if (column.fixed === 'right') {
                        style.right = offset;
                        if (column.firstRightFixed) {
                            className = classnames(className, `${prefixCls}-th-fixed-right-first`);
                        }
                    }
                }
                return (
                    <HeaderCell
                        {...cellProps}
                        {...customProps}
                        {...(typeof HeaderCell === 'string' ? {} : { column })}
                        style={style}
                        className={className}
                        key={column.key || column.dataIndex || i}
                    />
                );
            })}
        </HeaderRow>
    );
}

TableHeaderRow.propTypes = {
    row: PropTypes.array,
    index: PropTypes.number,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    components: PropTypes.any,
    onHeaderRow: PropTypes.func,
    prefixCls: PropTypes.string
};

function getRowHeight(state, props) {
    const { fixedColumnsHeadRowsHeight } = state;
    const { columns, rows, fixed } = props;
    const headerHeight = fixedColumnsHeadRowsHeight[0];

    if (!fixed) {
        return null;
    }

    if (headerHeight && columns) {
        if (headerHeight === 'auto') {
            return 'auto';
        }
        return headerHeight / rows.length;
    }
    return null;
}

export default connect((state, props) => {
    return {
        height: getRowHeight(state, props)
    };
})(TableHeaderRow);
