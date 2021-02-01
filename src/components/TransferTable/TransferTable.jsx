import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Transfer from 'src/components/Transfer';
import Table from 'src/components/Table';

import { tableWrapCls } from './style';

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
    renderList = ({ dataSource, selectedKeys, onChange, disabled }) => {
        const { columns, tableProps, getDisabledOfRow } = this.props;
        return (
            <div className={tableWrapCls}>
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
                    pagination={null}
                    columns={columns}
                    scroll={{ ...tableProps?.scroll, y: 300 }}
                />
            </div>
        );
    };
    render() {
        const { ...rest } = this.props;
        return <Transfer {...rest} renderList={this.renderList} />;
    }
}

export default TransferTable;
