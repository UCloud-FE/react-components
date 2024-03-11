// @ts-nocheck
import { Form, Notice, NumberInput, Radio, Switch, Table } from '@ucloud-fe/react-components';
import React from 'react';

// demo start

class FixedDemo extends React.Component {
    render() {
        const columns1 = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                fixed: true
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200,
                fixed: true
            },
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name1',
                width: 100
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc2',
                width: 300
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc3',
                width: 100,
                fixed: true
            }
        ];

        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`
        }));

        return (
            <div>
                <div className="demo-wrap" style={{ width: 1000 }}>
                    <Table
                        columns={columns1}
                        dataSource={data}
                        rowSelection={{ fixed: true }}
                        columnPlaceholder
                        scroll={{ x: 2000, y: 300 }}
                    />
                </div>
            </div>
        );
    }
}

// demo end

// demo start
class ResizableDemo extends React.Component {
    constructor(props) {
        super(props);
        const columns = new Array(6).fill(null).map((v, i) => {
            const onResize = w => this.handleResize(i, w);
            return {
                title: `title - ${i}`,
                key: `title-${i}`,
                width: 150,
                maxWidth: 300,
                minWidth: 50,
                onResize,
                render: record => <span>content {record.index}</span>
            };
        });
        if (props.fixed) {
            columns[0].fixed = true;
        }
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
        const { columns } = this.state;
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        scroll={{
                            x: true,
                            y: this.props.y
                        }}
                        columnResizable
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

// demo start

const DragDemo = () => {
    const _dataSource = new Array(11).fill(null).map((v, i) => ({
        key: i,
        data: `data-${i}`
    }));

    const columns2 = [
        {
            title: '序号',
            key: 'no',
            width: 100,
            fixed: true,
            render: (d, record, index) => {
                return index;
            }
        }
    ].concat(
        new Array(6).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.data}</span>
        }))
    );
    const [dataSource, setDataSource] = React.useState(() => [..._dataSource]);
    const handleDragSorting = React.useCallback((fromIndex, toIndex) => {
        console.log(fromIndex, toIndex);
        setDataSource(dataSource => {
            const nextDataSource = [...dataSource];
            nextDataSource.splice(toIndex, 0, ...nextDataSource.splice(fromIndex, 1));
            return nextDataSource;
        });
    }, []);

    return (
        <div>
            <div className="demo-wrap">
                <Table
                    dragSorting={{ onChange: handleDragSorting, fixed: true }}
                    dataSource={dataSource}
                    columns={columns2}
                    scroll={{ x: true, y: 200 }}
                    pagination={null}
                />
            </div>
        </div>
    );
};

// demo end

// demo start
class SubTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 200
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200
            },
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name1',
                width: 100
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc2'
            }
        ];
        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`,
            children: [1, 2, 3].map((d, j) => ({
                key: `${i}-${j}`,
                name: `name-${j}`,
                desc: `desc-${j}`,
                children: [1, 2, 3].map((d, k) => ({
                    key: `${i}-${j}-${k}`,
                    name: `name-${k}`,
                    desc: `desc-${k}`
                }))
            }))
        }));
        this.state = {
            data
        };
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Table columns={this.columns} dataSource={this.state.data} />
                </div>
                <div className="demo-wrap">
                    <Table columns={this.columns} dataSource={this.state.data} expandIconAsCell />
                </div>
                <div className="demo-wrap">
                    <Table
                        columns={this.columns}
                        dragSorting
                        dataSource={this.state.data}
                        expandIconAsCell
                        rowSelection={{
                            defaultSelectedRowKeys: [1, 2, 4, 5],
                            onChange: console.log,
                            getDisabledOfRow: record => record.key < 4
                        }}
                    />
                </div>
            </div>
        );
    }
}

// demo end

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLength: 100,
            columnLength: 6,
            rowSelection: true,
            fixedFirstColumn: false,
            fixedLastColumn: false,
            hasError: false,
            removeLastButOneColumnWidth: false,
            showHeader: true,
            showPagination: true,
            zebraCrossing: false,
            columnPlaceholder: false,
            rowSelectionSelectedTip: true,
            tableLayout: 'default',
            scroll: {
                x: false,
                y: false
            }
        };
    }
    render() {
        const {
            dataLength,
            columnLength,
            rowSelection,
            searchInput,
            columnConfigButtom,
            fixedFirstColumn,
            fixedLastColumn,
            hasError,
            removeLastButOneColumnWidth,
            showHeader,
            showPagination,
            scroll,
            zebraCrossing,
            columnPlaceholder,
            tableLayout,
            rowSelectionSelectedTip
        } = this.state;
        let dataSource = [];
        dataSource.length = dataLength;
        dataSource.fill({});
        dataSource = dataSource.map((d, i) => ({
            key: i,
            name: `this is a very long name ${i}: balabalabalabalabalabala`
        }));
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        let columns = [];
        columns.length = columnLength;
        columns.fill({});
        columns = columns.map((d, i) => ({
            title: `name ${i}`,
            dataIndex: 'name',
            key: `name ${i}`,
            width: 100,
            filter: {
                options: [1, 2, 3, 4]
            },
            order: true,
            render: value => {
                return <span style={{ wordBreak: 'break-word' }}>{value}</span>;
            }
        }));

        if (fixedFirstColumn) {
            columns[0].fixed = 'left';
        }
        if (fixedLastColumn) {
            columns[columnLength - 1].fixed = 'right';
        }

        if (removeLastButOneColumnWidth) {
            delete columns[columnLength - 2].width;
        }

        const tableProps = {
            columns,
            dataSource,
            showHeader,
            scroll,
            zebraCrossing,
            columnPlaceholder,
            tableLayout: tableLayout === 'default' ? undefined : tableLayout
        };
        if (rowSelection) {
            tableProps.rowSelection = {
                fixed: fixedFirstColumn
            };
            tableProps.rowSelection.selectedTip = rowSelectionSelectedTip;
        }
        if (!showPagination) {
            tableProps.pagination = null;
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="dataLength" {...itemLayout}>
                        <NumberInput value={dataLength} onNumberChange={dataLength => this.setState({ dataLength })} />
                    </Form.Item>
                    <Form.Item label="columnLength" {...itemLayout}>
                        <NumberInput
                            value={columnLength}
                            onNumberChange={columnLength => this.setState({ columnLength })}
                        />
                    </Form.Item>
                    <Form.Item label="rowSelection" {...itemLayout}>
                        <Switch checked={rowSelection} onChange={rowSelection => this.setState({ rowSelection })} />
                    </Form.Item>
                    <Form.Item label="rowSelection.selectedTip" {...itemLayout}>
                        <Radio.Group
                            styleType="button"
                            options={[true, false, 'bottom'].map(v => ({ label: v + '', value: v }))}
                            value={rowSelectionSelectedTip}
                            onChange={rowSelectionSelectedTip =>
                                this.setState({
                                    rowSelectionSelectedTip
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="showHeader" {...itemLayout}>
                        <Switch checked={showHeader} onChange={showHeader => this.setState({ showHeader })} />
                    </Form.Item>
                    <Form.Item label="showPagination" {...itemLayout}>
                        <Switch
                            checked={showPagination}
                            onChange={showPagination => this.setState({ showPagination })}
                        />
                    </Form.Item>
                    <Form.Item label="searchInput" {...itemLayout}>
                        <Switch checked={searchInput} onChange={searchInput => this.setState({ searchInput })} />
                    </Form.Item>
                    <Form.Item label="columnConfigButtom" {...itemLayout}>
                        <Switch
                            checked={columnConfigButtom}
                            onChange={columnConfigButtom => this.setState({ columnConfigButtom })}
                        />
                    </Form.Item>
                    <Form.Item label="columnPlaceholder" {...itemLayout}>
                        <Switch
                            checked={columnPlaceholder}
                            onChange={columnPlaceholder => this.setState({ columnPlaceholder })}
                        />
                    </Form.Item>
                    <Form.Item label="tableLayout" {...itemLayout}>
                        <Radio.Group
                            styleType="button"
                            options={['default', 'auto', 'fixed'].map(v => ({ label: v + '', value: v }))}
                            value={tableLayout}
                            onChange={tableLayout =>
                                this.setState({
                                    tableLayout
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="hasError" {...itemLayout}>
                        <Switch checked={hasError} onChange={hasError => this.setState({ hasError })} />
                    </Form.Item>
                    <Form.Item label="removeLastButOneColumnWidth" {...itemLayout}>
                        <Switch
                            checked={removeLastButOneColumnWidth}
                            onChange={removeLastButOneColumnWidth => this.setState({ removeLastButOneColumnWidth })}
                        />
                    </Form.Item>
                    <Form.Item label="scroll.x" {...itemLayout}>
                        <Switch
                            checked={scroll.x !== false}
                            onChange={x =>
                                this.setState({
                                    scroll: {
                                        ...scroll,
                                        x
                                    }
                                })
                            }
                        />
                        {scroll.x !== false && (
                            <NumberInput
                                style={{ marginLeft: 5 }}
                                value={scroll.x === true ? 0 : scroll.x}
                                min={0}
                                onNumberChange={x =>
                                    this.setState({
                                        scroll: {
                                            ...scroll,
                                            x: x > 0 ? x : true
                                        }
                                    })
                                }
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="scroll.y" {...itemLayout}>
                        <Switch
                            checked={scroll.y !== false}
                            onChange={y =>
                                this.setState({
                                    scroll: {
                                        ...scroll,
                                        y
                                    }
                                })
                            }
                        />
                        {scroll.y !== false && (
                            <NumberInput
                                style={{ marginLeft: 5 }}
                                value={scroll.y === true ? 0 : scroll.y}
                                min={0}
                                onNumberChange={y =>
                                    this.setState({
                                        scroll: {
                                            ...scroll,
                                            y: y > 0 ? y : true
                                        }
                                    })
                                }
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="fixed first column and row selection" {...itemLayout}>
                        <Switch
                            checked={fixedFirstColumn}
                            onChange={fixedFirstColumn =>
                                this.setState({
                                    fixedFirstColumn
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="fixed last column" {...itemLayout}>
                        <Switch
                            checked={fixedLastColumn}
                            onChange={fixedLastColumn =>
                                this.setState({
                                    fixedLastColumn
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="zebraCrossing" {...itemLayout}>
                        <Switch
                            checked={zebraCrossing}
                            onChange={zebraCrossing =>
                                this.setState({
                                    zebraCrossing
                                })
                            }
                        />
                    </Form.Item>
                </Form>

                <div className="demo-wrap">
                    <Table
                        {...tableProps}
                        title={() => {
                            return (
                                <div className="clear-fixed">
                                    <div style={{ float: 'right' }}>
                                        {searchInput && <Table.SearchInput style={{ marginRight: 8 }} />}
                                        {columnConfigButtom && <Table.ColumnConfigButton />}
                                    </div>
                                </div>
                            );
                        }}
                        errorContent={
                            hasError ? (
                                <Notice styleType="error" closable={false}>
                                    报错啦
                                </Notice>
                            ) : null
                        }
                    />
                </div>

                <Form.Group title="emptyContent">
                    <Table
                        rowKey="dataIndex"
                        columns={[
                            {
                                title: 'name',
                                key: 'name',
                                dataIndex: 'name'
                            }
                        ]}
                    />
                </Form.Group>
                <Form.Group title="SubTable 子表格">
                    <SubTable />
                </Form.Group>
                <Form.Group title="DragTable 拖拽表格">
                    <DragDemo />
                </Form.Group>
                <Form.Group title="ColumnResizable 可调表头宽度" style={{ width: 700 }}>
                    <ResizableDemo x y={300} />
                </Form.Group>
                <Form.Group title="Fixed 固定表头、列">
                    <FixedDemo />
                </Form.Group>
            </div>
        );
    }
}
// demo end

export default Demo;
