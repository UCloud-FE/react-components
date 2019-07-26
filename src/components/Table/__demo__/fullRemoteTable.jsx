import React from 'react';
import _ from 'lodash';

import Table from 'src/components/Table';
import Loading from 'src/components/Loading';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
                onChange: (...args) => this.handlePaginationChange(...args),
                onPageSizeChange: (...args) => this.handlePaginationChange(...args)
            }
        };
    }
    componentDidMount() {
        this.fetch();
    }

    fetch() {
        const {
            order,
            filters,
            searchValue,
            pagination: { current, pageSize }
        } = this.state;

        const params = {
            Order: order,
            Filters: _.map(filters, filter => {
                return {
                    Key: filter.key,
                    Option: filter.value
                };
            }),
            Search: searchValue,
            Current: current,
            Limit: pageSize
        };
        console.log('params: ', params);
        this.setState({
            loading: true
        });
        return new Promise(resolve => {
            const data = new Array(pageSize).fill(null).map((v, i) => {
                const index = i + (current - 1) * pageSize;
                return {
                    index,
                    name: `name - ${index}`,
                    describe: `describe - ${index}`,
                    random: (Math.random() * 1000) | 0
                };
            });
            setTimeout(() => {
                resolve({
                    dataSource: data,
                    total: 1001
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
        this.setState(
            {
                pagination: { ...this.state.pagination, current, pageSize }
            },
            () => {
                this.fetch();
            }
        );
    }
    handleConditionChange(condition) {
        this.setState(
            {
                ...condition
            },
            () => {
                this.fetch();
            }
        );
    }
    render() {
        const { dataSource, pagination, loading } = this.state;

        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                filter: {
                    options: [1, 2, 3, 4]
                },
                order: true
            },
            {
                title: 'describe',
                dataIndex: 'describe',
                key: 'describe',
                width: 200,
                filter: {
                    options: [1, 2, 3, 4],
                    multiple: true
                },
                order: true
            },
            {
                title: 'random',
                key: 'random',
                dataIndex: 'random'
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Loading loading={loading} tip="Loading ...">
                        <Table
                            title={() => {
                                return (
                                    <div className="clear-fixed">
                                        <div style={{ float: 'right' }}>
                                            <Table.SearchInput style={{ marginRight: 8 }} />
                                        </div>
                                    </div>
                                );
                            }}
                            pagination={pagination}
                            rowKey="index"
                            dataSource={dataSource}
                            scroll={{ y: 600 }}
                            columns={columns}
                            onConditionChange={condition => {
                                console.log(condition);
                                this.handleConditionChange(condition);
                            }}
                            doNotHandleCondition
                        />
                    </Loading>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
