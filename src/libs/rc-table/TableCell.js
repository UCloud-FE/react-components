import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import classnames from 'classnames';

function isInvalidRenderCellText(text) {
    return text && !React.isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]';
}

export default class TableCell extends React.Component {
    static propTypes = {
        record: PropTypes.object,
        prefixCls: PropTypes.string,
        index: PropTypes.number,
        indent: PropTypes.number,
        indentSize: PropTypes.number,
        column: PropTypes.object,
        expandIcon: PropTypes.node,
        component: PropTypes.any
    };

    render() {
        const { record, indentSize, prefixCls, indent, index, expandIcon, column, component: BodyCell } = this.props;
        let { dataIndex, render, className = '', offset } = column;

        // We should return undefined if no dataIndex is specified, but in order to
        // be compatible with object-path's behavior, we return the record object instead.
        let text;
        if (typeof dataIndex === 'number') {
            text = get(record, dataIndex);
        } else if (!dataIndex || dataIndex.length === 0) {
            text = record;
        } else {
            text = get(record, dataIndex);
        }
        let tdProps = {};
        let colSpan;
        let rowSpan;

        if (render) {
            text = render(text, record, index);
            if (isInvalidRenderCellText(text)) {
                tdProps = text.props || tdProps;
                colSpan = tdProps.colSpan;
                rowSpan = tdProps.rowSpan;
                text = text.children;
            }
        }

        if (column.onCell) {
            tdProps = { ...tdProps, ...column.onCell(record) };
        }

        // Fix https://github.com/ant-design/ant-design/issues/1202
        if (isInvalidRenderCellText(text)) {
            text = null;
        }

        const indentText = expandIcon ? (
            <span
                style={{ paddingLeft: `${indentSize * indent}px` }}
                className={`${prefixCls}-indent indent-level-${indent}`}
            />
        ) : null;

        if (rowSpan === 0 || colSpan === 0) {
            return null;
        }

        let { style = {}, className: _className } = tdProps;
        style = { ...style };
        className = classnames(className, _className);
        if (column.align) {
            style.textAlign = column.align;
        }

        if (column.fixed && offset != null) {
            className = classnames(className, `${prefixCls}-cell-fixed`);
            style.position = 'sticky';
            style.zIndex = 2;
            if (column.fixed === 'left') {
                style.left = offset;
                if (column.latestLeftFixed) {
                    className = classnames(className, `${prefixCls}-cell-fixed-left-latest`);
                }
            } else if (column.fixed === 'right') {
                style.right = offset;
                if (column.firstRightFixed) {
                    className = classnames(className, `${prefixCls}-cell-fixed-right-first`);
                }
            }
        }

        return (
            <BodyCell {...tdProps} className={className} style={style}>
                {indentText}
                {expandIcon}
                {text}
            </BodyCell>
        );
    }
}
