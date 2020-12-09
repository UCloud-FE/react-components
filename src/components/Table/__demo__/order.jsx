import React from 'react';
import Table from 'components/Table';

// demo start

const dataSource = new Array(100).fill(null).map((v, i) => ({
    key: i,
    index: `index-${i}`,
    value: (Math.random() * 1000) | 0
}));
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
                key: 'custom',
                state: 'desc'
            }
        };
    }
    render() {
        const columns = [
            {
                title: `auto`,
                dataIndex: 'index',
                key: 'auto',
                width: 200,
                order: true
            },
            {
                title: `custom`,
                width: 200,
                key: 'custom',
                dataIndex: 'value',
                order: {
                    handleOrder: (descOrAsc, a, b) => {
                        if (descOrAsc === 'desc') {
                            return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
                        } else if (descOrAsc === 'asc') {
                            return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
                        }
                    }
                }
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    默认排序非受控：
                    <Table dataSource={dataSource} columns={columns} defaultOrder={{ key: 'custom', state: 'desc' }} />
                    受控不可变更排序：
                    <Table dataSource={dataSource} columns={columns} order={{ key: 'custom', state: 'desc' }} />
                    随机受控排序：
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        order={this.state.order}
                        onConditionChange={({ order }) => {
                            if (Math.random() * 100 > 80) {
                                console.log(`don't handler order: `, order);
                                return;
                            }
                            this.setState({
                                order: order
                            });
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
Demo.__ignore__test = true;
