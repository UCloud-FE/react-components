import React from 'react';
import Table from 'components/Table';

// demo start
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        rowSelection={{
                            defaultSelectedRowKeys: [1, 2, 4, 5],
                            onChange: console.log,
                            getDisabledOfRow: record => record.key < 4
                        }}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        rowSelection={{
                            multiple: false,
                            defaultSelectedRowKeys: [1],
                            onChange: console.log,
                            getDisabledOfRow: record => record.key < 4
                        }}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
