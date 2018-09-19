import React from 'react';
import Table from 'components/Table';

// demo start
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
                {[0, 4, 5].map(count => (
                    <div className="demo-wrap" key={count}>
                        <Table
                            dataSource={dataSource}
                            columns={columns.concat({
                                title: 'Action',
                                key: 'Action',
                                width: 200,
                                render: record => (
                                    <Table.ActionList
                                        exposeCount={count}
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
