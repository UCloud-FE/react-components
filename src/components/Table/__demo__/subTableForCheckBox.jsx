import React from 'react';
import Table from 'src/components/Table';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 200
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
            }
        ];
        this.state = {
            data: []
        };
    }
    getData() {
        let data = [];
        data.length = 1;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`,
            children: [1, 2, 3].map((d, j) => ({
                key: `${i}-${j}`,
                name: `name-1-${j}`,
                desc: `desc-1-${j}`,
                children: [1, 2, 3].map((d, k) => ({
                    key: `${i}-${j}-${k}`,
                    name: `name-2-${k}`,
                    desc: `desc-2-${k}`
                }))
            }))
        }));

        this.setState({
            data
        });
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const { data } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        expandIconAsCell
                        defaultExpandAllRows
                        rowSelection={{
                            linkage: true,
                            defaultSelectedRowKeys: [],
                            onChange: console.log,
                            getDisabledOfRow: record => ['0-1-2', '0-2'].includes(record.key)
                        }}
                    />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
