import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import Button from 'src/components/Button';
import Notice from 'src/components/Notice';
import Input from 'src/components/Input';
import SvgIcon from 'src/components/SvgIcon';
import uncontrolledDecorator from 'src/decorators/uncontrolled';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';

import LOCALE from './locale/zh_CN';
import {
    TransferWrap,
    partWrapCls,
    partContentCls,
    prefixCls,
    actionCls,
    actionWrapCls,
    searchCls,
    tipWrapCls,
    titleCls,
    footerCls,
    listWrapCls,
    searchClearBtnCls,
    disabledCls
} from './style';

const noop = () => {};

const Shape = {
    /**
     * 自定义顶栏文字，null 时隐藏
     */
    title: PropTypes.node,
    /**
     * 自定义底栏
     */
    footer: PropTypes.node,
    /**
     * 是否展示搜索框，可以为 boolean 或者 Object
     * 为 Object 时可传入 handleSearch 对搜索筛选进行自定义
     */
    search: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            /**
             * @argument searchValue - 搜索的值
             * @argument item - 当前匹配的项
             * @return 匹配结果
             */
            handleSearch: PropTypes.func
        })
    ]),
    /**
     * 禁用
     */
    disabled: PropTypes.bool
};

const defaultSearchHandle = (searchValue, item) => {
    return _.map(item).join('').indexOf(searchValue) >= 0;
};

@uncontrolledDecorator({ valueName: 'selectedKeys' })
@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Transfer' })
class Transfer extends PureComponent {
    static propTypes = {
        /**
         * 所有的数据源
         */
        dataSource: PropTypes.array.isRequired,
        /**
         * 自定义渲染列表
         */
        renderList: PropTypes.func.isRequired,
        /**
         * 已选中的数据 key，受控
         */
        selectedKeys: PropTypes.array,
        /**
         * 默认已选中的数据 key，非受控
         */
        defaultSelectedKeys: PropTypes.array,
        /**
         * 选中回调
         */
        onChange: PropTypes.func,
        /**
         * 是否禁用
         */
        disabled: PropTypes.bool,
        /**
         * 是否展示搜索框，可以为 boolean 或者 Object
         * 为 Object 时可传入 handleSearch 对搜索筛选进行自定义
         */
        search: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                /**
                 * @argument searchValue - 搜索的值
                 * @argument item - 当前匹配的项
                 * @return 匹配结果
                 */
                handleSearch: PropTypes.func
            })
        ]),
        /**
         * 源数据区域的配置
         */
        source: PropTypes.shape(Shape),
        /**
         * 已选数据区域的配置
         */
        target: PropTypes.shape(Shape),
        /** @ignore */
        locale: PropTypes.object,
        /**
         * @ignore
         */
        className: PropTypes.string
    };
    static defaultProps = {
        source: {},
        target: {},
        search: true,
        defaultSelectedKeys: [],
        onChange: noop
    };
    state = {
        sourceSelectedKeys: [],
        targetSelectedKeys: [],
        dataSourceGroup: {}
    };
    constructor(props) {
        super(props);
        const { dataSource, selectedKeys } = props;
        this.state.dataSourceGroup = this.groupDataSource(dataSource, selectedKeys);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource || nextProps.selectedKeys !== this.props.selectedKeys) {
            this.setState({
                dataSourceGroup: this.groupDataSource(nextProps.dataSource, nextProps.selectedKeys)
            });
        }
    }
    onSelectedChange = (type, keys) => {
        this.setState({
            [`${type}SelectedKeys`]: keys
        });
    };
    onSourceSelectedChange = keys => {
        this.onSelectedChange('source', keys);
    };
    onTargetSelectedChange = keys => {
        this.onSelectedChange('target', keys);
    };
    transfer = type => {
        const { sourceSelectedKeys, targetSelectedKeys } = this.state;
        const { selectedKeys, onChange } = this.props;
        if (type === 'source') {
            this.setState({
                sourceSelectedKeys: []
            });
            onChange([...selectedKeys, ...sourceSelectedKeys]);
        } else {
            this.setState({
                targetSelectedKeys: []
            });
            onChange(_.filter(selectedKeys, key => targetSelectedKeys.find(_key => key === _key) === undefined));
        }
    };
    handleSearch = (type, item) => {
        const { source, target, search: sharedSearch } = this.props;
        const { sourceSearchValue, targetSearchValue } = this.state;
        const searchValue = type === 'source' ? sourceSearchValue : targetSearchValue;
        if (!searchValue) return true;
        const props = { ...{ search: sharedSearch }, ...(type === 'source' ? source : target) };
        const { search } = props;
        if (!search) return true;
        const { handleSearch } = search;
        return handleSearch ? handleSearch(searchValue, item) : defaultSearchHandle(searchValue, item);
    };
    handleSourceSearch = item => {
        return this.handleSearch('source', item);
    };
    handleTargetSearch = item => {
        return this.handleSearch('target', item);
    };
    setSourceSearchValue = _.debounce(v => {
        this.setState({
            sourceSearchValue: v
        });
    }, 200);
    setTargetSearchValue = _.debounce(v => {
        this.setState({
            targetSearchValue: v
        });
    }, 200);
    onSourceSearch = e => {
        let v;
        if (typeof e === 'string') {
            v = e;
        } else if (!e || !e.target) {
            return;
        } else {
            v = e.target.value;
        }
        this.setSourceSearchValue(v);
    };
    onTargetSearch = e => {
        let v;
        if (typeof e === 'string') {
            v = e;
        } else if (!e || !e.target) {
            return;
        } else {
            v = e.target.value;
        }
        this.setTargetSearchValue(v);
    };
    clearSourceSearch = () => {
        this.setState({
            sourceSearchValue: ''
        });
    };
    clearTargetSearch = () => {
        this.setState({
            targetSearchValue: ''
        });
    };
    renderPart = part => {
        const { dataSourceGroup, sourceSelectedKeys, targetSelectedKeys } = this.state;
        const { source, target, search: sharedSearch, disabled: sharedDisabled, locale } = this.props;
        const partDataSource = dataSourceGroup[part] || [];
        const partProps = {
            search: sharedSearch,
            disabled: sharedDisabled,
            ...(part === 'source' ? source : target)
        };
        const { footer, title, search, disabled } = partProps;
        const selectedKeys = part === 'source' ? sourceSelectedKeys : targetSelectedKeys;
        const handleSearch = part === 'source' ? this.handleSourceSearch : this.handleTargetSearch;
        const onSelectedChange = part === 'source' ? this.onSourceSelectedChange : this.onTargetSelectedChange;
        const onSearch = part === 'source' ? this.onSourceSearch : this.onTargetSearch;
        return (
            <div className={classnames(partWrapCls, disabled && disabledCls)}>
                {title === null ? null : (
                    <h3 className={titleCls}>
                        {title ? title : { source: locale.sourceTitle, target: locale.targetTitle }[part]}
                    </h3>
                )}
                <div className={partContentCls}>
                    {search && (
                        <div className={searchCls}>
                            <Input.Search
                                block
                                onSearch={onSearch}
                                onChange={onSearch}
                                disabled={disabled}
                                status="default"
                            />
                        </div>
                    )}
                    {this.renderContent({
                        part,
                        dataSource: partDataSource,
                        selectedKeys,
                        onChange: onSelectedChange,
                        handleSearch,
                        disabled
                    })}
                    {footer && <div className={footerCls}>{footer}</div>}
                </div>
            </div>
        );
    };
    renderEmptySourceTip = disabled => {
        const { locale } = this.props;
        return (
            <div className={tipWrapCls}>
                <Notice closable={false} styleType={disabled ? 'disabled' : 'default'} icon={null}>
                    {locale.emptySourceTip}
                </Notice>
            </div>
        );
    };
    renderEmptyTargetTip = disabled => {
        const { locale } = this.props;
        return (
            <div className={tipWrapCls}>
                <Notice closable={false} styleType={disabled ? 'disabled' : 'default'}>
                    {locale.emptyTargetTip}
                </Notice>
            </div>
        );
    };
    renderEmptySearchTip = part => {
        const { locale } = this.props;
        return (
            <div className={tipWrapCls}>
                <Notice closable={false} styleType="warning">
                    <span>{locale.emptySearchTip}</span>
                    <span
                        className={searchClearBtnCls}
                        onClick={part === 'source' ? this.clearSourceSearch : this.clearTargetSearch}
                    >
                        {locale.resetSearch}
                    </span>
                </Notice>
            </div>
        );
    };
    renderContent = ({ part, dataSource, selectedKeys, onChange, handleSearch, disabled }) => {
        if (!dataSource.length) {
            return part === 'source' ? this.renderEmptySourceTip(disabled) : this.renderEmptyTargetTip(disabled);
        }
        const finalDataSource = dataSource.filter(item => handleSearch(item));
        if (!finalDataSource.length) {
            return this.renderEmptySearchTip(part);
        }
        const { renderList } = this.props;
        return (
            <div className={listWrapCls}>
                {renderList({
                    dataSource: finalDataSource,
                    selectedKeys,
                    disabled,
                    onChange
                })}
            </div>
        );
    };

    renderAction = () => {
        const { disabled } = this.props;
        const { sourceSelectedKeys, targetSelectedKeys } = this.state;
        return (
            <div className={actionWrapCls}>
                <div className={actionCls}>
                    <Button
                        styleType="primary"
                        shape="square"
                        disabled={disabled || !sourceSelectedKeys.length}
                        onClick={() => this.transfer('source')}
                    >
                        <SvgIcon type="arrow-right" />
                    </Button>
                </div>
                <div className={actionCls}>
                    <Button
                        styleType="primary"
                        shape="square"
                        disabled={disabled || !targetSelectedKeys.length}
                        onClick={() => this.transfer('target')}
                    >
                        <SvgIcon type="arrow-left" />
                    </Button>
                </div>
            </div>
        );
    };
    groupDataSource = (dataSource = [], selectedKeys = []) => {
        return _.groupBy(dataSource, item => {
            const { key } = item;
            return selectedKeys.find(selectedKey => selectedKey === key) !== undefined ? 'target' : 'source';
        });
    };
    render() {
        /* eslint-disable no-unused-vars */
        const { className, dataSource, source, target, onChange, selectedKeys, search, disabled, ...rest } = this.props;
        /* eslint-enable no-unused-vars */
        return (
            <TransferWrap {...rest} className={classnames(prefixCls, className)}>
                {this.renderPart('source')}
                {this.renderAction()}
                {this.renderPart('target')}
            </TransferWrap>
        );
    }
}

export default Transfer;
