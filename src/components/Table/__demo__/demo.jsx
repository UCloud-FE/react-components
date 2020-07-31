import React from 'react';
import Table from 'components/Table';

// demo start
const randomString = () => {
    return new Array((Math.random() * 100) | 0).fill('v').join('');
};
const columns1 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        render: () => randomString()
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        width: 100,
        render: () => randomString()
    }
];
const columns2 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        width: 400,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        width: 100,
        render: () => randomString()
    }
];
const columns3 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        width: 400,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        render: () => randomString()
    }
];
let data = [];
data.length = 100;
data.fill({});
data = data.map((d, i) => ({
    key: i,
    name: `name-${i}`,
    desc: `desc-${i}`
}));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <h3>简单滚动布局</h3>
                <p>
                    表格宽度按照内容撑开展示，超过最大宽度可滚动，不需要设置列宽度比较方便，但是翻页时由于数据的不一致性表列宽度会变化，并且不能使用
                    scroll.y，否则会导致头部和数据宽度不一致
                </p>
                <div className="demo-wrap">
                    <Table columns={columns1} dataSource={data} scroll={{ x: true }} />
                </div>
                <h3>复杂滚动布局</h3>
                <p>
                    当表格需要上下滚动时，默认会启用 tableLayout fixed 固定表格宽度
                    <br />
                    可以使用固定的 scroll.x true 和 column.width（每个列都必须提供） 来保证表头和表格数据的宽度一致性
                </p>
                <div className="demo-wrap">
                    <Table columns={columns2} dataSource={data} scroll={{ x: true, y: 200 }} />
                </div>
                <p>
                    或者提供具体的 scroll.x，其中一列的宽度可以不设置将会根据剩余的宽度展示，不过注意 x 的值不能小于
                    width 的总和，否则不设宽度列会被压缩
                </p>
                <div className="demo-wrap">
                    <Table columns={columns3} dataSource={data} scroll={{ x: 1200, y: 200 }} />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
