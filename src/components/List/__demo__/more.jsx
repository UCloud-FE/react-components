import React from 'react';

import List from 'src/components/List';
import Link from 'src/components/Link';
import SvgIcon from 'src/components/SvgIcon';

// demo start
const Demo = () => {
    const { ConfigInfo, ActionIcon } = List;
    const [dataSource, setDataSource] = React.useState([]);
    const [finalData, setFinalData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef(null);
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
        timer.current = setTimeout(() => {
            const { current, pageSize } = pagination;
            const from = (current - 1) * pageSize;
            const to = from + pageSize;
            const data = dataSource.slice(from, to);
            setFinalData(v => [...v, ...data]);
            setLoading(false);
        }, 1000);
        return () => {
            clearTimeout(timer.current);
            timer.current = null;
        };
    }, [dataSource, pagination]);

    return (
        <>
            <ConfigInfo customTitleWidth={'100%'} dataSource={finalData} col={1} />
            <div
                style={{
                    fontSize: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginTop: '24px'
                }}
            >
                <Link
                    onClick={() => {
                        if (loading) {
                            return;
                        }
                        setLoading(true);
                        setPagination(v => {
                            return {
                                ...v,
                                current: v.current + 1
                            };
                        });
                    }}
                >
                    {loading ? (
                        <>
                            <SvgIcon type="ring-loading" spin />
                            加载中，请稍后
                        </>
                    ) : (
                        '查看更多'
                    )}
                </Link>
            </div>
        </>
    );
};
// demo end

export default Demo;
