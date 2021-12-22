import React, { useCallback } from 'react';
import { Table, Box, Icon, Combine, Badge, ActionList } from '@ucloud-fe/react-components';

const MyActionList = ({ item }: { item: any }) => {
    const handleClick = useCallback(() => {
        console.log(item);
    }, [item]);
    return (
        <ActionList
            exposeCount={3}
            actionList={[
                { label: '主操作', onClick: handleClick, styleType: 'primary' },
                { label: '操作', onClick: handleClick },
                { label: '操作', onClick: handleClick },
                { label: '操作', onClick: handleClick },
                { label: '操作', onClick: handleClick }
            ]}
        />
    );
};

const columns = [
    { title: '资源名称', key: 'name', dataIndex: 'name' },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
        render: (remark: string) => {
            return (
                <Combine>
                    {remark}
                    <Table.HoverDisplayArea>
                        <Icon type="edit" />
                    </Table.HoverDisplayArea>
                </Combine>
            );
        }
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        filter: {
            options: [
                {
                    label: '成功',
                    value: 'success'
                },
                {
                    label: '失败',
                    value: 'error'
                }
            ]
        },
        render: (status: string) => {
            return status === 'success' ? (
                <Combine>
                    <Badge dot color="green" />
                    成功
                </Combine>
            ) : (
                <Combine>
                    <Badge dot color="red" />
                    失败
                </Combine>
            );
        }
    },
    {
        title: '时间',
        key: 'time',
        dataIndex: 'time',
        render: (time: Date) => {
            return time.toLocaleString();
        }
    },
    {
        title: '时间',
        key: 'action',
        render: (item: any) => {
            return <MyActionList item={item} />;
        }
    }
];
const dataSource = new Array(5).fill(null).map((v, i) => ({
    key: i,
    name: `资源 ${i}`,
    remark: '备注',
    status: i % 2 ? 'success' : 'error',
    time: new Date()
}));

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Table columns={columns} dataSource={dataSource} rowSelection zebraCrossing />
        </Box>
    );
};

export default React.memo(Demo);
