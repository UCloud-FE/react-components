import React from 'react';
import Table from 'components/Table';

// demo start
class Demo extends React.Component {
    render() {
        const dataSource = new Array(20).fill(null).map((v, i) => ({
            key: i,
            'index-0': `index-${i}`,
            'index-1': `index-${i}`,
            'index-2': `index-${i}`,
            'index-3': `index-${i}`,
            'index-4': `index-${i}`,
            'index-5': `index-${i}`
        }));
        const columns = [
            {
                title: 'title-0',
                dataIndex: 'index-0',
                width: 100,
                colSpan: 2,
                align: 'center',
                key: 'index-0',
                render: (text, { key }) => {
                    let rowSpan = 0;
                    if (key % 2 === 0) {
                        rowSpan = 2;
                    }
                    return {
                        children: text,
                        props: {
                            rowSpan
                        }
                    };
                }
            },
            {
                title: 'title-1',
                dataIndex: 'index-1',
                key: 'index-1',
                width: 100,
                colSpan: 0,
                align: 'center'
            },
            {
                title: 'title-2',
                dataIndex: 'index-2',
                key: 'index-2',
                width: 100,
                align: 'center'
            },
            {
                title: 'title-3',
                dataIndex: 'index-3',
                key: 'index-3',
                width: 100,
                align: 'center',
                render: (text, { key }) => {
                    if ((key + 1) % 5 === 0) {
                        return {
                            children: text,
                            props: {
                                colSpan: 2
                            }
                        };
                    }
                    return text;
                }
            },
            {
                title: 'title-4',
                dataIndex: 'index-4',
                key: 'index-4',
                width: 100,
                align: 'center',
                render: (text, { key }) => {
                    if ((key + 1) % 5 === 0) {
                        return {
                            children: text,
                            props: {
                                colSpan: 0
                            }
                        };
                    }
                    return text;
                }
            },
            {
                title: 'title-5',
                dataIndex: 'index-5',
                key: 'index-5',
                width: 100,
                align: 'center'
            }
        ];
        return (
            <div className="demo-wrap">
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}
// demo end

export default Demo;
