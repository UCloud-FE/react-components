import React from 'react';
import { mount } from 'enzyme';

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
        expect(onRowSelect).toHaveBeenLastCalledWith(['1', '2', '4', '5', '6', '7', '8', '9']);
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
        expect(onRowSelect).toHaveBeenLastCalledWith(['5']);
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
});
