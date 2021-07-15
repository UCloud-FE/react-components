import React from 'react';
import Table from 'src/components/Table';
import _ from 'lodash';

// demo start
const columnConfigKey = 'this-is-the-unique-key-of-this-table';
const defaultColumnConfig = {
    'title-1': {
        disabled: true,
        hidden: true
    },
    'title-2': {
        disabled: true
    },
    'title-3': {
        hidden: true
    }
};
const getColumnConfig = () => {
    if (typeof localStorage === 'undefined') {
        return defaultColumnConfig;
    }
    const localConfig = JSON.parse(localStorage.getItem(`${columnConfigKey}-1`));
    if (localConfig) {
        return _.merge({}, defaultColumnConfig, localConfig);
    } else {
        return defaultColumnConfig;
    }
};
const setColumnConfig = config => {
    if (typeof localStorage === 'undefined') {
        return;
    }
    localStorage.setItem(
        `${columnConfigKey}-1`,
        JSON.stringify(
            _.mapValues(config, v => ({
                hidden: v.hidden
            }))
        )
    );
};
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        title={() => (
                            <div className="clear-fixed">
                                <div style={{ float: 'right' }}>
                                    <Table.ColumnConfigButton />
                                </div>
                            </div>
                        )}
                        defaultColumnConfig={{
                            'title-1': {
                                disabled: true,
                                hidden: true
                            },
                            'title-2': {
                                disabled: true
                            },
                            'title-3': {
                                hidden: true
                            }
                        }}
                        onColumnConfigChange={console.log}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        title={() => (
                            <div className="clear-fixed">
                                <div style={{ float: 'right' }}>
                                    <Table.ColumnConfigButton />
                                </div>
                            </div>
                        )}
                        defaultColumnConfig={Table.getColumnConfigFromLocalStorage(
                            `${columnConfigKey}-2`,
                            defaultColumnConfig
                        )}
                        onColumnConfigChange={config =>
                            Table.setColumnConfigToLocalStorage(`${columnConfigKey}-2`, config)
                        }
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        title={() => (
                            <div className="clear-fixed">
                                <div style={{ float: 'right' }}>
                                    <Table.ColumnConfigButton />
                                </div>
                            </div>
                        )}
                        defaultColumnConfig={getColumnConfig()}
                        onColumnConfigChange={setColumnConfig}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
