import React from 'react';
import moment from 'moment';

import ThemeProvider from 'src/components/ThemeProvider';
import Button from 'src/components/Button';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import Pagination from 'src/components/Pagination';
import DatePicker from 'src/components/DatePicker';
import Calendar from 'src/components/Calendar';
import Select from 'src/components/Select';
import Upload from 'src/components/Upload';
import Slider from 'src/components/Slider';
import Modal from 'src/components/Modal';
import Table from 'src/components/Table';
import Menu from 'src/components/Menu';
import generateMaterialTheme from 'src/components/ThemeProvider/material';

// demo start
const columns = new Array(5).fill(null).map((v, i) => ({
    title: `title-${i}`,
    key: `title-${i}`,
    width: 100,
    filter: {
        options: [1, 2],
        popover: { getPopupContainer: () => document.body }
    },
    render: function Column(record) {
        return <span>content {record.index}</span>;
    }
}));
const greenTheme = {
    colorList: {
        primary: '#168a7e',
        primary1: '#02976d',
        primary2: '#168a7e',
        primary3: '#fbfffe',
        primary4: '#fbfbfb',
        primary5: '#e9fff9',
        primary6: '#fcfcfd',
        primary7: '#e2e3e3'
    }
};
const materialTheme = generateMaterialTheme({
    colorList: {
        primary: '#3555f6'
    },
    Height: {
        sm: '24px',
        md: '28px',
        lg: '32px'
    },
    Padding: {
        sm: '8px',
        md: '8px',
        lg: '16px'
    }
});
const greenMaterialTheme = generateMaterialTheme({
    colorList: {
        primary: '#168a7e',
        primary1: '#02976d',
        primary2: '#168a7e',
        primary3: '#fbfffe',
        primary4: '#fbfbfb',
        primary5: '#e9fff9',
        primary6: '#fcfcfd',
        primary7: '#e2e3e3'
    },
    Height: {
        sm: '24px',
        md: '28px',
        lg: '32px'
    },
    Padding: {
        sm: '8px',
        md: '8px',
        lg: '16px'
    },
    materialVars: {
        primaryBoxShadow:
            '0 1px 5px 0 rgba(21,56,195,.12), 0 2px 2px 0 rgba(8, 155, 140, 0.24), 0 3px 1px -3px rgba(58, 96, 245,.34)',
        primaryBoxShadowActive:
            '0 1px 10px 0 rgba(21,56,195,.12), 0 2px 4px -1px rgba(20, 194, 177, 0.2), 0 4px 5px 0 rgba(20, 194, 177, 0.14)',
        primaryLinearGradient: 'linear-gradient(#168a7e,#168a7e)',
        primaryLinearGradientActive: 'linear-gradient(#29a798,#29a798)'
    }
});
const oceanMaterialTheme = generateMaterialTheme({
    colorList: {
        primary: '#415bf5',
        primary1: '#415bf5',
        primary2: '#415bf5',
        primary3: '#f0f2ff',
        primary4: '#fafaff',
        primary5: '#c3caf7',
        primary6: '#fcfcfd',
        primary7: '#cae3ff'
    },
    Height: {
        sm: '24px',
        md: '28px',
        lg: '32px'
    },
    Padding: {
        sm: '8px',
        md: '8px',
        lg: '16px'
    },
    materialVars: {
        primaryBoxShadow:
            '0 1px 5px 0 rgba(21,56,195,.12), 0 2px 2px 0 rgba(8, 39, 156,.24), 0 3px 1px -3px rgba(58, 96, 245,.34)',
        primaryBoxShadowActive:
            '0 1px 10px 0 rgba(21,56,195,.12), 0 2px 4px -1px rgba(21,56,195,.2), 0 4px 5px 0 rgba(21,56,195,.14)',
        primaryLinearGradient: 'linear-gradient(#415bf5,#415bf5)',
        primaryLinearGradientActive: 'linear-gradient(#3d5aff,#3d5aff)'
    }
});

const Demo = () => (
    <div>
        {[greenTheme, materialTheme, greenMaterialTheme, oceanMaterialTheme].map((theme, i) => (
            <ThemeProvider key={i} theme={theme}>
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
