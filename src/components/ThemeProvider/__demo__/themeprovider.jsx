import React from 'react';
import moment from 'moment';

import ThemeProvider from 'src/components/ThemeProvider';
import Button from 'src/components/Button';
import Pagination from 'src/components/Pagination';
import DatePicker from 'src/components/DatePicker';
import Calendar from 'src/components/Calendar';
import Select from 'src/components/Select';
import Upload from 'src/components/Upload';
import Slider from 'src/components/Slider';
import Modal from 'src/components/Modal';
import Table from 'src/components/Table';
import Menu from 'src/components/Menu';

import darkTheme from 'src/components/ThemeProvider/dark';

// demo start
const columns = new Array(5).fill(null).map((v, i) => ({
    title: `title-${i}`,
    key: `title-${i}`,
    width: 100,
    filter: {
        options: [1, 2],
        popoverProps: { getPopupContainer: () => document.body }
    },
    render: function Column(record) {
        return <span>content {record.index}</span>;
    }
}));

const Demo = () => (
    <div>
        {[
            { theme: {} },
            { theme: darkTheme, background: 'linear-gradient(rgb(26, 33, 50) 0%, rgb(26, 33, 50) 100%)' }
        ].map((theme, i) => (
            <ThemeProvider key={i} theme={theme.theme}>
                <div style={{ background: theme.background }}>
                    <div className="demo-wrap">
                        <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
                    </div>
                    <div className="demo-wrap">
                        <Calendar value={moment()} />
                    </div>
                    <div className="demo-wrap">
                        <DatePicker value={moment()} />
                    </div>
                    <div className="demo-wrap">
                        <DatePicker.Month value={moment()} />
                    </div>
                    <div className="demo-wrap">
                        <DatePicker.Range value={[moment(), moment()]} />
                    </div>
                    <div className="demo-wrap">
                        <div className="demo-block">
                            <Select>
                                <Select.Option value={1}>1</Select.Option>
                                <Select.Option value={2}>2</Select.Option>
                                <Select.Option value={3}>3</Select.Option>
                            </Select>
                        </div>
                        <div className="demo-block">
                            <Select value={[1, 2]} multiple>
                                <Select.Option value={1}>1</Select.Option>
                                <Select.Option value={2}>2</Select.Option>
                                <Select.Option value={3}>3</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="demo-wrap">
                        <div className="demo-block">
                            <Button
                                className="demo-alert-btn"
                                onClick={() => Modal.alert({ title: 'alert' }, 'content')}
                            >
                                alert
                            </Button>
                        </div>
                        <div className="demo-block">
                            <Button
                                className="demo-confirm-btn"
                                onClick={() => Modal.confirm({ title: 'confirm' }, 'content')}
                            >
                                confirm
                            </Button>
                        </div>
                    </div>
                    <div className="demo-wrap">
                        <Menu multiple showSelectAll collapseProps={{ defaultOpenKeys: ['1', '2'] }}>
                            <Menu.Item itemKey="1">item 1</Menu.Item>
                            <Menu.SubMenu subMenuKey="1" title="submenu 1">
                                <Menu.Item itemKey="1-1">item 1-1</Menu.Item>
                                <Menu.Item itemKey="1-2">item 1-2</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu subMenuKey="2" title="submenu 2">
                                <Menu.Item itemKey="2-1">item 2-1</Menu.Item>
                                <Menu.Item itemKey="2-2">item 2-2</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </div>
                    <div className="demo-wrap">
                        <Upload />
                    </div>
                    <div className="demo-wrap">
                        <Table
                            className="test-table"
                            columns={columns}
                            title={() => (
                                <div className="clear-fixed">
                                    <div style={{ float: 'right' }}>
                                        <Table.SearchInput className="test-search-input" style={{ marginRight: 5 }} />
                                        <Table.ColumnConfigButton className="test-column-config-btn" />
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <div className="demo-wrap">
                        <div style={{ marginBottom: 10 }}>
                            <Slider className="test-slider" />
                        </div>
                        <div>
                            <Slider className="test-slider-sensitive" isSensitive />
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        ))}
    </div>
);
// demo end

export default Demo;
