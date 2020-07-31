import React from 'react';
import Table from 'components/Table';

// demo start
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(20).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <h2>横向滚动</h2>
                <p>目前横向滚动默认修改为 overflow auto，不设置 x 也会出滚动条</p>
                <div className="demo-wrap">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
                <p>设置后为 overflow scroll 滚动条会一直展示</p>
                <div className="demo-wrap">
                    <Table scroll={{ x: true }} dataSource={dataSource} columns={columns.slice(0, 2)} />
                </div>
                <h2>纵向滚动时表格被拆分成两个表格，所以需要注意设置 column width，否则会出现头和数据不同步</h2>
                <div className="demo-wrap">
                    <Table scroll={{ y: 200 }} dataSource={dataSource} columns={columns} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
