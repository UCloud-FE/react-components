import React from 'react';
import { EditableTable, Box } from '@ucloud-fe/react-components';

const columns = [
    {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
        filter: {
            options: [
                { label: '1号', value: '1' },
                { label: '2号', value: '2' }
            ]
        },
        order: true
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
        filter: {
            options: [
                { label: '1号', value: '1' },
                { label: '2号', value: '2' }
            ]
        },
        order: true
    }
];
const dataSource = new Array(2).fill(null).map((v, i) => ({
    key: i,
    name: `名称 ${i}`,
    remark: '备注'
}));

const list = [
    { label: 'tip', props: { tip: '自定义提示', dataSource } },
    { label: 'disabledWithTip', props: { addition: false, tip: '自定义提示', dataSource } },
    { label: 'tip', props: { tip: '自定义提示' } },
    { label: 'disabledWithTip', props: { addition: false, tip: '自定义提示' } }
];
const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {list.map(({ props }, i) => (
                <EditableTable columns={columns} {...props} key={i} columnPlaceholder zebraCrossing />
            ))}
        </Box>
    );
};

export default React.memo(Demo);
