import React from 'react';
import { TransferTable, Box } from '@ucloud-fe/react-components';

const columns = [
    { title: '名称', key: 'name', dataIndex: 'name', width: 100 },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark'
    }
];
const dataSource = new Array(5).fill(null).map((v, i) => ({
    key: i,
    name: `资源 ${i}`,
    remark: '备注'
}));

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <TransferTable dataSource={dataSource} columns={columns} tableProps={{ zebraCrossing: true }} />
            <TransferTable
                dataSource={dataSource}
                columns={columns}
                source={{ disabled: true }}
                target={{ disabled: true }}
                tableProps={{ zebraCrossing: true }}
            />
        </Box>
    );
};

export default React.memo(Demo);
