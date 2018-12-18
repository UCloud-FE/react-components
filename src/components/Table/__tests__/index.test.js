import React from 'react';
import { mount } from 'enzyme';

import Table from 'src/components/Table';

jest.unmock('rc-trigger');

describe('Table', () => {
    test('select', () => {
        const error = (global.console.error = jest.fn());
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

        expect(error).toHaveBeenCalledTimes(1);

        expect(wrapper.find('.uc-fe-table-tbody i.icon__checkbox-ed').length).toBe(4);
        expect(wrapper.find('.uc-fe-table-tbody i[disabled=true]').length).toBe(4);
        expect(wrapper.find('.uc-fe-table-tbody i.icon__checkbox-ed[disabled=true]').length).toBe(2);

        wrapper.find('.uc-fe-table-thead i.icon__checkbox').simulate('click');
        expect(wrapper.find('.uc-fe-table-tbody i.icon__checkbox-ed').length).toBe(8);
        expect(wrapper.find('.uc-fe-table-tbody i[disabled=true]').length).toBe(4);
        expect(wrapper.find('.uc-fe-table-tbody i.icon__checkbox-ed[disabled=true]').length).toBe(2);
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

        expect(wrapper.find('.uc-fe-table-tbody i.icon__cbox-ed').length).toBe(1);
        expect(wrapper.find('.uc-fe-table-tbody i[disabled=true]').length).toBe(4);
        expect(wrapper.find('.uc-fe-table-tbody i.icon__cbox-ed[disabled=true]').length).toBe(1);

        wrapper
            .find('.uc-fe-table-tbody i.icon__circle')
            .at(5)
            .simulate('click');
        expect(wrapper.find('.uc-fe-table-tbody i.icon__cbox-ed').length).toBe(1);
        expect(wrapper.find('.uc-fe-table-tbody i.icon__cbox-ed[disabled=true]').length).toBe(0);
        expect(onRowSelect).toHaveBeenCalledTimes(++onRowSelectTimes);
        expect(onRowSelect).toHaveBeenLastCalledWith(['6']);
    });
});
