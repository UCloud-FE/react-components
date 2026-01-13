import { fireEvent, render, waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import Table from 'src/components/Table';

jest.unmock('rc-trigger');

describe('Table', () => {
    // test('no key warn', () => {
    //     const error = (global.console.error = jest.fn(console.error));
    //     class Demo extends React.Component {
    //         render() {
    //             const dataSource = new Array(100).fill(null).map((v, i) => ({
    //                 index: `index-${i}`,
    //                 i
    //             }));
    //             const columns = new Array(5).fill(null).map((v, i) => ({
    //                 title: `title-${i}`,
    //                 key: `title-${i}`,
    //                 width: 200,
    //                 render: record => <span>content {record.index}</span>
    //             }));
    //             return (
    //                 <div>
    //                     <div className="demo-wrap">
    //                         <Table dataSource={dataSource} columns={columns} {...this.props} />
    //                     </div>
    //                 </div>
    //             );
    //         }
    //     }

    //     mount(<Demo />);

    //     expect(error).toHaveBeenCalledTimes(1);
    // });
    test('select', () => {
        const onRowSelect = jest.fn();
        let onRowSelectTimes = 0;

        class Demo extends React.Component {
            render() {
                const dataSource = new Array(100).fill(null).map((v, i) => ({
                    index: `index-${i}`,
                    i
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
                                    onChange: onRowSelect,
                                    getDisabledOfRow: record => record.i < 4
                                }}
                                dataSource={dataSource}
                                columns={columns}
                                {...this.props}
                            />
                        </div>
                    </div>
                );
            }
        }

        const wrapper = mount(<Demo />);

        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-checked').length).toBe(4);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-disabled').length).toBe(4);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-checked.uc-fe-checkbox-disabled').length).toBe(2);

        wrapper.find('.uc-fe-table-thead span.uc-fe-checkbox').simulate('click');
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-checked').length).toBe(8);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-disabled').length).toBe(4);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-checked.uc-fe-checkbox-disabled').length).toBe(2);
        expect(onRowSelect).toHaveBeenCalledTimes(++onRowSelectTimes);
        expect(onRowSelect).toHaveBeenLastCalledWith(
            ['1', '2', '4', '5', '6', '7', '8', '9'],
            [
                { index: 'index-1', i: 1 },
                { index: 'index-2', i: 2 },
                { index: 'index-4', i: 4 },
                { index: 'index-5', i: 5 },
                { index: 'index-6', i: 6 },
                { index: 'index-7', i: 7 },
                { index: 'index-8', i: 8 },
                { index: 'index-9', i: 9 }
            ]
        );
    });
    test('linkage select', () => {
        const onRowSelect = jest.fn();
        let onRowSelectTimes = 0;

        class Demo extends React.Component {
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
                this.state = {
                    data: []
                };
            }
            getData() {
                let data = [];
                data.length = 1;
                data.fill({});
                data = data.map((d, i) => ({
                    key: '' + i,
                    name: `name-${i}`,
                    desc: `desc-${i}`,
                    children: [1, 2, 3].map((d, j) => ({
                        key: `${i}-${j}`,
                        name: `name-1-${j}`,
                        desc: `desc-1-${j}`
                    }))
                }));

                this.setState({
                    data
                });
            }
            componentDidMount() {
                this.getData();
            }
            render() {
                const { data } = this.state;

                return (
                    <div>
                        <div className="demo-wrap">
                            <Table
                                rowSelection={{
                                    linkage: true,
                                    defaultSelectedRowKeys: ['0-1'],
                                    onChange: onRowSelect,
                                    getDisabledOfRow: record => record.key == '0-0'
                                }}
                                dataSource={data}
                                columns={this.columns}
                                {...this.props}
                            />
                        </div>
                    </div>
                );
            }
        }

        const wrapper = mount(<Demo />);

        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-checked').length).toBe(0);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-disabled').length).toBe(0);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-checked.uc-fe-checkbox-disabled').length).toBe(0);

        wrapper.find('.uc-fe-table-thead span.uc-fe-checkbox').simulate('click');
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-checked').length).toBe(1);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-disabled').length).toBe(0);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-checkbox-checked.uc-fe-checkbox-disabled').length).toBe(0);
        expect(onRowSelect).toHaveBeenCalledTimes(++onRowSelectTimes);
        expect(onRowSelect).toHaveBeenLastCalledWith(
            ['0', '0-1', '0-2'],
            [
                { key: '0', name: 'name-0', desc: 'desc-0' },
                { key: '0-1', name: 'name-1-1', desc: 'desc-1-1' },
                { key: '0-2', name: 'name-1-2', desc: 'desc-1-2' }
            ]
        );
    });
    test('single select', () => {
        const onRowSelect = jest.fn();
        let onRowSelectTimes = 0;

        class Demo extends React.Component {
            render() {
                const dataSource = new Array(100).fill(null).map((v, i) => ({
                    index: `index-${i}`,
                    i
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
                                    multiple: false,
                                    defaultSelectedRowKeys: [1],
                                    onChange: onRowSelect,
                                    getDisabledOfRow: record => record.i < 4
                                }}
                                dataSource={dataSource}
                                columns={columns}
                                {...this.props}
                            />
                        </div>
                    </div>
                );
            }
        }

        const wrapper = mount(<Demo />);

        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-radio-checked').length).toBe(1);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-radio-disabled').length).toBe(4);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-radio-checked.uc-fe-radio-disabled').length).toBe(1);

        wrapper.find('.uc-fe-table-tbody span.uc-fe-radio').at(5).simulate('click');
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-radio-checked').length).toBe(1);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-radio-checked.uc-fe-radio-disabled').length).toBe(0);
        expect(onRowSelect).toHaveBeenCalledTimes(++onRowSelectTimes);
        expect(onRowSelect).toHaveBeenLastCalledWith(['5'], [{ i: 5, index: 'index-5' }]);
    });
    test('defaultExpandAllRows', () => {
        const onExpand = jest.fn();
        let onExpandTimes = 0;

        class Demo extends React.Component {
            render() {
                const dataSource = new Array(100).fill(null).map((v, i) => ({
                    index: `index-${i}`,
                    i
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
                                defaultExpandAllRows
                                expandedRowRender={record => <p>this is the expandedRow of {record.key}</p>}
                                onExpand={onExpand}
                                dataSource={dataSource}
                                columns={columns}
                                {...this.props}
                            />
                        </div>
                    </div>
                );
            }
        }

        const wrapper = mount(<Demo />);

        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-table-row-expanded').length).toBe(10);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-table-row-collapsed').length).toBe(0);

        wrapper.find('.uc-fe-table-tbody span.uc-fe-table-row-expand-icon').at(5).simulate('click');

        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-table-row-expanded').length).toBe(10);
        expect(wrapper.find('.uc-fe-table-tbody span.uc-fe-table-row-collapsed').length).toBe(0);

        expect(onExpand).toHaveBeenCalledTimes(++onExpandTimes);
    });
    test('getColumnConfigFromLocalStorage', () => {
        class Demo extends React.Component {
            render() {
                const columnConfigKey = 'this-is-the-unique-key-of-this-table';
                const dataSource = new Array(100).fill(null).map((v, i) => ({
                    index: `index-${i}`,
                    i
                }));
                const defaultColumnConfig = {
                    'title-1': {
                        disabled: true,
                        hidden: true
                    },
                    'title-2': {
                        disabled: true
                    },
                    'title-3': {
                        hidden: true
                    }
                };
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
                                title={() => {
                                    return (
                                        <>
                                            <Table.ColumnConfigButton />
                                        </>
                                    );
                                }}
                                defaultColumnConfig={Table.getColumnConfigFromLocalStorage(
                                    `${columnConfigKey}-2`,
                                    defaultColumnConfig
                                )}
                                onColumnConfigChange={config =>
                                    Table.setColumnConfigToLocalStorage(`${columnConfigKey}-2`, config)
                                }
                                dataSource={dataSource}
                                columns={columns}
                                {...this.props}
                            />
                        </div>
                    </div>
                );
            }
        }

        const wrapper = mount(<Demo />);
        wrapper.find('.uc-fe-table-title .uc-fe-table-custom-title .uc-fe-button').at(0).simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        expect(document.querySelectorAll('.uc-fe-modal-body').length).toBe(1);
        document.querySelectorAll('.uc-fe-modal-body')[0].querySelectorAll('.uc-fe-checkbox')[4].click();
        expect(document.querySelectorAll('.uc-fe-modal-footer').length).toBe(1);
        document.querySelectorAll('.uc-fe-modal-footer')[0].querySelectorAll('.uc-fe-button')[1].click();
    });
    test('filter', () => {
        class Demo extends React.Component {
            render() {
                const dataSource = new Array(100).fill(null).map((v, i) => ({
                    index: `index-${i}`,
                    i
                }));
                const columns = new Array(5).fill(null).map((v, i) => ({
                    title: `title-${i}`,
                    key: `title-${i}`,
                    width: 200,
                    filter: {
                        disabled: true
                    },
                    render: record => <span>content {record.index}</span>
                }));
                return (
                    <div>
                        <div className="demo-wrap">
                            <Table dataSource={dataSource} columns={columns} {...this.props} />
                        </div>
                    </div>
                );
            }
        }

        mount(<Demo />);
    });
    test('dragSorting', async () => {
        const onDragSorting = jest.fn();

        class Demo extends React.Component {
            render() {
                const dataSource = new Array(10).fill(null).map((v, i) => ({
                    index: `index-${i}`,
                    i
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
                                dragSorting={{
                                    onChange: onDragSorting
                                }}
                                dataSource={dataSource}
                                columns={columns}
                                {...this.props}
                            />
                        </div>
                    </div>
                );
            }
        }
        const wrapper = mount(<Demo />);
        expect(wrapper.find('.uc-fe-table-tbody td.uc-fe-table-dragger-cell').length).toBe(10);

        const { findAllByTestId } = render(<Demo />);
        const draggableElements = await waitFor(() => findAllByTestId('draggable'));

        expect(draggableElements.length).toBe(10);

        const elemDrag = draggableElements[3];
        const elemDrop2 = elemDrag.parentElement.parentElement;
        const elemTarget = draggableElements[5].parentElement.parentElement;
        const elemTarget2 = draggableElements[1].parentElement.parentElement;

        const dataTransfer = {
            getData: jest.fn(),
            setData: jest.fn(),
            dropEffect: 'move',
            effectAllowed: 'move'
        };

        await fireEvent.mouseDown(elemDrag, { which: 1, button: 0 });
        await fireEvent.dragStart(elemDrop2, { dataTransfer });
        await fireEvent.dragOver(elemTarget, { dataTransfer });
        await fireEvent.drop(elemTarget, { dataTransfer });
        await fireEvent.dragEnd(elemTarget, { dataTransfer });
        await fireEvent.mouseUp(elemDrag, { which: 1, button: 0 });

        expect(onDragSorting).toHaveBeenCalledTimes(1);

        await fireEvent.mouseDown(elemDrag, { which: 1, button: 0 });
        await fireEvent.dragStart(elemDrop2, { dataTransfer });
        await fireEvent.dragOver(elemTarget2, { dataTransfer });
        await fireEvent.drop(elemTarget2, { dataTransfer });
        await fireEvent.dragEnd(elemTarget2, { dataTransfer });
        await fireEvent.mouseUp(elemDrag, { which: 1, button: 0 });

        expect(wrapper.find('.uc-fe-table-tbody .uc-fe-table-drag-over-down').length).toBe(0);
        expect(wrapper.find('.uc-fe-table-tbody .uc-fe-table-drag-over-up').length).toBe(0);
        expect(onDragSorting).toHaveBeenCalledTimes(2);
    });
    test('pagination hide', () => {
        class Demo extends React.Component {
            render() {
                const dataSource = new Array(100).fill(null).map((v, i) => ({
                    index: `index-${i}`,
                    i
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
                                pagination={{
                                    hide: true
                                }}
                                dataSource={dataSource}
                                columns={columns}
                                {...this.props}
                            />
                        </div>
                    </div>
                );
            }
        }

        const wrapper = mount(<Demo />);
        const paginationElement = wrapper.find('.uc-fe-table-pagination').first().getDOMNode();

        // 验证分页组件存在但被隐藏
        expect(paginationElement).toBeTruthy();
        const style = paginationElement.style;
        expect(style.visibility).toBe('hidden');
        expect(style.opacity).toBe('0');
        expect(style.height).toBe('0px');
        expect(style.width).toBe('0px');
    });
    test('pagination hide with style', () => {
        class Demo extends React.Component {
            render() {
                const dataSource = new Array(100).fill(null).map((v, i) => ({
                    index: `index-${i}`,
                    i
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
                                pagination={{
                                    hide: true,
                                    style: {
                                        color: 'red'
                                    }
                                }}
                                dataSource={dataSource}
                                columns={columns}
                                {...this.props}
                            />
                        </div>
                    </div>
                );
            }
        }

        const wrapper = mount(<Demo />);
        const paginationElement = wrapper.find('.uc-fe-table-pagination').first().getDOMNode();

        // 验证分页组件存在但被隐藏，且不会与hide冲突的自定义样式被保留
        expect(paginationElement).toBeTruthy();
        const style = paginationElement.style;
        expect(style.visibility).toBe('hidden');
        expect(style.opacity).toBe('0');
        expect(style.height).toBe('0px');
        expect(style.width).toBe('0px');
        expect(style.margin).toBe('0px');
        // 验证不会与hide冲突的自定义样式被保留
        expect(style.color).toBe('red');
    });
    test('pagination hide false', () => {
        class Demo extends React.Component {
            render() {
                const dataSource = new Array(100).fill(null).map((v, i) => ({
                    index: `index-${i}`,
                    i
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
                                pagination={{
                                    hide: false
                                }}
                                dataSource={dataSource}
                                columns={columns}
                                {...this.props}
                            />
                        </div>
                    </div>
                );
            }
        }

        const wrapper = mount(<Demo />);
        const paginationElement = wrapper.find('.uc-fe-table-pagination').first().getDOMNode();

        // 验证分页组件正常显示
        expect(paginationElement).toBeTruthy();
        const style = paginationElement.style;
        expect(style.visibility).not.toBe('hidden');
    });
});
