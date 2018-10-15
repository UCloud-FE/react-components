import React, { Component } from 'react';
import moment from 'moment';

import Button from 'src/components/Button';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import LocaleProvider from 'src/components/LocaleProvider';
import Pagination from 'src/components/Pagination';
import Calendar from 'src/components/Calendar';
import DatePicker from 'src/components/DatePicker';
import Select from 'src/components/Select';
import Modal from 'src/components/Modal';
import Menu from 'src/components/Menu';
import zh_CN from 'src/components/LocaleProvider/locale/zh_CN';
import en_US from 'src/components/LocaleProvider/locale/en_US';

import 'moment/locale/zh-cn';
const localeMap = {
    zh_CN,
    en_US
};
const momentLocaleMap = {
    zh_CN: 'zh-cn',
    en_US: 'en'
};
const defaultLocale = 'zh_CN';
class Demo extends Component {
    state = {
        localeStr: defaultLocale,
        momentLocale: momentLocaleMap[defaultLocale],
        locale: localeMap[defaultLocale]
    };
    setLocale = locale => {
        moment.locale(momentLocaleMap[locale]);
        this.setState({
            localeStr: locale,
            momentLocale: momentLocaleMap[locale],
            locale: localeMap[locale]
        });
    };
    componentWillUnmount = () => {
        moment.locale(momentLocaleMap[defaultLocale]);
    };
    render() {
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const list = (
            <div>
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
                    <Menu multiple showSelectAll collapse={{ defaultOpenKeys: ['1', '2'] }}>
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

export default Demo;
