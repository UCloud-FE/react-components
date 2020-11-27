import _ from 'lodash';

import checkStickySupport from 'src/utils/checkStickySupport';
import warning from 'src/utils/warning';

const supportSticky = checkStickySupport();

export default class ColumnManager {
    _cached = {};

    constructor(columns) {
        this.reset(columns);
    }

    leafColumns() {
        return this._cache('leafColumns', () => this._leafColumns(this.columns));
    }

    // add appropriate rowspan and colspan to column
    groupedColumns() {
        return this._cache('groupedColumns', () => {
            const _groupColumns = (columns, currentRow = 0, parentColumn = {}, rows = []) => {
                // track how many rows we got
                rows[currentRow] = rows[currentRow] || [];
                const grouped = [];
                const setRowSpan = column => {
                    const rowSpan = rows.length - currentRow;
                    if (
                        column &&
                        !column.children && // parent columns are supposed to be one row
                        rowSpan > 1 &&
                        (!column.rowSpan || column.rowSpan < rowSpan)
                    ) {
                        column.rowSpan = rowSpan;
                    }
                };
                columns.forEach((column, index) => {
                    const newColumn = { ...column };
                    rows[currentRow].push(newColumn);
                    parentColumn.colSpan = parentColumn.colSpan || 0;
                    if (newColumn.children && newColumn.children.length > 0) {
                        newColumn.children = _groupColumns(newColumn.children, currentRow + 1, newColumn, rows);
                        parentColumn.colSpan += newColumn.colSpan;
                    } else {
                        parentColumn.colSpan++;
                    }
                    // update rowspan to all same row columns
                    for (let i = 0; i < rows[currentRow].length - 1; ++i) {
                        setRowSpan(rows[currentRow][i]);
                    }
                    // last column, update rowspan immediately
                    if (index + 1 === columns.length) {
                        setRowSpan(newColumn);
                    }
                    grouped.push(newColumn);
                });
                return grouped;
            };
            return _groupColumns(this.columns);
        });
    }

    reset(columns) {
        if (supportSticky) {
            columns = [...columns];
            let leftOffset = 0,
                leftPos = 0;
            for (; leftPos < columns.length; leftPos++) {
                const column = { ...columns[leftPos] };
                if (column.fixed === 'left' || column.fixed === true) {
                    if (leftOffset === false) {
                        warning(`every left fixed columns before the latest should have a valid width`);
                        break;
                    }
                    column.offset = leftOffset;
                    column.fixed = 'left';
                    if (column.width) {
                        leftOffset += column.width;
                    } else {
                        leftOffset = false;
                    }
                    columns[leftPos] = column;
                } else {
                    break;
                }
            }
            if (leftPos > 0) columns[leftPos - 1].latestLeftFixed = true;

            let rightOffset = 0,
                rightPos = columns.length - 1;
            for (; rightPos > 0; rightPos--) {
                const column = { ...columns[rightPos] };
                if (column.fixed === 'right' || column.fixed === true) {
                    if (rightOffset === false) {
                        warning(`every right fixed columns after the first should have a valid width`);
                        break;
                    }
                    column.offset = rightOffset;
                    column.fixed = 'right';
                    if (column.width) {
                        rightOffset += column.width;
                    } else {
                        rightOffset = false;
                    }
                    columns[rightPos] = column;
                } else {
                    break;
                }
            }
            if (rightPos < columns.length - 1) columns[rightPos + 1].firstRightFixed = true;
        }
        this.columns = columns;
        this._cached = {};
    }

    _cache(name, fn) {
        if (name in this._cached) {
            return this._cached[name];
        }
        this._cached[name] = fn();
        return this._cached[name];
    }

    _leafColumns(columns) {
        const leafColumns = [];
        columns.forEach(column => {
            if (!column.children) {
                leafColumns.push(column);
            } else {
                leafColumns.push(...this._leafColumns(column.children));
            }
        });
        return leafColumns;
    }
}
