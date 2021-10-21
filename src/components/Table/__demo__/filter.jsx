import React from 'react';
import _ from 'lodash';

import Table from 'src/components/Table';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controlledFilter: 1,
            controlledMultipleFilter: [1, 3]
        };
    }
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const { controlledFilter, controlledMultipleFilter } = this.state;
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
                title: `extra`,
                dataIndex: 'index',
                key: 'extra',
                width: 200,
                filter: {
                    options: new Array(100).fill(null).map((v, i) => i),
                    search: true,
                    extra: (
                        <Button styleType="primary" style={{ width: '100%' }}>
                            Extra Button
                        </Button>
                    )
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
                title: `controlled`,
                dataIndex: 'index',
                key: 'controlled',
                width: 200,
                filter: {
                    value: controlledFilter,
                    options: [1, 2, 3]
                }
            },
            {
                title: `controlledMultiple`,
                dataIndex: 'index',
                key: 'controlledMultiple',
                width: 200,
                filter: {
                    value: controlledMultipleFilter,
                    options: [1, 2, 3],
                    multiple: true
                }
            },
            {
                title: `defaultValue`,
                dataIndex: 'index',
                key: 'defaultValue',
                width: 200,
                filter: {
                    defaultValue: 2,
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
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        onConditionChange={({ filters = [] }) => {
                            console.log(filters);
                            const controlledFilter = _.find(filters, filter => filter.key === 'controlled');
                            const controlledMultipleFilter = _.find(
                                filters,
                                filter => filter.key === 'controlledMultiple'
                            );
                            this.setState({
                                controlledFilter: controlledFilter == null ? null : controlledFilter.value,
                                controlledMultipleFilter:
                                    controlledMultipleFilter == null ? [] : controlledMultipleFilter.value
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
