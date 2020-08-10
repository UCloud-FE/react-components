import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import Menu from 'src/components/Menu';
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
     * 是否显示搜索栏
     */
    search: PropTypes.bool,
    /**
     * 禁用
     */
    disabled: PropTypes.bool
};

const defaultSearchHandle = (searchValue, value, item) => {
    return (
        (value + '').indexOf(searchValue) >= 0 ||
        (item.label && _.isString(item.label) && item.label.indexOf(searchValue) >= 0)
    );
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
         * 搜素配置
         */
        search: PropTypes.bool,
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
        return defaultSearchHandle(searchValue, item.value, item);
    };
    handleSourceSearch = item => {
        return this.handleSearch('source', item);
    };
    handleTargetSearch = item => {
        return this.handleSearch('target', item);
    };
    onSearch = (part, v) => {
        this.setState({
            [part === 'source' ? 'sourceSearchValue' : 'targetSearchValue']: v
        });
    };
    onSourceSearch = v => {
        this.onSearch('source', v);
    };
    onTargetSearch = v => {
        this.onSearch('target', v);
    };
    clearSourceSearch = () => {
        this.onSourceSearch('');
    };
    clearTargetSearch = () => {
        this.onTargetSearch('');
    };
    renderPart = part => {
        const { dataSourceGroup, sourceSelectedKeys, targetSelectedKeys } = this.state;
        const { source, target, search: sharedSearch, disabled: sharedDisabled } = this.props;
        const partDataSource = dataSourceGroup[part] || [];
        const partProps = {
            search: sharedSearch,
            disabled: sharedDisabled,
            ...(part === 'source' ? source : target)
        };
        const { footer, title, search, disabled } = partProps;
        const selectedKeys = part === 'source' ? sourceSelectedKeys : targetSelectedKeys;
        const handleSearch = part === 'source' ? this.handleSourceSearch : this.handleTargetSearch;
        const searchValue = part === 'source' ? this.sourceSearchValue : this.targetSearchValue;
        const onSelectedChange = part === 'source' ? this.onSourceSelectedChange : this.onTargetSelectedChange;
        const onSearch = part === 'source' ? this.onSourceSearch : this.onTargetSearch;
        return (
            <div className={classnames(partWrapCls, disabled && disabledCls)}>
                {title === null ? null : (
                    <h3 className={titleCls}>{title ? title : { source: '可选', target: '已选' }[part]}</h3>
                )}
                <div className={partContentCls}>
                    {search && (
                        <div className={searchCls}>
                            <Input.Search block onSearch={onSearch} disabled={disabled} />
                        </div>
                    )}
                    {this.renderContent({
                        part,
                        dataSource: partDataSource,
                        selectedKeys,
                        onChange: onSelectedChange,
                        handleSearch,
                        searchValue,
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
    renderContent = ({ part, dataSource, selectedKeys, onChange, handleSearch, searchValue, disabled }) => {
        if (!dataSource.length) {
            return part === 'source' ? this.renderEmptySourceTip(disabled) : this.renderEmptyTargetTip(disabled);
        }
        const finalDataSource = dataSource.filter(item => handleSearch(item, searchValue));
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
                        <SvgIcon type="rightArrow" />
                    </Button>
                </div>
                <div className={actionCls}>
                    <Button
                        styleType="primary"
                        shape="square"
                        disabled={disabled || !targetSelectedKeys.length}
                        onClick={() => this.transfer('target')}
                    >
                        <SvgIcon type="leftArrow" />
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
