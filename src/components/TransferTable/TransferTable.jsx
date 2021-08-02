import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Transfer from 'src/components/Transfer';
import Table from 'src/components/Table';

import { SWrap } from './style';

const OverPagination = { pageSize: 200, simple: true };

class TransferTable extends PureComponent {
    static propTypes = {
        ...Transfer.propTypes,
        /** 禁用列选择 */
        getDisabledOfRow: PropTypes.func,
        /** 表单的 columns */
        columns: PropTypes.array,
        /** 自定义 table 的 props，如 tableLayout 等，两个 table 共享，部分参数写死无法自定义 */
        tableProps: PropTypes.object
    };
    onRow = record => {
        const { getDisabledOfRow, disabled } = this.props;
        let _disabled;
        if (getDisabledOfRow) {
            _disabled = getDisabledOfRow(record);
        }
        return _disabled || disabled
            ? {
                  'data-disabled': true
              }
            : {};
    };
    renderList = ({ dataSource, selectedKeys, onChange, disabled }) => {
        const { columns, tableProps, getDisabledOfRow, dataSource: fullDataSource } = this.props;
        return (
            <SWrap>
                <Table
                    {...tableProps}
                    customStyle={{ outerPadding: '0 12px 8px 12px' }}
                    dataSource={dataSource}
                    rowSelection={{
                        selectedRowKeys: selectedKeys,
                        onChange,
                        disabled,
                        selectedTip: false,
                        getDisabledOfRow
                    }}
                    pagination={fullDataSource.length > 400 ? OverPagination : null}
                    columns={columns}
                    onRow={this.onRow}
                    scroll={{ ...tableProps?.scroll, y: 300 }}
                />
            </SWrap>
        );
    };
    render() {
        const { ...rest } = this.props;
        return <Transfer {...rest} renderList={this.renderList} />;
    }
}

export default TransferTable;
