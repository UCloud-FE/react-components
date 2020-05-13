import React from 'react';

import Table from 'src/components/Table';
import Icon from 'src/components/Icon';

// demo start
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = [
            {
                /**
                 * @type {node}
                 * 表头展示内容，也是自定义表头弹窗中的展示内容
                 */
                title: `title`,
                /**
                 * @type {function}
                 * @param title - 上面的title
                 * 自定义表头展示内容，使用这个可以不影响在自定义弹窗中的展示
                 */
                renderTitle: title => (
                    <span>
                        <Icon type="circle" />
                        <span>{title}</span>
                        <Icon type="square" />
                    </span>
                ),
                /**
                 * @type {string}
                 * column的key，必传，用作性能优化和标识，不能重复
                 */
                key: `title`,
                /**
                 * @type {number}
                 * 固定列宽，表格固定宽度时会按照权重比例分割
                 */
                width: 200,
                /**
                 * @type {object}
                 * 筛选信息
                 * @property {array} options - 筛选选项
                 * @property {boolean} multiple - 是否为多选
                 * @property {string|string[]} defaultValue - 非受控默认筛选值
                 * @property {string|string[]} value - 受控筛选值
                 * @property {function} handleFilter - 自定义筛选函数
                 *      @param value - 根据dataIndex计算出来的值
                 *      @param record - 列表的数据
                 *      @param filterValue - 筛选的值
                 */
                filter: {
                    options: [1, 2, 3, 4]
                },
                /**
                 * @type {boolean | object}
                 * 是否支持排序，可传入handleOrder进行自定义排序逻辑
                 */
                order: true,
                /**
                 * @type {string}
                 * 指定数据key，默认展示为record[dataIndex]
                 */
                dataIndex: 'index',
                /**
                 * @type {function}
                 * @param value - 根据dataIndex计算出来的值，未传入dataIndex时为record
                 * @param record - 列表的数据
                 * @param index - 数据在该页的index，请勿使用该index，因为这个index为不可信数据，同一条数据在分页、筛选等变动时index不一致
                 * 自定义渲染内容
                 */
                render: value => {
                    return <span>content {value}</span>;
                }
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
