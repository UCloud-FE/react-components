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
                width: 100
            },
            {
                title: 'parent',
                children: [
                    {
                        title: 'child1',
                        dataIndex: 'desc',
                        key: 'child1',
                        width: 200
                    },
                    {
                        title: 'child2',
                        dataIndex: 'desc',
                        key: 'child2',
                        width: 200
                    }
                ]
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200
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
        return <Table columns={this.columns} dataSource={this.state.data} />;
    }
}

// demo end

export default Demo;
