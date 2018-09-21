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
        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`,
            children: [1, 2, 3].map((d, j) => ({
                key: `${i}-${j}`,
                name: `name-${j}`,
                desc: `desc-${j}`,
                children: [1, 2, 3].map((d, k) => ({
                    key: `${i}-${j}-${k}`,
                    name: `name-${k}`,
                    desc: `desc-${k}`
                }))
            }))
        }));
        this.state = {
            data
        };
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Table columns={this.columns} dataSource={this.state.data} />
                </div>
                <div className="demo-wrap">
                    <Table columns={this.columns} dataSource={this.state.data} expandIconAsCell />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
