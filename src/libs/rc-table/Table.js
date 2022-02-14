import React from 'react';
import PropTypes from 'prop-types';
import { Provider, create } from 'mini-store';
import classes from 'component-classes';
import { polyfill } from 'react-lifecycles-compat';

import { debounce, warningOnce } from './utils';
import ColumnManager from './ColumnManager';
import HeadTable from './HeadTable';
import BodyTable from './BodyTable';
import ExpandableTable from './ExpandableTable';

class Table extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        useFixedHeader: PropTypes.bool,
        columns: PropTypes.array,
        prefixCls: PropTypes.string,
        bodyStyle: PropTypes.object,
        style: PropTypes.object,
        rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        onRow: PropTypes.func,
        onHeaderRow: PropTypes.func,
        showHeader: PropTypes.bool,
        title: PropTypes.func,
        footer: PropTypes.func,
        emptyText: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        scroll: PropTypes.object,
        rowRef: PropTypes.func,
        tableLayout: PropTypes.oneOf(['fixed', 'auto']),
        components: PropTypes.shape({
            table: PropTypes.any,
            header: PropTypes.shape({
                wrapper: PropTypes.any,
                row: PropTypes.any,
                cell: PropTypes.any
            }),
            body: PropTypes.shape({
                wrapper: PropTypes.any,
                row: PropTypes.any,
                cell: PropTypes.any
            })
        }),
        ...ExpandableTable.propTypes
    };

    static childContextTypes = {
        table: PropTypes.any,
        components: PropTypes.any
    };

    static defaultProps = {
        data: [],
        useFixedHeader: false,
        rowKey: 'key',
        rowClassName: () => '',
        onRow() {},
        onHeaderRow() {},
        prefixCls: 'rc-table',
        bodyStyle: {},
        style: {},
        showHeader: true,
        scroll: {},
        rowRef: () => null,
        emptyText: () => 'No Data'
    };

    constructor(props) {
        super(props);
        this.columnManager = new ColumnManager(props.columns);

        this.store = create({
            fixedColumnsHeadRowsHeight: [],
            fixedColumnsBodyRowsHeight: {}
        });

        this.debouncedWindowResize = debounce(this.handleWindowResize, 150);
    }

    state = {};

    getChildContext() {
        const components = this.props.components || {};
        return {
            table: {
                props: this.props,
                columnManager: this.columnManager,
                saveRef: this.saveRef,
                components: {
                    table: components.table || 'table',
                    header: {
                        wrapper: components.header?.wrapper || 'thead',
                        row: components.header?.row || 'tr',
                        cell: components.header?.cell || 'th'
                    },
                    body: {
                        wrapper: components.body?.wrapper || 'tbody',
                        row: components.body?.row || 'tr',
                        cell: components.body?.cell || 'td'
                    }
                }
            }
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.columns && nextProps.columns !== prevState.columns) {
            return {
                columns: nextProps.columns
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        // when table changes to empty, reset scrollLeft
        if (prevProps.data.length > 0 && this.props.data.length === 0 && this.hasScrollX()) {
            this.resetScrollX();
        }
        // update scroll position
        if (this.props.columns !== prevState.columns) {
            this.setScrollPositionClassName();
        }
    }

    componentWillUnmount() {
        if (this.resizeEvent) {
            this.resizeEvent.remove();
        }
        if (this.debouncedWindowResize) {
            this.debouncedWindowResize.cancel();
        }
    }

    componentDidMount() {
        this.setScrollPositionClassName();
    }

    getRowKey = (record, index) => {
        const rowKey = this.props.rowKey;
        const key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
        warningOnce(
            key !== undefined,
            'Each record in table should have a unique `key` prop,' + 'or set `rowKey` to an unique primary key.'
        );
        return key === undefined ? index : key;
    };

    setScrollPosition(position) {
        this.scrollPosition = position;
        if (this.tableNode) {
            const { prefixCls } = this.props;
            classes(this.tableNode)
                .remove(new RegExp(`^${prefixCls}-scroll-position-.+$`))
                .add(`${prefixCls}-scroll-position-${position}`);
        }
    }

    setScrollPositionClassName() {
        const node = this.bodyTable;
        const scrollToLeft = node.scrollLeft === 0;
        const scrollToRight =
            node.scrollLeft + 1 >= node.children[0].getBoundingClientRect().width - node.getBoundingClientRect().width;
        if (scrollToLeft && scrollToRight) {
            this.setScrollPosition('both');
        } else if (scrollToLeft) {
            this.setScrollPosition('left');
        } else if (scrollToRight) {
            this.setScrollPosition('right');
        } else if (this.scrollPosition !== 'middle') {
            this.setScrollPosition('middle');
        }
    }

    handleWindowResize = () => {
        this.setScrollPositionClassName();
    };

    resetScrollX() {
        if (this.headTable) {
            this.headTable.scrollLeft = 0;
        }
        if (this.bodyTable) {
            this.bodyTable.scrollLeft = 0;
        }
    }

    hasScrollX() {
        const { scroll = {} } = this.props;
        return 'x' in scroll;
    }

    handleBodyScrollLeft = e => {
        // Fix https://github.com/ant-design/ant-design/issues/7635
        if (e.currentTarget !== e.target) {
            return;
        }
        const target = e.target;
        const { headTable, bodyTable } = this;
        if (target.scrollLeft !== this.lastScrollLeft) {
            this.setScrollPositionClassName();
            if (this.useFixedHeader()) {
                if (target === bodyTable && headTable) {
                    headTable.scrollLeft = target.scrollLeft;
                } else if (target === headTable && bodyTable) {
                    bodyTable.scrollLeft = target.scrollLeft;
                }
            }
        }
        // Remember last scrollLeft for scroll direction detecting.
        this.lastScrollLeft = target.scrollLeft;
    };

    handleBodyScroll = e => {
        this.handleBodyScrollLeft(e);
    };

    saveRef = name => node => {
        this[name] = node;
    };

    renderMainTable() {
        const { scroll, tableLayout } = this.props;

        const table = [
            this.renderTable({
                columns: this.columnManager.groupedColumns(),
                onScroll: scroll.onScroll,
                tableLayout
            }),
            this.renderEmptyText(),
            this.renderFooter()
        ];

        return table;
    }

    renderTable(options) {
        const { columns, onScroll, tableLayout } = options;

        const headTable = (
            <HeadTable
                key="head"
                columns={columns}
                tableClassName=""
                handleBodyScrollLeft={this.handleBodyScrollLeft}
                expander={this.expander}
                tableLayout={tableLayout}
            />
        );

        const bodyTable = (
            <BodyTable
                key="body"
                columns={columns}
                tableClassName=""
                getRowKey={this.getRowKey}
                handleBodyScroll={e => {
                    this.handleBodyScroll(e);
                    onScroll && onScroll(e);
                }}
                expander={this.expander}
                tableLayout={tableLayout}
            />
        );

        return [headTable, bodyTable];
    }

    renderTitle() {
        const { title, prefixCls } = this.props;
        return title ? (
            <div className={`${prefixCls}-title`} key="title">
                {title(this.props.data)}
            </div>
        ) : null;
    }

    renderFooter() {
        const { footer, prefixCls } = this.props;
        return footer ? (
            <div className={`${prefixCls}-footer`} key="footer">
                {footer(this.props.data)}
            </div>
        ) : null;
    }

    renderEmptyText() {
        const { emptyText, prefixCls, data } = this.props;
        if (data.length) {
            return null;
        }
        const emptyClassName = `${prefixCls}-placeholder`;
        return (
            <div className={emptyClassName} key="emptyText">
                {typeof emptyText === 'function' ? emptyText() : emptyText}
            </div>
        );
    }

    useFixedHeader = () => {
        const { useFixedHeader, scroll } = this.props;
        return useFixedHeader || (scroll && scroll.y);
    };

    render() {
        const props = this.props;
        const prefixCls = props.prefixCls;

        if (this.state.columns) {
            this.columnManager.reset(props.columns);
        }

        let className = props.prefixCls;
        if (props.className) {
            className += ` ${props.className}`;
        }
        if (this.useFixedHeader()) {
            className += ` ${prefixCls}-fixed-header`;
        }

        return (
            <Provider store={this.store}>
                <ExpandableTable {...props} columnManager={this.columnManager} getRowKey={this.getRowKey}>
                    {expander => {
                        this.expander = expander;
                        return (
                            <div ref={this.saveRef('tableNode')} className={className} style={props.style}>
                                {this.renderTitle()}
                                <div className={`${prefixCls}-content`}>{this.renderMainTable()}</div>
                            </div>
                        );
                    }}
                </ExpandableTable>
            </Provider>
        );
    }
}

polyfill(Table);

export default Table;
