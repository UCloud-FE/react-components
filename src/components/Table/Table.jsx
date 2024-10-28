import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import createReactContext from 'create-react-context';

import RcTable from 'src/libs/rc-table';
import deprecatedLog from 'src/utils/deprecatedLog';
import warning, { onceWarning } from 'src/utils/warning';
import Pagination from 'src/components/Pagination';
import Notice from 'src/components/Notice';
import Checkbox from 'src/components/Checkbox';
import SvgIcon from 'src/components/SvgIcon';
import Radio from 'src/components/Radio';
import Select from 'src/components/Select';
import Tooltip from 'src/components/Tooltip';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import { InheritProvider } from 'src/components/Popover/ContainerContext';

import {
    prefixCls,
    TableWrap,
    PopupContainer,
    SortIcon,
    FilterIcon,
    CancelSelect,
    selectIconCellCls,
    selectIconHeaderCls,
    placeholderCellCls,
    placeholderHeaderCls,
    draggerCls,
    draggerCellCls,
    draggerHeaderCls,
    contentCls,
    bodyCls,
    dragOverDownCls,
    dragOverUpCls
} from './style';
import LOCALE from './locale/zh_CN';
import DragWrap from './DragWrap';
import TableRow from './TableRow';
import ResizableTH from './ResizableTH';

const noop = () => {};
export const deprecatedLogForOnRowSelect = deprecatedLog('Table onRowSelect', 'rowSelection.onChange');

export const placeholderKey = 'table_column_width_placeholder';

export const TableContext = createReactContext();

const missingColumnKeyWarn = () => warning('Table column need a unique key');

const dragSortingWarning = onceWarning(`Can't use dragSorting with expandedRowRender or column.children`);

let uid = 0;

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Table' })
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: this.calDefaultFilters(props),
            filtersFromProps: this.calFiltersFromProps(props),
            order: null,
            selectedRowKeyMap: {},
            flatDataSourceKeys: [],
            indeterminateSelectedRowKeyMap: {},
            parentSelectedRowKeys: [],
            columnConfig: props.defaultColumnConfig,
            searchValue: ''
        };
        this.tableId = `uc_table_uid_${uid++}`;
        // init pagination
        const { pagination } = props;
        if (_.isObject(pagination)) {
            this.state.pagination = {
                current: 'defaultCurrent' in pagination ? pagination.defaultCurrent : 1,
                pageSize: 'defaultPageSize' in pagination ? pagination.defaultPageSize : 10
            };
        } else {
            this.state.pagination = {
                current: 1,
                pageSize: 10
            };
        }
        // init selectedRowKeyMap from rowSelection
        const { rowSelection, dataSource } = props;
        const { selectedRowKeyMap } = this.state;

        if (_.isObject(rowSelection)) {
            if ('selectedRowKeys' in rowSelection) {
                _.each(rowSelection.selectedRowKeys, key => (selectedRowKeyMap[key] = true));
            } else if ('defaultSelectedRowKeys' in rowSelection) {
                _.each(rowSelection.defaultSelectedRowKeys, key => (selectedRowKeyMap[key] = true));
            }

            this.initRenderRowSelectionDate({
                rowSelection
            });
        }
        // init order
        if ('order' in props) {
            const order = this.getOrder(props.order, props.columns);
            this.state.order = order;
        } else if ('defaultOrder' in props) {
            const order = this.getOrder(props.defaultOrder, props.columns);
            this.state.order = order;
        }
        this.check(props);
    }
    static propTypes = {
        /** 分页组件的配置，传入null为隐藏分页 */
        pagination: PropTypes.object,
        /** 数据源 */
        dataSource: PropTypes.array,
        /** 表列信息，具体属性参考 columns 事例 */
        columns: PropTypes.array.isRequired,
        /**
         * 启用后会创建一个无宽度的空列，用作宽度占位，占位后宽度溢出便不会导致表格列被压缩，多出的宽度会被空列占用。
         * 占位列 column.key 为 table\_column\_width\_placeholder，使用中需注意避免重复 key
         */
        columnPlaceholder: PropTypes.bool,
        /** 表列配置项，非受控 */
        defaultColumnConfig: PropTypes.object,
        /** 表列配置修改回调 */
        onColumnConfigChange: PropTypes.func,
        /** 额外表信息渲染 */
        expandedRowRender: PropTypes.func,
        /** 额外表展开按钮是否独立占据一格，data有children时有效 */
        expandIconAsCell: PropTypes.bool,
        /** 展开按钮的塞入的column index，expandIconAsCell为false时生效 */
        expandIconColumnIndex: PropTypes.number,
        /** 隐藏扩展列按钮 */
        hideExpandIcon: PropTypes.bool,
        /** 默认展开项，非受控 */
        defaultExpandedRowKeys: PropTypes.array,
        /** 展开项，受控 */
        expandedRowKeys: PropTypes.array,
        /** 是否默认展开所有列 */
        defaultExpandAllRows: PropTypes.bool,
        /** 展开事件 */
        onExpandedRowsChange: PropTypes.func,
        /** 展开按钮点击事件 */
        onExpand: PropTypes.func,
        /**
         * 设置行props
         * @argument record - 行数据
         * @argument index - 行当前翻页中的index 不可作为key使用 不建议使用
         */
        onRow: PropTypes.func,
        /** 设置表头props
         * @argument record - 行数据
         * @argument index - 表头行的index 表示存在分组时(column.children)的表头层级
         */
        onHeaderRow: PropTypes.func,
        /**
         * 列表可选选项配置.
         * column.key 为 table\_row\_selection，使用中需注意避免重复 key
         */
        rowSelection: PropTypes.oneOfType([
            PropTypes.shape({
                /** 选框是否为 fixed */
                fixed: PropTypes.bool,
                /** 选中项变化回调 */
                onChange: PropTypes.func,
                /** 默认当前选中项，uncontrolled */
                defaultSelectedRowKeys: PropTypes.array,
                /** 当前选中项，controlled */
                selectedRowKeys: PropTypes.array,
                /** 获取当前行选中禁用状态 */
                getDisabledOfRow: PropTypes.func,
                /**
                 * 是否多选
                 * @default true
                 */
                multiple: PropTypes.bool,
                /**
                 * 多选选中时的提示，bottom 为显示在下方
                 * @default true
                 */
                selectedTip: PropTypes.oneOf([true, false, 'bottom']),
                /** 是否禁用 */
                disabled: PropTypes.bool,
                /**
                 * 需配合 columns.children 使用，控制是否开启父子联动，默认关闭
                 * @default false
                 */

                linkage: PropTypes.bool
            }),
            PropTypes.oneOf([true])
        ]),
        /** 拖拽排序 */
        dragSorting: PropTypes.oneOfType([
            PropTypes.oneOf([true]),
            PropTypes.shape({
                fixed: PropTypes.bool,
                // (record, fromIndex, toIndex) => void
                onChange: PropTypes.func
            })
        ]),
        /**
         * 列表选项变化回调
         * @deprecated - 请使用rowSelection.onChange来替换
         */
        onRowSelect: PropTypes.func,
        /** 是否显示表头 */
        showHeader: PropTypes.bool,
        /** 是否可拖拽调节表格列大小 */
        columnResizable: PropTypes.bool,
        /** 头部内容 */
        title: PropTypes.func,
        /** 底部内容 */
        footer: PropTypes.func,
        /** 无数据时的展示内容 */
        emptyContent: PropTypes.node,
        /** 报错信息 */
        errorContent: PropTypes.node,
        /** 如何搜索 */
        handleSearch: PropTypes.func,
        /** 自定义样式 */
        customStyle: PropTypes.shape({
            outerPadding: PropTypes.string
        }),
        /** 滚动配置 */
        scroll: PropTypes.shape({
            /** x轴滚动配置，为true自动展开并滚动，为数字时设定表单的宽度 */
            x: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
            /** y轴滚动配置，为数字时设定表单的高度 */
            y: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
            /** table body 滚动时的回调 */
            onScroll: PropTypes.func
        }),
        /** 表格布局，当 scroll.x 有值时为 fixed，其它时候默认为 auto，可自行覆盖 */
        tableLayout: PropTypes.oneOf(['auto', 'fixed']),
        /** 定义如何获取每行的键值 */
        rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        /** 是否有斑马线，存在子表格时，斑马线样式可能会错乱 */
        zebraCrossing: PropTypes.bool,
        /** 自定义表格组件，慎用 */
        components: PropTypes.shape({
            header: PropTypes.shape({
                cell: PropTypes.any
            })
        }),
        /** 默认排序设置，key 为 column key，state 为升序(asc)或降序(desc) */
        defaultOrder: PropTypes.shape({
            key: PropTypes.string,
            state: PropTypes.oneOf(['desc', 'asc'])
        }),
        /** 受控排序设置，key 为 column key，state 为升序(asc)或降序(desc) */
        order: PropTypes.shape({
            key: PropTypes.string,
            state: PropTypes.oneOf(['desc', 'asc'])
        }),
        /**
         * 表格的筛选等条件变更时的回调
         * @param condition - 变更的数据
         * @param condition.order - 排序
         * @param condition.filter - 筛选
         * @param condition.searchValue - 搜索
         */
        onConditionChange: PropTypes.func,
        /**
         * order、filter、searchValue、pagination变化时表格内部不处理
         */
        doNotHandleCondition: PropTypes.bool,
        /**
         * 右键菜单
         * @param record - 该行的记录值
         */
        contextMenu: PropTypes.func,
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        style: PropTypes.object,
        /** @ignore */
        locale: PropTypes.object
    };
    static defaultProps = {
        pagination: {},
        dataSource: [],
        columns: [],
        defaultColumnConfig: {},
        onColumnConfigChange: () => {},
        handleSearch: (record, searchValue) => {
            return _.map(record).join('').indexOf(searchValue) >= 0;
        },
        customStyle: {},
        rowKey: 'key'
    };
    check = props => {
        const { columns } = props;
        _.each(columns, column => {
            if (column.key === undefined) missingColumnKeyWarn();
        });
    };
    componentWillReceiveProps = nextProps => {
        const { rowSelection } = nextProps;

        if (_.isObject(rowSelection) && 'selectedRowKeys' in rowSelection) {
            const selectedRowKeyMap = {};
            _.each(rowSelection.selectedRowKeys, key => (selectedRowKeyMap[key] = true));
            this.setState({
                selectedRowKeyMap
            });
        }
        this.initRenderRowSelectionDate(nextProps);
        // pick controlled filter value
        this.setState({
            filtersFromProps: this.calFiltersFromProps(nextProps)
        });
        if ('order' in nextProps) {
            const order = this.getOrder(nextProps.order, nextProps.columns);
            this.setState({
                order
            });
        }
    };
    initRenderRowSelectionDate = props => {
        const { rowSelection, dataSource: nextDateSource } = props;
        const { dataSource } = this.props;
        const data = nextDateSource || dataSource;

        const { indeterminateSelectedRowKeyMap, selectedRowKeyMap } = this.state;
        if (!data || !data.length || !_.isObject(rowSelection)) {
            return;
        }

        const flatDataSourceKeys = this.flatDataSourceKeysForMap({
            dataSource: data
        });

        if (rowSelection.multiple !== false && rowSelection.linkage && flatDataSourceKeys.length) {
            const { finalMergeMap, finalIndeterminate } = Object.keys(selectedRowKeyMap).reduce(
                (p, key) => {
                    const { mergeMap, indeterminate } = this.initLinkageRowSelectionMap(
                        selectedRowKeyMap,
                        true,
                        key,
                        flatDataSourceKeys,
                        indeterminateSelectedRowKeyMap
                    );
                    return {
                        finalMergeMap: {
                            ...p.finalMergeMap,
                            ...mergeMap
                        },
                        finalIndeterminate: {
                            ...p.finalIndeterminate,
                            ...indeterminate
                        }
                    };
                },
                {
                    finalMergeMap: {},
                    finalIndeterminate: {}
                }
            );

            Object.keys(finalMergeMap).forEach(key => {
                selectedRowKeyMap[key] = finalMergeMap[key];
            });
            this.setState({
                indeterminateSelectedRowKeyMap: {
                    ...finalIndeterminate
                }
            });
        }
        this.setState({
            flatDataSourceKeys: flatDataSourceKeys
        });
    };
    getOrder = (order, columns) => {
        if (!order || !columns) return null;
        const { key, state } = order;
        if (!key || !state) return null;
        const column = _.find(columns, column => column.key === key);
        if (!column) return null;
        const { order: columnOrder, dataIndex } = column;
        if (!columnOrder) return null;
        const { handleOrder } = columnOrder;
        return {
            key,
            state,
            dataIndex,
            handleOrder
        };
    };
    calFiltersFromProps = ({ columns = [] }) => {
        const filters = {};
        // pick filter controlled value
        columns.forEach((column, i) => {
            const { filter } = column;
            const columnKey = this.getColumnKey(column, i);
            if (!filter) return;
            let filterValue;
            if ('value' in filter) {
                filterValue = filter.value;
                filters[columnKey] = {
                    value: filterValue
                };
            }
        });
        return filters;
    };
    calDefaultFilters = ({ columns = [] }) => {
        const filters = {};
        // pick filter controlled value
        columns.forEach((column, i) => {
            const { filter } = column;
            if (!filter) return;
            const columnKey = this.getColumnKey(column, i);
            let filterValue;
            // pick default value
            if ('defaultValue' in filter) {
                filterValue = filter.defaultValue;
                filters[columnKey] = {
                    value: filterValue
                };
            }
        });
        return filters;
    };
    mergeFilters = (stateFilters, propsFilters, columns) => {
        const filters = {
            ...stateFilters,
            ...propsFilters
        };
        _.each(filters, (filter, key) => {
            const column = _.find(columns, (column, i) => this.getColumnKey(column, i) === key);
            if (!column || filter.value == null || !column.filter || (column.filter.multiple && !filter.value.length)) {
                delete filters[key];
            } else {
                filter.column = column;
            }
        });
        return filters;
    };
    // 所有key 都为字符串
    getExpandedRowKeys = (dataSource, changedUnExpandedRowKeys) => {
        // 拍平数据
        const flatDataSource = this.flatDataSource(dataSource);

        const expandedRowKeys = [];
        _.each(flatDataSource, item => {
            const { key } = item;
            if (!changedUnExpandedRowKeys[key]) {
                expandedRowKeys.push(key);
            }
        });
        return expandedRowKeys;
    };
    /**
     * @deprecated
     */
    deprecatedOnRowSelect = selectedRowKeys => {
        if ('onRowSelect' in this.props) {
            deprecatedLogForOnRowSelect();
            this.props.onRowSelect(selectedRowKeys);
        }
    };
    //设置选中的keys
    onSelectedRowKeysChange = selectedRowKeyMap => {
        const { rowSelection } = this.props;
        const { parentSelectedRowKeys } = this.state;
        if (!rowSelection) return;
        const selectedRowKeys = [];

        _.each(selectedRowKeyMap, (selected, key) => {
            selected && selectedRowKeys.push(key);
        });
        if (_.isObject(rowSelection)) {
            if (rowSelection.onChange) {
                rowSelection.onChange(selectedRowKeys);
            }
            if (!('selectedRowKeys' in rowSelection)) {
                this.setState({
                    selectedRowKeyMap
                });
            }
        } else {
            this.setState({
                selectedRowKeyMap
            });
        }
        this.deprecatedOnRowSelect(selectedRowKeys);
    };
    onColumnConfigChange = config => {
        const { onColumnConfigChange } = this.props;
        this.setState({
            columnConfig: config
        });
        onColumnConfigChange(config);
    };
    handleSearch = v => {
        if (v !== this.state.searchValue) {
            this.setState({
                pagination: { ...this.state.pagination, current: 1 }
            });
            this.handleConditionChange({ searchValue: v });
        }
    };
    handleConditionChange = (stateCondition, callbackCondition = {}) => {
        stateCondition = {
            ..._.pick(this.state, ['order', 'filters', 'searchValue']),
            ...stateCondition
        };
        this.setState({
            ...stateCondition
        });
        const { onConditionChange } = this.props;

        let { order, filters, searchValue } = callbackCondition;
        if (!('order' in callbackCondition)) {
            order = stateCondition.order;
        }
        if (!('filters' in callbackCondition)) {
            filters = stateCondition.filters;
        }
        if (!('searchValue' in callbackCondition)) {
            searchValue = stateCondition.searchValue;
        }

        onConditionChange &&
            onConditionChange({
                order: order ? _.pick(order, ['key', 'state']) : null,
                filters: _.map(filters, (filter, key) => ({ key, value: filter.value })),
                searchValue
            });
    };
    renderFilter = (column, filterInfo = {}, index) => {
        const { filter } = column;
        if (!filter) {
            return null;
        }
        const columnKey = this.getColumnKey(column, index);
        const { options, multiple, onChange = () => {}, ...rest } = filter;
        const newOptions = _.map(options, option => (_.isObject(option) ? option : { value: option }));

        const { value } = filterInfo;
        const finalValue = value == null || (multiple && !value.length) ? null : value;

        return (
            <Select
                options={newOptions}
                value={finalValue}
                onChange={value => {
                    this.handleFilter(columnKey, value == null || (multiple && !value.length) ? null : value);
                    onChange(value);
                }}
                className={`${prefixCls}-filter`}
                renderSelector={(content, active) => {
                    return <FilterIcon key="icon" type="filter" active={active} disabled={rest.disabled} />;
                }}
                multiple={multiple}
                {...rest}
            />
        );
    };
    handleFilter = (key, value) => {
        const finalFilters = this.mergeFilters(
            this.state.filters,
            {
                ...this.state.filtersFromProps,
                [key]: {
                    value
                }
            },
            this.props.columns
        );
        this.setState({
            pagination: { ...this.state.pagination, current: 1 }
        });
        this.handleConditionChange({ filters: finalFilters });
    };
    clearFilter = () => {
        this.handleConditionChange({ filters: {}, searchValue: '' }, { filters: {} });
    };
    renderOrder = (order, key, dataIndex, state = 'none') => {
        if (!order) {
            return null;
        }
        const { handleOrder } = order;
        return (
            <SortIcon
                type={
                    {
                        none: 'sort',
                        desc: 'line-arrow-down',
                        asc: 'line-arrow-up'
                    }[state]
                }
                onClick={() => {
                    this.handleOrder(key, {
                        dataIndex,
                        handleOrder,
                        state
                    });
                }}
            />
        );
    };
    handleOrder = (key, { dataIndex, handleOrder, state }) => {
        const order =
            state === 'asc'
                ? null
                : {
                      key,
                      dataIndex,
                      handleOrder,
                      state: {
                          none: 'desc',
                          desc: 'asc'
                      }[state]
                  };
        // controlled
        if ('order' in this.props) {
            this.handleConditionChange({}, { order });
        } else {
            this.handleConditionChange({
                order
            });
        }
    };
    flatDataSource = (dataSource = [], childrenName = 'children') => {
        const result = [];
        const push = record => {
            const index = result.length;
            result.push({
                record,
                index,
                key: this.getRowKey(record, index)
            });
        };
        const loop = array => {
            array.forEach(record => {
                if (record && record[childrenName]) {
                    const newRecord = { ...record };
                    delete newRecord[childrenName];
                    push(newRecord);
                    if (record[childrenName].length > 0) {
                        loop(record[childrenName]);
                    }
                } else {
                    push(record);
                }
            });
        };
        loop(dataSource);
        return result;
    };
    getDataSource = filters => {
        const { dataSource, handleSearch, doNotHandleCondition } = this.props;
        const { order, searchValue } = this.state;
        let data = _.clone(dataSource);
        const doFilter = (dataSource, filter) => {
            const { value, column: columnInfo } = filter;
            const {
                dataIndex,
                filter: {
                    multiple,
                    handleFilter = (value, record, filterValue, multiple) => {
                        if (value == null) {
                            return false;
                        }
                        if (_.isNumber(value)) {
                            value = '' + value;
                        } else if (!_.isString(value)) {
                            return false;
                        }
                        if (!multiple) {
                            return value.indexOf(filterValue) >= 0;
                        } else {
                            for (let i = 0; i < filterValue.length; i++) {
                                const v = filterValue[i];
                                if (value.indexOf(v) >= 0) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            } = columnInfo;
            return _.filter(dataSource, record => {
                return handleFilter(record && record[dataIndex], record, value, multiple);
            });
        };
        if (!doNotHandleCondition && !_.isEmpty(filters)) {
            _.forEach(filters, (filter, key) => (data = doFilter(data, filter, key)));
        }
        const doSearch = (dataSource, searchValue) => {
            return dataSource.filter(record => {
                return handleSearch(record, searchValue);
            });
        };
        if (!doNotHandleCondition && searchValue && searchValue.trim()) {
            data = doSearch(data, searchValue.trim());
        }
        const doOrder = (dataSource, order) => {
            const { dataIndex, handleOrder, state } = order;
            return dataSource.sort(
                handleOrder
                    ? (...args) => handleOrder(state, ...args)
                    : {
                          desc: (a, b) => (a[dataIndex] > b[dataIndex] ? -1 : a[dataIndex] < b[dataIndex] ? 1 : 0),
                          asc: (a, b) => (a[dataIndex] < b[dataIndex] ? -1 : a[dataIndex] > b[dataIndex] ? 1 : 0)
                      }[state]
            );
        };
        if (!doNotHandleCondition && order) {
            data = doOrder(data, order);
        }

        const total = data.length;
        const pagination = this.getPagination();
        if (!doNotHandleCondition && pagination !== null) {
            const { current, pageSize } = pagination;
            const from = (current - 1) * pageSize;
            const to = from + pageSize;
            data = data.slice(from, to);
        }
        return {
            dataSource: data,
            total
        };
    };
    handleToggleCurrentPage = (enableKeysOfCurrentPage, checked) => {
        const { flatDataSourceKeys } = this.state;

        const parentSelectedRowKeys = [];

        if (checked) {
            flatDataSourceKeys.forEach(item => {
                if (!item.parent) {
                    parentSelectedRowKeys.push(item.key);
                }
            });
        }

        const { selectedRowKeyMap } = this.state;
        const extendSelectedRowKeyMap = {};
        _.each(enableKeysOfCurrentPage, key => {
            extendSelectedRowKeyMap[key] = checked;
        });

        this.setState(
            {
                indeterminateSelectedRowKeyMap: {},
                parentSelectedRowKeys: parentSelectedRowKeys
            },
            () => {
                this.onSelectedRowKeysChange({
                    ...selectedRowKeyMap,
                    ...extendSelectedRowKeyMap
                });
            }
        );
    };
    /**
     * @param {
     * {
     *      key: string ,
     *      checked: boolean ,
     *      data : {
     *              key: string ,
     *              index: number ,
     *              record: object,
     *              childrenKeys: string[]
     *      }[]
     * }
     * }
     */
    handleSelectRecord = ({ key, checked, flatDataSourceKeys }) => {
        const { rowSelection } = this.props;
        const { selectedRowKeyMap, indeterminateSelectedRowKeyMap } = this.state;
        if (rowSelection.multiple === false) {
            this.onSelectedRowKeysChange({
                [key]: true
            });
        } else {
            const nowSelectedRowKeyMap = {
                ...selectedRowKeyMap,
                [key]: checked
            };
            if (!rowSelection.linkage) {
                this.onSelectedRowKeysChange({
                    ...nowSelectedRowKeyMap
                });
                return;
            }

            const { mergeMap, indeterminate } = this.initLinkageRowSelectionMap(
                nowSelectedRowKeyMap,
                checked,
                key,
                flatDataSourceKeys,
                indeterminateSelectedRowKeyMap
            );
            const truthyKeys = Object.keys(mergeMap).filter(key => Boolean(mergeMap[key]));

            const parentSelectedRowKeys = truthyKeys.reduce(
                (p, key) => {
                    const record = flatDataSourceKeys.find(record => String(record.key) == String(key));
                    const parentKeys = p.filter(x => !record.childrenKeys.includes(x));
                    return parentKeys;
                },
                [...truthyKeys]
            );

            this.setState(
                {
                    indeterminateSelectedRowKeyMap: indeterminate,
                    parentSelectedRowKeys: parentSelectedRowKeys
                },
                () => {
                    this.onSelectedRowKeysChange({
                        ...mergeMap
                    });
                }
            );
        }
    };
    initLinkageRowSelectionMap(nowSelectedRowKeyMap, checked, key, flatDataSourceKeys, indeterminateSelectedRowKeyMap) {
        // 半选状态
        const indeterminate = {
            ...indeterminateSelectedRowKeyMap
        };
        // 子勾选状态变更 ，通过兄弟节点状态推断父勾选状态，存储修改父状态的map
        const childrenKeysAllChecked = {};
        // 父勾选变更，子状态同步变更，存储子的map
        const parentKeyCheckedMap = {};
        // 选中的key
        const record = flatDataSourceKeys.find(record => String(record.key) == String(key));
        // 禁用需要剔除的key
        const disabledItems = this.initDisabledOfRow(flatDataSourceKeys);

        indeterminate[String(record.key)] = false;
        // 子被动全选
        if (record && record.childrenKeys && record.childrenKeys.length > 0) {
            record.childrenKeys.forEach(childKey => {
                parentKeyCheckedMap[childKey] = checked;
                indeterminate[String(childKey)] = false;
            });
        }
        // 父被动状态
        function changeParentChecked(record, checked, disabledItems) {
            const mergeMap = {
                ...nowSelectedRowKeyMap,
                ...parentKeyCheckedMap,
                ...childrenKeysAllChecked
            };
            const truthyKeys = Object.keys(mergeMap).filter(key => Boolean(mergeMap[key]));

            const filterChildrenKeys = record.childrenKeys.filter(x => !disabledItems.includes(x));

            if (record && checked) {
                if (filterChildrenKeys.every(x => truthyKeys.includes(x))) {
                    childrenKeysAllChecked[record.key] = true;
                    indeterminate[String(record.key)] = false;
                } else {
                    childrenKeysAllChecked[record.key] = false;
                    indeterminate[String(record.key)] = true;
                }
            }
            if (record && !checked) {
                if (filterChildrenKeys.every(x => !truthyKeys.includes(x))) {
                    childrenKeysAllChecked[record.key] = false;
                    indeterminate[String(record.key)] = false;
                } else {
                    childrenKeysAllChecked[record.key] = false;
                    indeterminate[String(record.key)] = true;
                }
            }
            if (record.parent) {
                changeParentChecked(record.parent, checked, disabledItems);
            }
        }

        if (record.parent) {
            changeParentChecked(record.parent, checked, disabledItems);
        }
        disabledItems.forEach(key => {
            indeterminate[String(key)] = false;
        });

        const mergeMap = {
            ...nowSelectedRowKeyMap,
            ...parentKeyCheckedMap,
            ...childrenKeysAllChecked
        };

        Object.keys(mergeMap).forEach(key => {
            if (disabledItems.includes(key)) {
                mergeMap[String(key)] = false;
            }
        });

        return {
            mergeMap,
            indeterminate
        };
    }
    initDisabledOfRow(flatDataSourceKeys) {
        const { rowSelection } = this.props;

        if (!rowSelection.getDisabledOfRow) {
            return [];
        }
        let needFilterData = [...flatDataSourceKeys];
        needFilterData = _.filter(needFilterData, item => rowSelection.getDisabledOfRow(item.record));
        // 父禁用逻辑
        // function getDisabledOfRow(record, result = []) {
        //     result.push(record.key);
        //     if (record.parent) {
        //         getDisabledOfRow(record.parent, result);
        //     }
        //     return result;
        // }

        const allDisableItems = needFilterData.reduce((p, item) => {
            // const keys = getDisabledOfRow(item, []);
            // return [...keys, ...item.childrenKeys];
            return [...p, item.key, ...item.childrenKeys];
        }, []);

        return allDisableItems;
    }
    getRowKey = (record, index) => {
        const rowKey = this.props.rowKey;
        const key = typeof rowKey === 'function' ? rowKey(record, index) : record && record[rowKey];
        return key === undefined ? index : key;
    };
    getColumnKey = (column = {}, index) => {
        const { key } = column;
        return (key === undefined ? index : key) + '';
    };

    //转换 rowSelection 所需 data
    flatDataSourceKeysForMap = ({ dataSource }, childrenName = 'children') => {
        const result = [];
        const _self = this;
        function getKey(children) {
            return children.reduce((p, item) => {
                const curIndex = _self.getRowKey(item, item.tableKey);
                p = [...p, curIndex];

                let childrenKeys = [];

                if (item[childrenName]) {
                    childrenKeys = getKey(item[childrenName]);
                }
                return [...p, ...childrenKeys];
            }, []);
        }
        const push = (record, parent) => {
            const index = result.length;
            const children = record[childrenName] || [];
            delete record[childrenName];
            const data = {
                record,
                parent,
                index,
                key: this.getRowKey(record, index),
                childrenKeys: getKey(children)
            };
            result.push(data);
            return data;
        };
        const loop = (array, parent) => {
            array.forEach(record => {
                if (record && record[childrenName]) {
                    const newRecord = { ...record };
                    const parentData = push(newRecord, parent);
                    if (record[childrenName].length > 0) {
                        loop(record[childrenName], parentData);
                    }
                } else {
                    push(record, parent);
                }
            });
        };
        // 递归函数，用于深度优先遍历并设置 key
        function setTableKeys(data, index = 0) {
            data.forEach(item => {
                item.tableKey = index++;
                if (item[childrenName] && item[childrenName].length > 0) {
                    index = setTableKeys(item[childrenName], index);
                }
            });
            return index;
        }
        const cloneDataSource = [...dataSource].filter(item => !!item);

        // 调用递归函数
        setTableKeys(cloneDataSource);

        loop(cloneDataSource, null);

        return result;
    };
    getDragSorting = () => {
        const { dragSorting, expandedRowRender, columns } = this.props;
        if (!dragSorting) return false;
        // 排序暂不支持有展开行配置的table
        if (expandedRowRender || (columns && columns.findIndex(column => !!column.children) >= 0)) {
            dragSortingWarning();
            return false;
        }
        return dragSorting;
    };
    getColumns = (dataSourceOfCurrentPage, filters) => {
        const { columns, rowSelection, columnPlaceholder, locale, dataSource, columnResizable } = this.props;

        const {
            order: currentOrder = {},
            selectedRowKeyMap,
            columnConfig,
            indeterminateSelectedRowKeyMap,
            flatDataSourceKeys
        } = this.state;
        const cloneColumns = columns.map((column, index) => ({
            ...column,
            index
        }));
        let newColumns = cloneColumns.filter(column => {
            const { key } = column;
            return !columnConfig[key] || !columnConfig[key].hidden;
        });

        const generateColumnTitle = column => {
            const { dataIndex, title, renderTitle, order, children, index } = column;
            const columnKey = this.getColumnKey(column, index);
            if (children) {
                return {
                    ...column,
                    children: children.map(generateColumnTitle)
                };
            } else {
                return {
                    ...column,
                    title: (
                        <div>
                            {renderTitle ? renderTitle(title) : title}
                            {this.renderFilter(column, filters[columnKey], index)}
                            {this.renderOrder(
                                order,
                                columnKey,
                                dataIndex,
                                currentOrder && currentOrder.key === columnKey ? currentOrder.state : 'none'
                            )}
                        </div>
                    )
                };
            }
        };
        newColumns = newColumns.map(generateColumnTitle);

        if (columnResizable) {
            newColumns.forEach(column => {
                column.resizable = true;
            });
        }

        if (rowSelection) {
            const flatDataSourceOfCurrentPage = this.flatDataSource(dataSourceOfCurrentPage);
            let enableDataSourceOfCurrentPage = flatDataSourceOfCurrentPage;
            const flatDataSource = this.flatDataSource(dataSource);

            let enableDataSource = flatDataSource;

            const { disabled: selectionDisabled } = rowSelection;

            const disableItems = rowSelection.getDisabledOfRow && this.initDisabledOfRow(flatDataSourceKeys);

            const linkageFlag = rowSelection.multiple !== false && rowSelection.linkage ? true : false;

            if (rowSelection.getDisabledOfRow) {
                enableDataSourceOfCurrentPage = _.filter(flatDataSourceOfCurrentPage, item =>
                    linkageFlag ? !disableItems.includes(item.key) : !rowSelection.getDisabledOfRow(item.record)
                );
                enableDataSource = _.filter(flatDataSource, item =>
                    linkageFlag ? !disableItems.includes(item.key) : !rowSelection.getDisabledOfRow(item.record)
                );
            }

            const selectedEnableDataSourceOfCurrentPage = _.filter(
                enableDataSourceOfCurrentPage,
                item => selectedRowKeyMap[item.key]
            );
            const selectedEnableDataSource = _.filter(enableDataSource, item => selectedRowKeyMap[item.key]);

            const selectedEnableDataSourceOfCurrentPageCount = selectedEnableDataSourceOfCurrentPage.length;
            const isAllSelected =
                selectedEnableDataSourceOfCurrentPageCount === enableDataSourceOfCurrentPage.length &&
                selectedEnableDataSourceOfCurrentPageCount > 0;

            const selectedCount = _.filter(selectedRowKeyMap, v => v).length;
            const renderSelectedAllCheckbox = () => (
                <Checkbox
                    disabled={selectionDisabled}
                    onChange={() => {
                        const enableKeysOfCurrentPage = enableDataSourceOfCurrentPage.map(item => item.key);
                        this.handleToggleCurrentPage(enableKeysOfCurrentPage, !isAllSelected);
                    }}
                    checked={isAllSelected}
                    indeterminate={!isAllSelected && selectedEnableDataSourceOfCurrentPageCount > 0}
                />
            );
            newColumns.unshift({
                title:
                    rowSelection.multiple === false ? null : rowSelection.selectedTip === false ? (
                        renderSelectedAllCheckbox()
                    ) : (
                        <Tooltip
                            visible={selectedCount > 0}
                            getPopupContainer={this.getPopupContainer}
                            popup={
                                <span>
                                    {locale.selected} {selectedCount}{' '}
                                    <CancelSelect
                                        onClick={() => {
                                            const enableKeys = selectedEnableDataSource.map(item => item.key);
                                            this.handleToggleCurrentPage(enableKeys, false);
                                        }}
                                    >
                                        {locale.cancelSelect}
                                    </CancelSelect>
                                </span>
                            }
                            placement={rowSelection.selectedTip === 'bottom' ? 'bottomLeft' : 'topLeft'}
                            align={{
                                offset: [-8, 0]
                            }}
                        >
                            {renderSelectedAllCheckbox()}
                        </Tooltip>
                    ),
                key: 'table_row_selection',
                width: 32,
                fixed: rowSelection.fixed,
                onHeaderCell: () => ({ className: selectIconHeaderCls }),
                onCell: () => ({ className: selectIconCellCls }),
                render: (value, record, index) => {
                    const rowKey = this.getRowKey(record, index);
                    let disabled = false;
                    if (selectionDisabled) {
                        disabled = true;
                    } else if (rowSelection.getDisabledOfRow) {
                        disabled = linkageFlag
                            ? disableItems.includes(record.key)
                            : rowSelection.getDisabledOfRow(record);
                    }
                    return rowSelection.multiple === false ? (
                        <Radio
                            disabled={disabled}
                            onChange={() =>
                                this.handleSelectRecord({
                                    key: rowKey
                                })
                            }
                            checked={!!selectedRowKeyMap[rowKey]}
                        />
                    ) : (
                        <Checkbox
                            disabled={disabled}
                            onChange={() =>
                                this.handleSelectRecord({
                                    key: rowKey,
                                    checked: !selectedRowKeyMap[rowKey],
                                    flatDataSourceKeys: flatDataSourceKeys
                                })
                            }
                            checked={!!selectedRowKeyMap[rowKey]}
                            indeterminate={!!indeterminateSelectedRowKeyMap[String(rowKey)]}
                        />
                    );
                }
            });
        }
        const dragSorting = this.getDragSorting();
        if (dragSorting) {
            newColumns.unshift({
                title: null,
                key: 'table_row_drag_sorting',
                width: 40,
                fixed: dragSorting?.fixed,
                onHeaderCell: () => ({ className: draggerHeaderCls }),
                onCell: () => ({ className: draggerCellCls }),
                render: (value, record, index) => {
                    const rowKey = this.getRowKey(record, index);
                    return (
                        <span
                            data-row-key={rowKey}
                            onMouseEnter={this.setDraggable}
                            onMouseLeave={this.unsetDraggable}
                            className={draggerCls}
                            data-testid="draggable"
                        >
                            <SvgIcon type="dragger" size="16px" />
                        </span>
                    );
                }
            });
        }

        if (columnPlaceholder) {
            const lastUnFixedIndex = _.findLastIndex(newColumns, columnConfig => !columnConfig.fixed);
            newColumns.splice(lastUnFixedIndex + 1, 0, {
                title: '',
                key: placeholderKey,
                onHeaderCell: () => ({ className: placeholderHeaderCls }),
                onCell: () => ({ className: placeholderCellCls }),
                render: () => null
            });
        }
        return newColumns;
    };
    getTableDom = () => document.querySelector(`[data-table-id="${this.tableId}"]`);
    getContentDom = () => this.getTableDom().querySelector(`.${contentCls}`);
    getBodyDom = () => this.getTableDom().querySelector(`.${bodyCls}`);
    getRowDom = rowKey => this.getTableDom().querySelector(`tr[data-row-key="${rowKey}"]`);
    getRowDomByIndex = rowIndex => this.getTableDom().querySelector(`tr[data-row-index="${rowIndex}"]`);
    __dragEnterCounter = null;
    initDrag = source => {
        this.__dragEnterCounter = 0;
        this.unsetDragOver(source, source);
    };
    setDraggable = e => {
        const rowKey = e.currentTarget.dataset['rowKey'];
        this.getRowDom(rowKey).setAttribute('draggable', true);
    };
    unsetDraggable = e => {
        const rowKey = e.currentTarget.dataset['rowKey'];
        this.getRowDom(rowKey).setAttribute('draggable', false);
    };
    setDragOver = (source, target) => {
        let [sourceIndex, targetIndex] = this.transformDomIndex(source, target);
        if (sourceIndex > targetIndex) targetIndex--;
        if (targetIndex >= 0) {
            this.getRowDomByIndex(targetIndex)?.classList.add(dragOverDownCls);
        } else {
            this.getRowDomByIndex(0).classList.add(dragOverUpCls);
        }
    };
    unsetDragOver = (source, target) => {
        let [sourceIndex, targetIndex] = this.transformDomIndex(source, target);
        if (sourceIndex > targetIndex) targetIndex--;
        if (targetIndex >= 0) {
            this.getRowDomByIndex(targetIndex)?.classList.remove(dragOverDownCls);
        } else {
            this.getRowDomByIndex(0).classList.remove(dragOverUpCls);
        }
    };
    onDragStart = source => {
        this.initDrag(source);
    };
    onDragEnd = source => {
        this.getTableDom()
            .querySelectorAll('.uc-fe-table-row')
            .forEach(row => {
                row.classList.remove(dragOverDownCls);
                row.classList.remove(dragOverUpCls);
            });
        this.initDrag(source);
    };
    onDragEnter = (source, target) => {
        this.__dragEnterCounter++;
        this.unsetDragOver(source, source);
        this.setDragOver(source, target);
    };
    onDragLeave = (source, target) => {
        this.__dragEnterCounter--;
        this.unsetDragOver(source, target);
        // drag out the table
        if (!this.__dragEnterCounter) this.setDragOver(source, source);
    };
    onDrop = (source, target) => {
        if (source === target) return;
        const [sourceIndex, targetIndex] = this.transformDomIndex(source, target);
        const dragSorting = this.getDragSorting();
        dragSorting?.onChange(sourceIndex, targetIndex);
        this.initDrag(source);
    };
    transformDomIndex = (source, target) => [+source.dataset['rowIndex'], +target.dataset['rowIndex']];

    getPagination = () => {
        const { pagination: paginationS } = this.state,
            { pagination: paginationP } = this.props;
        return paginationP === null
            ? null
            : {
                  ...paginationS,
                  ...paginationP
              };
    };
    renderSearchInfo = option => {
        const { filters, searchValue, total, locale } = option;

        let first = true;
        const renderLabel = ({
            value,
            column: {
                filter: { multiple, options }
            }
        }) => {
            options = options.map(option => (!_.isObject(option) ? { value: option, label: option } : option));
            if (multiple) {
                const label = _.map(value, v => {
                    const option = _.find(options, option => {
                        return v === option.value;
                    });
                    return option && option.label;
                });
                let first = true;
                return _.map(label, _label => (first ? [(first = false), _label] : [' | ', _label]));
            } else {
                const option = _.find(options, option => {
                    return value === option.value;
                });
                return option && option.label;
            }
        };
        return !_.isEmpty(filters) || searchValue ? (
            <div key="search-info" className={`${prefixCls}-search-tip-wrap`}>
                <Notice icon={null} closable={false} className={`${prefixCls}-filter-notice`}>
                    {searchValue && (
                        <span>
                            {locale.search}
                            {locale.colon}
                            {searchValue}
                            {locale.semicolon}
                        </span>
                    )}
                    {!_.isEmpty(filters) && (
                        <span>
                            {locale.filter}
                            {locale.colon}
                            {_.map(filters, filterInfo =>
                                first ? [(first = false), renderLabel(filterInfo)] : [', ', renderLabel(filterInfo)]
                            )}
                            {locale.semicolon}
                        </span>
                    )}
                    <span>
                        {locale.searchResult}
                        {locale.colon}
                        {total}
                        {locale.items}
                        {locale.semicolon}
                    </span>
                    <span>
                        <a className={`${prefixCls}-reset-link`} onClick={this.clearFilter}>
                            {locale.reset}
                        </a>
                    </span>
                </Notice>
            </div>
        ) : null;
    };
    renderEmptyAndErrorInfo = option => {
        const { dataSource, emptyContent, errorContent } = option;
        if (errorContent) {
            return (
                <div key="tip-info" className={`${prefixCls}-tip-wrap`}>
                    <div className={`${prefixCls}-error-content-wrap`}>{errorContent}</div>
                </div>
            );
        }
        if ((!dataSource || !dataSource.length) && emptyContent) {
            return (
                <div key="tip-info" className={`${prefixCls}-tip-wrap`}>
                    <div className={`${prefixCls}-empty-content-wrap`}>{emptyContent}</div>
                </div>
            );
        }
    };
    renderTitle = option => {
        const { title } = this.props;
        return [
            title && (
                <div className={`${prefixCls}-custom-title`} key="custom">
                    {title()}
                </div>
            ),
            this.renderSearchInfo(option)
        ];
    };
    renderFooter = option => {
        return <div>{this.renderEmptyAndErrorInfo(option)}</div>;
    };
    // 展开的callback
    onExpandHandler = (expanded, record) => {
        const { changedUnExpandedRowKeys = {} } = this.state;
        const { onExpand } = this.props;
        const rowKey = this.getRowKey(record);
        if (expanded) {
            delete changedUnExpandedRowKeys[rowKey];
        } else {
            changedUnExpandedRowKeys[rowKey] = true;
        }
        this.setState({
            changedUnExpandedRowKeys
        });
        if (onExpand) {
            onExpand(expanded, record);
        }
    };
    onRow = (record, index) => {
        const { onRow = noop, contextMenu } = this.props;
        return {
            ...onRow(record, index),
            record,
            contextMenu
        };
    };
    savePopupContainer = _ref => {
        this.popupContainer = _ref;
    };
    getPopupContainer = () => this.popupContainer;
    render() {
        /* eslint-disable no-unused-vars */
        let {
            pagination: _p,
            dataSource: _d,
            columns: _c,
            rowSelection,
            onRowSelect,
            contextMenu,
            emptyContent,
            errorContent,
            className,
            style,
            expandedRowRender,
            expandIconAsCell,
            expandIconColumnIndex,
            defaultExpandAllRows,
            title = noop,
            footer = noop,
            columnResizable,
            locale,
            hideExpandIcon,
            onRow = noop,
            components,
            onExpand,
            zebraCrossing,
            columnPlaceholder,
            tableLayout,
            scroll,
            customStyle,
            dragSorting: _dragSorting,
            ...rest
        } = this.props;
        if (emptyContent === undefined) {
            emptyContent = <Notice closable={false}>{locale.emptyTip}</Notice>;
        }
        /* eslint-enable no-unused-vars */
        const pagination = this.getPagination();
        const { filters, filtersFromProps, searchValue, columnConfig } = this.state;
        const finalFilters = this.mergeFilters(filters, filtersFromProps, _c);
        let { dataSource, total } = this.getDataSource(finalFilters);
        if (pagination && 'total' in pagination) {
            total = pagination.total;
        }
        const columns = this.getColumns(dataSource, finalFilters);

        // 默认展开所有行
        const defaultExpandAllRowsProps = !defaultExpandAllRows
            ? null
            : (() => {
                  const { changedUnExpandedRowKeys = {} } = this.state;
                  const expandedRowKeys = this.getExpandedRowKeys(dataSource, changedUnExpandedRowKeys);

                  return {
                      expandedRowKeys
                  };
              })();

        const dragSorting = this.getDragSorting();

        return (
            <DragWrap
                draggable={!!dragSorting}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                onDrop={this.onDrop}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
            >
                <InheritProvider value={{ getPopupContainer: this.getPopupContainer }}>
                    <TableContext.Provider
                        value={{
                            columns: _c,
                            columnConfig: columnConfig,
                            onColumnConfigChange: this.onColumnConfigChange,
                            handleSearch: this.handleSearch,
                            locale
                        }}
                    >
                        <TableWrap
                            className={className}
                            style={style}
                            hideExpandIcon={hideExpandIcon}
                            zebraCrossing={zebraCrossing}
                            customStyle={customStyle}
                            data-table-id={this.tableId}
                        >
                            <PopupContainer ref={this.savePopupContainer} />
                            <RcTable
                                defaultExpandAllRows={defaultExpandAllRows}
                                {...defaultExpandAllRowsProps}
                                onExpand={this.onExpandHandler}
                                {...rest}
                                scroll={scroll}
                                tableLayout={tableLayout ? tableLayout : scroll && scroll.x ? 'fixed' : undefined}
                                prefixCls={prefixCls}
                                data={dataSource}
                                columns={columns}
                                onRow={this.onRow}
                                components={_.extend({}, components, {
                                    body: {
                                        row: TableRow
                                    },
                                    ...(columnResizable ? { header: { cell: ResizableTH } } : {})
                                })}
                                emptyText={null}
                                expandIconAsCell={!!expandedRowRender || expandIconAsCell}
                                expandedRowRender={expandedRowRender}
                                expandIconColumnIndex={
                                    expandIconColumnIndex === undefined
                                        ? columns[0] && columns[0].key === 'table_row_selection'
                                            ? 1
                                            : 0
                                        : expandIconColumnIndex
                                }
                                title={() => this.renderTitle({ filters: finalFilters, searchValue, total, locale })}
                                footer={() => this.renderFooter({ dataSource: _d, emptyContent, errorContent })}
                            />
                            {footer()}
                            {pagination === null ? null : (
                                <Pagination
                                    size="sm"
                                    total={total}
                                    {...{
                                        hideOnSinglePage: false,
                                        showQuickJumper: true,
                                        showSizeChanger: true
                                    }}
                                    {...pagination}
                                    className={`${prefixCls}-pagination`}
                                    onChange={(current, pageSize) => {
                                        this.setState({
                                            pagination: { current, pageSize }
                                        });
                                        pagination.onChange && pagination.onChange(current, pageSize);
                                    }}
                                    onPageSizeChange={(current, pageSize) => {
                                        this.setState({
                                            pagination: { current, pageSize }
                                        });
                                        pagination.onPageSizeChange && pagination.onPageSizeChange(current, pageSize);
                                    }}
                                    onAdvise={(current, pageSize) => {
                                        this.setState({
                                            pagination: { current, pageSize }
                                        });
                                        pagination.onAdvise && pagination.onAdvise(current, pageSize);
                                    }}
                                />
                            )}
                        </TableWrap>
                    </TableContext.Provider>
                </InheritProvider>
            </DragWrap>
        );
    }
}

export default Table;
export { prefixCls };
