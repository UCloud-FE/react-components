import React from 'react';
import Table from 'src/components/Table';
import Pagination from 'src/components/Pagination';
import Loading from 'src/components/Loading';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            seleted: [],
            pagination: {
                total: 0
            }
        };
    }
    componentDidMount() {
        this.fetch({
            current: 1,
            pageSize: 10
        });
    }

    fetch(params) {
        console.log('params: ', params);
        const { current, pageSize } = params;
        this.setState({
            loading: true,
            pagination: {
                ...this.state.pagination,
                current,
                pageSize
            }
        });
        return new Promise(resolve => {
            const data = new Array(pageSize).fill(null).map((v, i) => ({
                index: i + (current - 1) * pageSize,
                children: [1, 2].map((d, j) => ({
                    index: i + (current - 1) * pageSize + '-' + j
                }))
            }));
            setTimeout(() => {
                resolve({
                    dataSource: data,
                    total: 101
                });
            }, 1000);
        }).then(result => {
            this.setState({
                loading: false,
                dataSource: result.dataSource,
                pagination: {
                    ...this.state.pagination,
                    total: result.total
                }
            });
        });
    }
    handlePaginationChange(current, pageSize) {
        this.fetch({
            current,
            pageSize
        });
    }
    render() {
        const { dataSource, pagination, loading, seleted } = this.state;
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Loading loading={loading} tip="Loading ...">
                        <Table
                            pagination={null}
                            rowKey="index"
                            dataSource={dataSource}
                            scroll={{ y: 600 }}
                            columns={columns}
                            rowSelection={{
                                selectedRowKeys: seleted,
                                linkage: true,
                                defaultSelectedRowKeys: [],
                                resetSelected: true,
                                onChange: x => {
                                    console.log('onChange: ', x);

                                    this.setState({
                                        seleted: x
                                    });
                                }
                            }}
                            footer={() => (
                                <Pagination
                                    style={{ marginTop: 10, float: 'right' }}
                                    {...pagination}
                                    showSizeChanger
                                    size="sm"
                                    onChange={(...args) => this.handlePaginationChange(...args)}
                                    onPageSizeChange={(...args) => this.handlePaginationChange(...args)}
                                />
                            )}
                        />
                    </Loading>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
