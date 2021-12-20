import React from 'react';
import Table from 'src/components/Table';
import _ResizableTH from 'src/components/Table/ResizableTH';

Table.ResizableTH = _ResizableTH;

// demo start
const { ResizableTH } = Table;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        const columns = new Array(4).fill(null).map((v, i) => ({
            title: `title - ${i}`,
            key: `title-${i}`,
            width: 150,
            onHeaderCell: column => ({
                width: column.width,
                resizeAble: true,
                maxWidth: 300,
                minWidth: 50,
                onResize: w => this.onResize(i, w)
            }),
            render: record => <span>content {record.index}</span>
        }));
        columns.push({
            title: `last`,
            key: `title-last`,
            width: 100,
            onHeaderCell: column => ({
                width: column.width,
                resizeAble: false
            }),
            render: record => <span>content {record.index}</span>
        });
        this.state = {
            columns
        };
    }
    onResize(i, width) {
        const { columns } = this.state;
        columns[i].width = width;
        this.setState({
            columns
        });
    }
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const { columns } = this.state;
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        pagination={{
                            defaultCurrent: 3,
                            defaultPageSize: 20
                        }}
                        scroll={{
                            x: true
                        }}
                        components={{ header: { cell: ResizableTH } }}
                        dataSource={dataSource}
                        columns={columns}
                        columnPlaceholder
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
