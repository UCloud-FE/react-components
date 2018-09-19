import React from 'react';
import Table from 'components/Table';

// demo start
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`,
            value: (Math.random() * 1000) | 0
        }));
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
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
