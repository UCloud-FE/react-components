import React from 'react';

import Table from 'src/components/Table';

// demo start

const _dataSource = new Array(11).fill(null).map((v, i) => ({
    key: i,
    data: `data-${i}`
}));
const columns = new Array(5).fill(null).map((v, i) => ({
    title: `title-${i}`,
    key: `title-${i}`,
    width: 200,
    render: record => <span>content {record.data}</span>
}));

const Demo1 = () => {
    const [dataSource, setDataSource] = React.useState(() => [..._dataSource]);
    const handleDragSorting = React.useCallback((fromIndex, toIndex) => {
        console.log(fromIndex, toIndex);
        setDataSource(dataSource => {
            const nextDataSource = [...dataSource];
            nextDataSource.splice(toIndex, 0, ...nextDataSource.splice(fromIndex, 1));
            return nextDataSource;
        });
    }, []);

    return (
        <div>
            <div className="demo-wrap">
                <Table
                    dragSorting={{ onChange: handleDragSorting }}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={null}
                    scroll={{ x: true }}
                />
            </div>
        </div>
    );
};

const columns2 = new Array(6).fill(null).map((v, i) => ({
    title: `title-${i}`,
    key: `title-${i}`,
    width: 200,
    render: record => <span>content {record.data}</span>
}));
columns2[0].fixed = true;

const Demo2 = () => {
    const [dataSource, setDataSource] = React.useState(() => [..._dataSource]);
    const handleDragSorting = React.useCallback((fromIndex, toIndex) => {
        console.log(fromIndex, toIndex);
        setDataSource(dataSource => {
            const nextDataSource = [...dataSource];
            nextDataSource.splice(toIndex, 0, ...nextDataSource.splice(fromIndex, 1));
            return nextDataSource;
        });
    }, []);

    return (
        <div>
            <div className="demo-wrap">
                <Table
                    dragSorting={{ onChange: handleDragSorting, fixed: true }}
                    dataSource={dataSource}
                    columns={columns2}
                    scroll={{ x: true, y: 200 }}
                    pagination={null}
                />
            </div>
        </div>
    );
};
const Demo = () => (
    <>
        <Demo1 />
        <Demo2 />
    </>
);
// demo end

export default Demo;
