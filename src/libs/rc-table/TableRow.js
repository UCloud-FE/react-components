import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import { polyfill } from 'react-lifecycles-compat';

import TableCell from './TableCell';

class TableRow extends React.Component {
    static propTypes = {
        onRow: PropTypes.func,
        record: PropTypes.object,
        prefixCls: PropTypes.string,
        columns: PropTypes.array,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        index: PropTypes.number,
        rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        className: PropTypes.string,
        indent: PropTypes.number,
        indentSize: PropTypes.number,
        hasExpandIcon: PropTypes.func,
        visible: PropTypes.bool.isRequired,
        store: PropTypes.object.isRequired,
        fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        renderExpandIcon: PropTypes.func,
        renderExpandIconCell: PropTypes.func,
        components: PropTypes.any,
        expandedRow: PropTypes.bool,
        ancestorKeys: PropTypes.array.isRequired
    };

    static defaultProps = {
        onRow() {},
        onHover() {},
        hasExpandIcon() {},
        renderExpandIcon() {},
        renderExpandIconCell() {}
    };

    constructor(props) {
        super(props);

        this.shouldRender = props.visible;

        this.state = {};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.visible || (!prevState.visible && nextProps.visible)) {
            return {
                shouldRender: true,
                visible: nextProps.visible
            };
        }
        return {
            visible: nextProps.visible
        };
    }

    componentDidMount() {
        if (this.state.shouldRender) {
            this.saveRowRef();
        }
    }

    shouldComponentUpdate(nextProps) {
        return !!(this.props.visible || nextProps.visible);
    }

    componentDidUpdate() {
        if (this.state.shouldRender && !this.rowRef) {
            this.saveRowRef();
        }
    }

    setExpanedRowHeight() {
        const { store, rowKey } = this.props;
        let { expandedRowsHeight } = store.getState();
        const height = this.rowRef.getBoundingClientRect().height;
        expandedRowsHeight = {
            ...expandedRowsHeight,
            [rowKey]: height
        };
        store.setState({ expandedRowsHeight });
    }

    setRowHeight() {
        const { store, rowKey } = this.props;
        const { fixedColumnsBodyRowsHeight } = store.getState();
        const height = this.rowRef.getBoundingClientRect().height;
        store.setState({
            fixedColumnsBodyRowsHeight: {
                ...fixedColumnsBodyRowsHeight,
                [rowKey]: height
            }
        });
    }

    getStyle() {
        const { height, visible } = this.props;

        if (height && height !== this.style.height) {
            this.style = { ...this.style, height };
        }

        if (!visible && !this.style.display) {
            this.style = { ...this.style, display: 'none' };
        }

        return this.style;
    }

    saveRowRef() {
        // eslint-disable-next-line react/no-find-dom-node
        this.rowRef = ReactDOM.findDOMNode(this);

        const { fixed, expandedRow, ancestorKeys } = this.props;

        if (!fixed && expandedRow) {
            this.setExpanedRowHeight();
        }

        if (!fixed && ancestorKeys.length >= 0) {
            this.setRowHeight();
        }
    }

    render() {
        if (!this.state.shouldRender) {
            return null;
        }

        const {
            prefixCls,
            columns,
            record,
            rowKey,
            index,
            onRow,
            indent,
            indentSize,
            height,
            visible,
            components,
            hasExpandIcon,
            renderExpandIcon,
            renderExpandIconCell
        } = this.props;

        const BodyRow = components.body.row;
        const BodyCell = components.body.cell;

        const { className } = this.props;

        const cells = [];

        renderExpandIconCell(cells);

        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            cells.push(
                <TableCell
                    prefixCls={prefixCls}
                    record={record}
                    indentSize={indentSize}
                    indent={indent}
                    index={index}
                    column={column}
                    key={column.key || column.dataIndex}
                    expandIcon={hasExpandIcon(i) && renderExpandIcon()}
                    component={BodyCell}
                />
            );
        }

        const rowClassName = `${prefixCls} ${className} ${prefixCls}-level-${indent}`.trim();

        const rowProps = onRow(record, index);
        const customStyle = rowProps ? rowProps.style : {};
        let style = { height };

        if (!visible) {
            style.display = 'none';
        }

        style = { ...style, ...customStyle };

        return (
            <BodyRow className={rowClassName} {...rowProps} style={style} data-row-key={rowKey}>
                {cells}
            </BodyRow>
        );
    }
}

function getRowHeight(state, props) {
    const { expandedRowsHeight, fixedColumnsBodyRowsHeight } = state;
    const { fixed, rowKey } = props;

    if (!fixed) {
        return null;
    }

    if (expandedRowsHeight[rowKey]) {
        return expandedRowsHeight[rowKey];
    }

    if (fixedColumnsBodyRowsHeight[rowKey]) {
        return fixedColumnsBodyRowsHeight[rowKey];
    }

    return null;
}

polyfill(TableRow);

export default connect((state, props) => {
    const { expandedRowKeys } = state;
    const { ancestorKeys } = props;
    const visible = ancestorKeys.length === 0 || ancestorKeys.every(k => ~expandedRowKeys.indexOf(k));

    return {
        visible,
        height: getRowHeight(state, props)
    };
})(TableRow);
