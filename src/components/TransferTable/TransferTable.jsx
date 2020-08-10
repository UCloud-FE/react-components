import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Transfer from 'src/components/Transfer';
import Table from 'src/components/Table';

import { tableWrapCls } from './style';

class TransferTable extends PureComponent {
    static propTypes = {
        ...Transfer.propTypes,
        /** 表单的 columns */
        columns: PropTypes.array
    };
    renderList = ({ dataSource, selectedKeys, onChange, disabled }) => {
        const { columns } = this.props;
        return (
            <div className={tableWrapCls}>
                <Table
                    customStyle={{ outerPadding: '0 12px 8px 12px' }}
                    dataSource={dataSource}
                    rowSelection={{
                        selectedRowKeys: selectedKeys,
                        onChange,
                        disabled,
                        selectedTip: false
                    }}
                    pagination={null}
                    columns={columns}
                    scroll={{ y: 300 }}
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
