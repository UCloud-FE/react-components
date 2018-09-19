import React from 'react';
import Table from 'components/Table';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                fixed: 'left'
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200
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
                key: 'desc2'
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc3',
                width: 100,
                fixed: 'right'
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
        this.state = {
            data
        };
    }

    render() {
        return (
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                rowSelection={{ fixed: true }}
                scroll={{ x: 2000, y: 300 }}
            />
        );
    }
}

// demo end

export default Demo;
