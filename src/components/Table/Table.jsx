import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RcTable from 'rc-table';
import createReactContext from 'create-react-context';

import deprecatedLog from 'src/utils/deprecatedLog';
import Pagination from 'components/Pagination';
import Notice from 'components/Notice';
import Checkbox from 'components/Checkbox';
import Select from 'components/Select';
import Icon from 'components/Icon';
import Popover from 'components/Popover';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';

import { prefixCls, TableWrap, PopupContainer } from './style';
import LOCALE from './locale/zh_CN';

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

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Table' })
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {},
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
    }
    static propTypes = {
        /** 分页组件的配置，传入null为隐藏分页 */
        pagination: PropTypes.object,
        /** 数据源 */
        dataSource: PropTypes.array,
        /** 表列信息 */
        columns: PropTypes.array.isRequired,
        /** 表列配置项，非受控 */
        defaultColumnConfig: PropTypes.object,
        /** 表列配置修改回调 */
        onColumnConfigChange: PropTypes.func,
        /** 额外表信息渲染 */
        expandedRowRender: PropTypes.func,
        /** 额外表展开按钮是否独立占据一格，data有children时有效 */
        expandIconAsCell: PropTypes.bool,
        /** 列表可选选项配置 */
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
                getDisabledOfRow: PropTypes.func
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
            y: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
        }),
        /** 定义如何获取每行的键值 */
        rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
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
            return (
                _.map(record)
                    .join('')
                    .indexOf(searchValue) >= 0
            );
        },
        rowKey: 'key'
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
    };
    /**
     * @deprecated
     */
    deprecatedOnRowSelect = selectedRowKeys => {
        if ('onRowSelect' in this.props) {
            deprecatedLog('onRowSelect', 'rowSelection.onChange');
            this.props.onRowSelect(selectedRowKeys);
        }
    };
    onSelectedRowKeysChange = selectedRowKeyMap => {
        const { rowSelection } = this.props;
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
                searchValue: v,
                pagination: { ...this.state.pagination, current: 1 }
            });
        }
    };
    renderFilter = (filter, key, dataIndex) => {
        if (!filter) {
            return null;
        }
        const { options, handleFilter, multiple, ...rest } = filter;
        const filterState = this.state.filters;
        const newOptions = _.map(options, option => (_.isObject(option) ? option : { value: option }));
        return (
            <Select
                options={newOptions}
                value={filterState[key] ? filterState[key].value : undefined}
                onChange={value => {
                    let selectedOptionsLabel;
                    if (multiple) {
                        const selectedOptions = _.filter(
                            newOptions,
                            option => _.findIndex(value, v => v === option.value) >= 0
                        );
                        selectedOptionsLabel = selectedOptions.map(
                            option => (option.label !== undefined ? option.label : option.value)
                        );
                    } else {
                        const selectedOption = _.find(newOptions, option => option.value === value);
                        selectedOptionsLabel =
                            selectedOption.label !== undefined ? selectedOption.label : selectedOption.value;
                    }
                    this.handleFilter(
                        key,
                        value == null || (multiple && !value.length)
                            ? null
                            : {
                                  dataIndex,
                                  value,
                                  multiple,
                                  handleFilter,
                                  label: selectedOptionsLabel
                              }
                    );
                }}
                className={`${prefixCls}-filter`}
                renderSelector={(content, visible) => {
                    return <Icon key="icon" type="filter" size="xs" color={visible ? 'blue' : null} />;
                }}
                popover={{ getPopupContainer: () => this.popupContainer }}
                multiple={multiple}
                {...rest}
            />
        );
    };
    handleFilter = (key, filter) => {
        const filters = { ...this.state.filters };
        if (filter == null) {
            delete filters[key];
        } else {
            filters[key] = filter;
        }
        this.setState({
            filters: filters,
            pagination: { ...this.state.pagination, current: 1 }
        });
    };
    clearFilter = () => {
        this.setState({
            filters: {},
            searchValue: ''
        });
    };
    renderOrder = (order, key, dataIndex, state = 'none') => {
        if (!order) {
            return null;
        }
        const { handleOrder } = order;
        return (
            <Icon
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
        this.setState({
            order: {
                key,
                dataIndex,
                handleOrder,
                state: {
                    none: 'desc',
                    desc: 'asc',
                    asc: 'desc'
                }[state]
            }
        });
    };
    getDataSource = () => {
        const { dataSource, handleSearch } = this.props;
        const { filters, order, searchValue } = this.state;
        let data = dataSource;
        const doFilter = (dataSource, filter) => {
            const {
                dataIndex,
                value,
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
            } = filter;
            return _.filter(dataSource, record => {
                return handleFilter(record[dataIndex], record, value, multiple);
            });
        };
        if (!_.isEmpty(filters)) {
            _.forEach(filters, (filter, key) => (data = doFilter(data, filter, key)));
        }
        const doSearch = (dataSource, searchValue) => {
            return dataSource.filter(record => {
                return handleSearch(record, searchValue);
            });
        };
        if (searchValue && searchValue.trim()) {
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
        if (order) {
            data = doOrder(data, order);
        }

        const total = data.length;
        const pagination = this.getPagination();
        if (pagination !== null) {
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
    handleToggleCurrentPage = (enableDataSourceOfCurrentPage, checked) => {
        const { selectedRowKeyMap } = this.state;
        const extendSelectedRowKeyMap = {};
        _.each(enableDataSourceOfCurrentPage, (record, index) => {
            const key = this.getRowKey(record, index);
            extendSelectedRowKeyMap[key] = checked;
        });
        this.onSelectedRowKeysChange({
            ...selectedRowKeyMap,
            ...extendSelectedRowKeyMap
        });
    };
    handleSelectRecord = (key, checked) => {
        const { selectedRowKeyMap } = this.state;
        this.onSelectedRowKeysChange({
            ...selectedRowKeyMap,
            [key]: checked === undefined ? !selectedRowKeyMap[key] : checked
        });
    };
    getRowKey = (record, index) => {
        const rowKey = this.props.rowKey;
        const key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
        return key === undefined ? index : key;
    };
    getColumns = dataSourceOfCurrentPage => {
        const { columns, rowSelection } = this.props;
        const { order: currentOrder = {}, selectedRowKeyMap, columnConfig } = this.state;
        let newColumns = columns.filter(column => {
            const { key } = column;
            return !columnConfig[key] || !columnConfig[key].hidden;
        });
        const generateColumnTitle = column => {
            const { filter, dataIndex, key, title, order, children } = column;
            if (children) {
                return {
                    ...column,
                    children: children.map(generateColumnTitle)
                };
            } else {
                return {
                    ...column,
                    title: (
                        <span>
                            {title}
                            {this.renderFilter(filter, key, dataIndex)}
                            {this.renderOrder(
                                order,
                                key,
                                dataIndex,
                                currentOrder && currentOrder.key === key ? currentOrder.state : 'none'
                            )}
                        </span>
                    )
                };
            }
        };
        newColumns = newColumns.map(generateColumnTitle);

        if (rowSelection) {
            let enableDataSourceOfCurrentPage = dataSourceOfCurrentPage;
            if (rowSelection.getDisabledOfRow) {
                enableDataSourceOfCurrentPage = _.filter(
                    dataSourceOfCurrentPage,
                    record => !rowSelection.getDisabledOfRow(record)
                );
            }
            const selectedCountOfCurrentPage = _.filter(
                enableDataSourceOfCurrentPage,
                (record, index) => selectedRowKeyMap[this.getRowKey(record, index)]
            ).length;
            const isAllSelected =
                selectedCountOfCurrentPage === enableDataSourceOfCurrentPage.length && selectedCountOfCurrentPage > 0;
            newColumns.unshift({
                title: (
                    <Checkbox
                        onChange={() => this.handleToggleCurrentPage(enableDataSourceOfCurrentPage, !isAllSelected)}
                        checked={isAllSelected}
                    />
                ),
                key: 'table_row_selection',
                width: 46,
                fixed: rowSelection.fixed,
                render: (value, record, index) => {
                    const rowKey = this.getRowKey(record, index);
                    let disabled = false;
                    if (rowSelection.getDisabledOfRow) {
                        disabled = rowSelection.getDisabledOfRow(record);
                    }
                    return (
                        <Checkbox
                            disabled={disabled}
                            onChange={() => this.handleSelectRecord(rowKey, !selectedRowKeyMap[rowKey])}
                            checked={selectedRowKeyMap[rowKey]}
                        />
                    );
                }
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
        const renderLabel = (label, multiple) => {
            if (multiple) {
                let first = true;
                return _.map(label, _label => (first ? [(first = false), _label] : [' | ', _label]));
            } else {
                return label;
            }
        };
        return !_.isEmpty(filters) || searchValue ? (
            <div key="search-info" className={`${prefixCls}-tip-wrap`}>
                <Notice icon={null} closable={false} className={`${prefixCls}-filter-notice`} styleType="info">
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
                            {_.map(
                                filters,
                                filter =>
                                    first
                                        ? [(first = false), renderLabel(filter.label, filter.multiple)]
                                        : [', ', renderLabel(filter.label, filter.multiple)]
                            )}；
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
        if (!dataSource || !dataSource.length) {
            return (
                <div key="tip-info" className={`${prefixCls}-tip-wrap`}>
                    <div className={`${prefixCls}-empty-content-wrap`}>{emptyContent}</div>
                </div>
            );
        }
    };
    renderTitle = option => {
        const { title = () => {} } = this.props;
        return (
            <div>
                {title()}
                {this.renderSearchInfo(option)}
            </div>
        );
    };
    renderFooter = option => {
        const { footer = () => {} } = this.props;
        return (
            <div>
                {this.renderEmptyAndErrorInfo(option)}
                {footer()}
            </div>
        );
    };
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
            title = () => {},
            footer = () => {},
            locale,
            ...rest
        } = this.props;
        if (emptyContent === undefined) {
            emptyContent = <Notice closable={false}>{locale.emptyTip}</Notice>;
        }
        /* eslint-enable no-unused-vars */
        const pagination = this.getPagination();
        const { filters = {}, searchValue, columnConfig } = this.state;
        const { dataSource, total } = this.getDataSource();
        const columns = this.getColumns(dataSource);
        return (
            <TableContext.Provider
                value={{
                    columns: _c,
                    columnConfig: columnConfig,
                    onColumnConfigChange: this.onColumnConfigChange,
                    handleSearch: this.handleSearch,
                    locale
                }}
            >
                <TableWrap className={className} style={style}>
                    <PopupContainer innerRef={_ref => (this.popupContainer = _ref)} />
                    <RcTable
                        prefixCls={prefixCls}
                        data={dataSource}
                        columns={columns}
                        onRow={record => {
                            return {
                                record
                            };
                        }}
                        components={{
                            body: {
                                row: props => <TableRow contextMenu={contextMenu} {...props} />
                            }
                        }}
                        emptyText={null}
                        expandIconAsCell={!!expandedRowRender || expandIconAsCell}
                        expandedRowRender={expandedRowRender}
                        expandIconColumnIndex={columns[0] && columns[0].key === 'table_row_selection' ? 1 : 0}
                        title={() => this.renderTitle({ filters, searchValue, total, locale })}
                        footer={() => this.renderFooter({ dataSource: _d, emptyContent, errorContent })}
                        {...rest}
                    />
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
