import React from 'react';

import Table from 'src/components/Table';

// demo start
class Demo extends React.Component {
    render() {
        let data = [];
        data.length = 33;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`
        }));
        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                filter: {
                    options: [1, 2, 3, 4]
                },
                order: true
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200,
                filter: {
                    options: [1, 2, 3, 4],
                    multiple: true
                },
                order: true
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        onConditionChange={console.log}
                        doNotHandleCondition
                        title={() => {
                            return (
                                <div className="clear-fixed">
                                    <div style={{ float: 'right' }}>
                                        <Table.SearchInput style={{ marginRight: 8 }} />
                                    </div>
                                </div>
                            );
                        }}
                        dataSource={data}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
