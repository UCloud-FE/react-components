import React from 'react';
import Table from 'components/Table';

// demo start
const columns1 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        fixed: true
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
        fixed: true
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        width: 100
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        width: 300
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        width: 100,
        fixed: true
    }
];
const columns2 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        render: () => {
            return new Array(10).fill('vvvvvvv').join('');
        }
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        render: () => {
            return new Array(10).fill('vvvvvvv').join('');
        }
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        render: () => {
            return new Array(10).fill('vvvvvvv').join('');
        }
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        fixed: true
    }
];
let data = [];
data.length = 100;
data.fill({});
data = data.map((d, i) => ({
    key: i,
    name: `name-${i}`,
    desc: `desc-${i}`
}));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        columns={columns1}
                        dataSource={data}
                        rowSelection={{ fixed: true }}
                        columnPlaceholder
                        scroll={{ x: 2000, y: 300 }}
                    />
                </div>
                <div className="demo-wrap">
                    <Table rowSelection={{ fixed: true }} columns={columns2} dataSource={data} columnPlaceholder />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
