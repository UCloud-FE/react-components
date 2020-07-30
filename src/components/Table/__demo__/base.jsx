import React from 'react';
import _ from 'lodash';

import Table from 'src/components/Table';
import Button from 'src/components/Button';
import Menu from 'src/components/Menu';
import Combine from 'src/components/Combine';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
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
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200,
                filter: {
                    options: [1, 2, 3, 4],
                    multiple: true
                },
                order: true
            },
            {
                title: 'Operations',
                dataIndex: '',
                key: 'operation',
                render: (text, record) => (
                    <a onClick={e => this.handleRemove(record.key, e)} href="#">
                        Remove
                    </a>
                )
            }
        ];
        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i + '',
            name: `name-${i}`,
            desc: `desc-${i}`
        }));
        this.state = {
            data,
            selectedRowKeys: []
        };
    }
    handleRemove(key, e) {
        console.log('Remove', key);
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data });
        this.setState({
            selectedRowKeys: this.state.selectedRowKeys.filter(_key => _key !== key)
        });
    }
    handleAdd() {
        const data = [...this.state.data];
        const key = Date.now();
        data.unshift({
            name: `name-${key}`,
            desc: `desc-${key}`,
            key: Date.now()
        });
        this.setState({ data });
    }
    handleRemoveSelected() {
        const { selectedRowKeys } = this.state;
        const data = this.state.data.filter(record => _.findIndex(selectedRowKeys, key => key === '' + record.key) < 0);
        this.setState({ data });
        this.setState({
            selectedRowKeys: []
        });
    }
    render() {
        const { selectedRowKeys } = this.state;
        return (
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                rowSelection={{
                    selectedRowKeys,
                    onChange: selectedRowKeys => {
                        console.log(selectedRowKeys);
                        this.setState({ selectedRowKeys });
                    }
                }}
                title={() => {
                    return (
                        <Combine>
                            <Button onClick={() => this.handleAdd()} styleType="primary">
                                新增
                            </Button>
                            <Button
                                disabled={!selectedRowKeys || !selectedRowKeys.length}
                                onClick={() => this.handleRemoveSelected()}
                            >
                                删除
                            </Button>
                            <Combine style={{ float: 'right' }}>
                                <Table.SearchInput />
                                <Table.ColumnConfigButton />
                            </Combine>
                        </Combine>
                    );
                }}
                defaultColumnConfig={{
                    name1: {
                        disabled: true,
                        hidden: true
                    }
                }}
                onColumnConfigChange={console.log}
                contextMenu={(record, hide) => (
                    <Menu selectable={false}>
                        <Menu.Item
                            onClick={e => {
                                this.handleRemove(record.key, e);
                                hide();
                            }}
                        >
                            Remove
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                console.log(record);
                                hide();
                            }}
                        >
                            Log
                        </Menu.Item>
                    </Menu>
                )}
            />
        );
    }
}
// demo end

export default Demo;
