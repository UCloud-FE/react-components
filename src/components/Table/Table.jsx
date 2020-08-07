import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import createReactContext from 'create-react-context';

import RcTable from 'src/libs/rc-table';
import deprecatedLog from 'src/utils/deprecatedLog';
import Pagination from 'src/components/Pagination';
import Notice from 'src/components/Notice';
import Checkbox from 'src/components/Checkbox';
import Radio from 'src/components/Radio';
import Select from 'src/components/Select';
import Icon from 'src/components/Icon';
import Popover from 'src/components/Popover';
import Tooltip from 'src/components/Tooltip';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';

import {
    prefixCls,
    TableWrap,
    PopupContainer,
    SortIcon,
    CancleSelect,
    selectIconCellCls,
    selectIconHeaderCls,
    placeholderCellCls,
    placeholderHeaderCls
} from './style';
import LOCALE from './locale/zh_CN';

const noop = () => {};
export const deprecatedLogForOnRowSelect = _.once(() => deprecatedLog('Table onRowSelect', 'rowSelection.onChange'));

export const placeholderKey = 'table_column_width_placeholder';

export const TableContext = createReactContext();

class TableRow extends PureComponent {
    state = {
        contextMenuVisible: false
    };
    hideContextMenu = () => {
        this.setState({
            contextMenuVisible: false
        });
    };
    render() {
        const { record, contextMenu, ...rest } = this.props;
        const { contextMenuVisible } = this.state;
        if (contextMenu) {
            return (
                <Popover
                    popup={<div>{contextMenu(record, this.hideContextMenu)}</div>}
                    trigger={['contextMenu']}
                    hideAction={['click']}
                    visible={contextMenuVisible}
                    onVisibleChange={visible => this.setState({ contextMenuVisible: visible })}
                    animation={null}
                    alignPoint
                >
                    <tr {...rest} />
                </Popover>
            );
        }
        return <tr {...rest} />;
    }
}
TableRow.propTypes = {
    record: PropTypes.object,
    contextMenu: PropTypes.func
};

const missingColumnKeyWarn = () => console.error('Warning: Table column need a unique key');

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Table' })
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: this.calDefaultFilters(props),
            filtersFromProps: this.calFiltersFromProps(props),
            order: null,
            selectedRowKeyMap: {},
            columnConfig: props.defaultColumnConfig,
            searchValue: ''
        };
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
        const { rowSelection } = props;
        const { selectedRowKeyMap } = this.state;
        if (_.isObject(rowSelection)) {
            if ('selectedRowKeys' in rowSelection) {
                _.each(rowSelection.selectedRowKeys, key => (selectedRowKeyMap[key] = true));
            } else if ('defaultSelectedRowKeys' in rowSelection) {
                _.each(rowSelection.defaultSelectedRowKeys, key => (selectedRowKeyMap[key] = true));
            }
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
                /** 选框是否为fixed */
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
                selectedTip: PropTypes.oneOf([true, false, 'bottom'])
            }),
            PropTypes.oneOf([true])
        ]),
        /**
         * 列表选项变化回调
         * @deprecated - 请使用rowSelection.onChange来替换
         */
        onRowSelect: PropTypes.func,
        /** 是否显示表头 */
        showHeader: PropTypes.bool,
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
        /** 滚动配置 */
        scroll: PropTypes.shape({
            /** x轴滚动配置，为true自动展开并滚动，为数字时设定表单的宽度 */
            x: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
            /** y轴滚动配置，为数字时设定表单的高度 */
            y: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
            /** table body 滚动时的回调 */
            onScroll: PropTypes.func
        }),
        /** 表格布局，当 scroll.y 有值时为 fixed，其它时候默认为 auto，可自行覆盖 */
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
            if (!column || filter.value == null || (column.multiple && _.isEmpty(filter.value))) {
                delete filters[key];
            } else {
                filter.column = column;
            }
        });
        return filters;
    };
    getExpandedRowKeys = (dataSource, changedUnExpandedRowKeys) => {
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
    onSelectedRowKeysChange = selectedRowKeyMap => {
        const { rowSelection } = this.props;
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
        const finalValue = value == null ? undefined : multiple && _.isEmpty(value) ? undefined : value;

        return (
            <Select
                options={newOptions}
                value={finalValue}
                onChange={value => {
                    this.handleFilter(columnKey, value == null || (multiple && !value.length) ? null : value);
                    onChange(value);
                }}
                className={`${prefixCls}-filter`}
                renderSelector={(content, visible) => {
                    return <Icon key="icon" type="filter" size="xs" color={visible ? 'blue' : null} />;
                }}
                popoverProps={{ getPopupContainer: () => this.popupContainer }}
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
                        desc: 'arrow-down',
                        asc: 'arrow-up'
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
                if (record[childrenName]) {
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
                return handleFilter(record[dataIndex], record, value, multiple);
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
        const { selectedRowKeyMap } = this.state;
        const extendSelectedRowKeyMap = {};
        _.each(enableKeysOfCurrentPage, key => {
            extendSelectedRowKeyMap[key] = checked;
        });
        this.onSelectedRowKeysChange({
            ...selectedRowKeyMap,
            ...extendSelectedRowKeyMap
        });
    };
    handleSelectRecord = (key, checked) => {
        const { rowSelection } = this.props;
        const { selectedRowKeyMap } = this.state;
        if (rowSelection.multiple === false) {
            this.onSelectedRowKeysChange({
                [key]: true
            });
        } else {
            this.onSelectedRowKeysChange({
                ...selectedRowKeyMap,
                [key]: checked
            });
        }
    };
    getRowKey = (record, index) => {
        const rowKey = this.props.rowKey;
        const key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
        return key === undefined ? index : key;
    };
    getColumnKey = (column = {}, index) => {
        const { key } = column;
        return (key === undefined ? index : key) + '';
    };
    cancleSelect = () => {
        this.onSelectedRowKeysChange({});
    };
    getColumns = (dataSourceOfCurrentPage, filters) => {
        const { columns, rowSelection, columnPlaceholder, locale } = this.props;
        const { order: currentOrder = {}, selectedRowKeyMap, columnConfig } = this.state;
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

        if (rowSelection) {
            let flatDataSourceOfCurrentPage = this.flatDataSource(dataSourceOfCurrentPage);
            let enableDataSourceOfCurrentPage = flatDataSourceOfCurrentPage;

            if (rowSelection.getDisabledOfRow) {
                enableDataSourceOfCurrentPage = _.filter(
                    flatDataSourceOfCurrentPage,
                    item => !rowSelection.getDisabledOfRow(item.record)
                );
            }
            let selectedEnableDataSourceOfCurrentPage = _.filter(
                enableDataSourceOfCurrentPage,
                item => selectedRowKeyMap[item.key]
            );

            const selectedEnableDataSourceOfCurrentPageCount = selectedEnableDataSourceOfCurrentPage.length;
            const isAllSelected =
                selectedEnableDataSourceOfCurrentPageCount === enableDataSourceOfCurrentPage.length &&
                selectedEnableDataSourceOfCurrentPageCount > 0;

            const selectedCount = _.filter(selectedRowKeyMap, v => v).length;
            const renderSelectedAllCheckbox = () => (
                <Checkbox
                    onChange={() => {
                        const enableKeysOfCurrentPage = enableDataSourceOfCurrentPage.map(item => item.key);
                        this.handleToggleCurrentPage(enableKeysOfCurrentPage, !isAllSelected);
                    }}
                    checked={isAllSelected}
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
                                    <CancleSelect onClick={this.cancleSelect}>{locale.cancleSelect}</CancleSelect>
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
                    if (rowSelection.getDisabledOfRow) {
                        disabled = rowSelection.getDisabledOfRow(record);
                    }
                    return rowSelection.multiple === false ? (
                        <Radio
                            disabled={disabled}
                            onChange={() => this.handleSelectRecord(rowKey)}
                            checked={selectedRowKeyMap[rowKey]}
                        />
                    ) : (
                        <Checkbox
                            disabled={disabled}
                            onChange={() => this.handleSelectRecord(rowKey, !selectedRowKeyMap[rowKey])}
                            checked={selectedRowKeyMap[rowKey]}
                        />
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
            locale,
            hideExpandIcon,
            onRow = noop,
            components,
            onExpand,
            zebraCrossing,
            columnPlaceholder,
            tableLayout,
            scroll,
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

        const defaultExpandAllRowsProps = !defaultExpandAllRows
            ? null
            : (() => {
                  const { changedUnExpandedRowKeys = {} } = this.state;
                  const expandedRowKeys = this.getExpandedRowKeys(dataSource, changedUnExpandedRowKeys);

                  return {
                      expandedRowKeys,
                      onExpand: this.onExpandHandler
                  };
              })();

        return (
            <TableContext.Provider
                value={{
                    columns: _c,
                    columnConfig: columnConfig,
                    onColumnConfigChange: this.onColumnConfigChange,
                    handleSearch: this.handleSearch,
                    locale,
                    getPopupContainer: this.getPopupContainer
                }}
            >
                <TableWrap
                    className={className}
                    style={style}
                    hideExpandIcon={hideExpandIcon}
                    zebraCrossing={zebraCrossing}
                >
                    <PopupContainer innerRef={this.savePopupContainer} />
                    <RcTable
                        {...defaultExpandAllRowsProps}
                        {...rest}
                        scroll={scroll}
                        tableLayout={tableLayout ? tableLayout : scroll && scroll.y ? 'fixed' : undefined}
                        prefixCls={prefixCls}
                        data={dataSource}
                        columns={columns}
                        onRow={this.onRow}
                        components={_.extend({}, components, {
                            body: {
                                row: TableRow
                            }
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
        );
    }
}

export default Table;
export { prefixCls };
