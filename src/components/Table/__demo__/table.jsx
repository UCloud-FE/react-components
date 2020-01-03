import React from 'react';
import Table from 'components/Table';
import Switch from 'components/Switch';
import Form from 'components/Form';
import NumberInput from 'components/NumberInput';
import Notice from 'components/Notice';

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
            columnPlaceholder
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

        const tableProps = { columns, dataSource, showHeader, scroll, zebraCrossing, columnPlaceholder };
        if (rowSelection) {
            tableProps.rowSelection = {
                fixed: fixedFirstColumn
            };
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
            </div>
        );
    }
}
// demo end

export default Demo;
