/* eslint-disable react/display-name */
import React from 'react';

import Table from 'src/components/Table';
import Card from 'src/components/Card';
import Popover from 'src/components/Popover';
import Select from 'src/components/Select';
import DatePicker from 'src/components/DatePicker';

// demo start
const dataSource = [{ key: 'key', name: 'test' }];
const columns = [
    () => (
        <Popover
            forwardPopupContainer
            popup={<div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>This is the popup</div>}
        >
            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Popover>
    ),
    () => <Select options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }))} />,
    () => <DatePicker />,
    () => <DatePicker type="month" />,
    record => (
        <Table.ActionList
            exposeCount={1}
            actionList={new Array(10).fill(null).map((v, i) => ({
                label: `Action ${i}`,
                onClick: e => console.log('action', i, record, e)
            }))}
        />
    )
].map((render, i) => ({
    title: `title-${i}`,
    key: `title-${i}`,
    width: 300,
    filter: {
        options: [1, 2, 3, 4]
    },
    render
}));
const Demo = () => (
    <div>
        <h3>Table 提供了内置的 getPopupContainer</h3>
        <div className="demo-wrap">
            <Table dataSource={dataSource} columns={columns} scroll={{ x: true }} />
        </div>
        <h3>Table 嵌套在卡片中，容器会转移至卡片的容器</h3>
        <div className="demo-wrap">
            <Card>
                <Table dataSource={dataSource} columns={columns} scroll={{ x: true }} />
            </Card>
        </div>
    </div>
);
// demo end

export default Demo;
