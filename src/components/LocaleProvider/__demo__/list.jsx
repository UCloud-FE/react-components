import React from 'react';
import moment from 'moment';

import Button from 'src/components/Button';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import LocaleProvider from 'src/components/LocaleProvider';
import Pagination from 'src/components/Pagination';
import DatePicker from 'src/components/DatePicker';
import Calendar from 'src/components/Calendar';
import Select from 'src/components/Select';
import Upload from 'src/components/Upload';
import Slider from 'src/components/Slider';
import Modal from 'src/components/Modal';
import Table from 'src/components/Table';
import Menu from 'src/components/Menu';
import PopConfirm from 'src/components/PopConfirm';
import EditableList from 'src/components/EditableList';
import Transfer from 'src/components/Transfer';
import Tree from 'src/components/Tree';
import Cascader from 'src/components/Cascader';
import ENLocale from 'src/components/LocaleProvider/locale/en_US';

// demo start
const CNLocale = {};
const localeMap = {
    zh_CN: CNLocale,
    en_US: ENLocale
};
const momentLocaleMap = {
    zh_CN: 'zh-cn',
    en_US: 'en'
};
const defaultLocale = 'zh_CN';
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localeStr: defaultLocale,
            momentLocale: momentLocaleMap[defaultLocale],
            locale: localeMap[defaultLocale]
        };
        this.setLocale = this.setLocale.bind(this);
    }
    setLocale(locale) {
        moment.locale(momentLocaleMap[locale]);
        this.setState({
            localeStr: locale,
            momentLocale: momentLocaleMap[locale],
            locale: localeMap[locale]
        });
    }
    componentWillUnmount() {
        moment.locale(momentLocaleMap[defaultLocale]);
    }
    render() {
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 100,
            filter: {
                options: [1, 2],
                popoverProps: { getPopupContainer: () => document.body }
            },
            render: record => <span>content {record.index}</span>
        }));
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i
        }));
        const list = (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} showTotal showSizeChanger showQuickJumper={{ goButton: true }} />
                </div>
                <div className="demo-wrap">
                    <Calendar value={moment()} />
                </div>
                <div className="demo-wrap">
                    <DatePicker value={moment()} />
                </div>
                <div className="demo-wrap">
                    <DatePicker type="month" value={moment()} />
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
                        <Button className="demo-alert-btn" onClick={() => Modal.alert({ title: 'alert' }, 'content')}>
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
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={{
                            defaultSelectedRowKeys: [1, 2, 5]
                        }}
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
                <div className="demo-wrap">
                    <PopConfirm popup="确认">
                        <Button>按钮</Button>
                    </PopConfirm>
                </div>
                <div className="demo-wrap">
                    <EditableList dataSource={[]} />
                </div>
                <div className="demo-wrap">
                    <Transfer dataSource={[]} />
                </div>
                <div className="demo-wrap">
                    <Tree search />
                </div>
                <div className="demo-wrap">
                    <Cascader />
                </div>
            </div>
        );
        const { localeStr, locale } = this.state;

        return (
            <div className="noeditor-wrap">
                <Form className="demo-form">
                    <Form.Item label="locale" {...itemLayout}>
                        <Radio.Group
                            styleType="button"
                            value={localeStr}
                            onChange={this.setLocale}
                            options={['zh_CN', 'en_US'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                </Form>
                <div>
                    <LocaleProvider locale={locale}>{list}</LocaleProvider>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
