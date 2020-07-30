import React from 'react';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';

export default function BodyTable(props, { table }) {
    const { prefixCls, scroll } = table.props;
    const { columns, tableClassName, getRowKey, handleBodyScroll, expander, tableLayout } = props;
    const { saveRef } = table;
    let { useFixedHeader } = table.props;
    const bodyStyle = { ...table.props.bodyStyle };

    if (scroll.x) {
        bodyStyle.overflowX = bodyStyle.overflowX || 'scroll';
        // Fix weired webkit render bug
        // https://github.com/ant-design/ant-design/issues/7783
        bodyStyle.WebkitTransform = 'translate3d (0, 0, 0)';
    }

    if (scroll.y) {
        // maxHeight will make fixed-Table scrolling not working
        // so we only set maxHeight to body-Table here
        bodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
        bodyStyle.overflowY = bodyStyle.overflowY || 'scroll';
        useFixedHeader = true;
    }

    const baseTable = (
        <BaseTable
            tableClassName={tableClassName}
            hasHead={!useFixedHeader}
            hasBody
            columns={columns}
            expander={expander}
            getRowKey={getRowKey}
            tableLayout={tableLayout}
        />
    );

    return (
        <div
            key="bodyTable"
            className={`${prefixCls}-body`}
            style={bodyStyle}
            ref={saveRef('bodyTable')}
            onScroll={handleBodyScroll}
        >
            {baseTable}
        </div>
    );
}

BodyTable.propTypes = {
    columns: PropTypes.array.isRequired,
    tableClassName: PropTypes.string.isRequired,
    handleBodyScroll: PropTypes.func.isRequired,
    getRowKey: PropTypes.func.isRequired,
    expander: PropTypes.object.isRequired,
    tableLayout: PropTypes.oneOf(['fixed'])
};

BodyTable.contextTypes = {
    table: PropTypes.any
};
