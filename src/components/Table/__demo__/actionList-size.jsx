import React from 'react';
import Table from 'components/Table';

// demo start
const { Size } = Table.ActionList;
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 100,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Table
                            dataSource={dataSource}
                            columns={columns.concat({
                                title: 'Action',
                                key: 'Action',
                                width: 200,
                                render: record => (
                                    <Table.ActionList
                                        size={size}
                                        actionList={new Array(6).fill(null).map((v, i) => ({
                                            label: `Action ${i}`,
                                            onClick: e => console.log('action', i, record, e)
                                        }))}
                                    />
                                )
                            })}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
