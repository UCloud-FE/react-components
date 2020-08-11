import React from 'react';
import _ from 'lodash';

import Table from 'src/components/Table';

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
        const autoWidthColumns = new Array(20).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            render: () => (
                <div style={{ minWidth: '100px', maxWidth: '300px' }}>
                    {new Array((Math.random() * i * 10) | 0).fill('v').join('')}
                </div>
            )
        }));
        return (
            <div>
                <h2>横向滚动</h2>
                <div className="demo-wrap">
                    <Table scroll={{ x: true }} dataSource={dataSource} columns={columns} />
                </div>
                <h2>无宽度时通过设置 tableLayout 会被内容撑开</h2>
                <div className="demo-wrap">
                    <Table scroll={{ x: true }} tableLayout="auto" dataSource={dataSource} columns={autoWidthColumns} />
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
