import React from 'react';
import Table from 'components/Table';

// demo start
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = [
            {
                title: `multiple`,
                dataIndex: 'index',
                key: 'multiple',
                width: 200,
                filter: {
                    options: [1, 2, 3],
                    multiple: true
                }
            },
            {
                title: `single`,
                dataIndex: 'index',
                key: 'single',
                width: 200,
                filter: {
                    options: [1, 2, 3]
                }
            },
            {
                title: `custom`,
                width: 200,
                key: 'custom',
                render: record => <span>content {record.index}</span>,
                filter: {
                    options: [1, 2, 3],
                    handleFilter: (value, record, filterValue) => {
                        return record.key === 0 || record.index.indexOf(filterValue) >= 0;
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
