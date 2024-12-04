import React from 'react';
import Pagination from 'src/components/Pagination';
import List from 'src/components/List';

// demo start
const Demo = () => {
    const { ConfigInfo, ActionIcon } = List;
    const [dataSource, setDataSource] = React.useState([]);
    const [finalData, setFinalData] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10
    });
    React.useEffect(() => {
        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i + '',
            title: `name-${i}`,
            titleTip: `name-${i}`,
            content: `desc-${i}`,
            extra: <ActionIcon disabled popup="操作" />
        }));
        setDataSource(data);
    }, []);

    React.useEffect(() => {
        const { current, pageSize } = pagination;
        const from = (current - 1) * pageSize;
        const to = from + pageSize;
        const data = dataSource.slice(from, to);
        setFinalData(data);
    }, [dataSource, pagination]);

    return (
        <>
            <ConfigInfo customTitleWidth={'100%'} dataSource={finalData} col={1} />
            <div
                style={{
                    fontSize: '12px',
                    userSelect: 'none',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    float: 'right',
                    marginTop: '12px'
                }}
            >
                <Pagination
                    size="sm"
                    total={dataSource.length}
                    {...{
                        hideOnSinglePage: false,
                        showQuickJumper: true,
                        showSizeChanger: true
                    }}
                    onChange={(current, pageSize) => {
                        setPagination({
                            current,
                            pageSize
                        });
                    }}
                    onPageSizeChange={(current, pageSize) => {
                        setPagination({
                            current,
                            pageSize
                        });
                    }}
                    onAdvise={(current, pageSize) => {
                        setPagination({
                            current,
                            pageSize
                        });
                    }}
                />
            </div>
        </>
    );
};
// demo end

export default Demo;
