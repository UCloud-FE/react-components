import React from 'react';
import PropTypes from 'prop-types';
import Table from 'src/components/Table';
import _ResizableTH from 'src/components/Table/ResizableTH';

Table.ResizableTH = _ResizableTH;

// demo start
const { ResizableTH } = Table;
class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        const columns = new Array(4).fill(null).map((v, i) => {
            const onResize = w => this.handleResize(i, w);
            return {
                title: `title - ${i}`,
                key: `title-${i}`,
                width: 150,
                onHeaderCell: column => ({
                    width: column.width,
                    resizeAble: true,
                    maxWidth: 300,
                    minWidth: 50,
                    onResize
                }),
                render: record => <span>content {record.index}</span>
            };
        });
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
    handleResize(i, width) {
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
                        scroll={{
                            x: true,
                            y: this.props.y
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
Demo1.propTypes = { y: PropTypes.any };
const Demo = () => {
    return (
        <>
            <Demo1 />
            <Demo1 y={300} />
        </>
    );
};
// demo end

export default Demo;
