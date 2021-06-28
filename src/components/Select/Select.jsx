import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import createReactContext from 'create-react-context';

import Popover from 'src/components/Popover';
import uncontrolledDecorator from 'src/decorators/uncontrolled';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import { getItemTree, rootPrefix } from 'src/components/Menu/Menu';
import deprecatedLog from 'src/utils/deprecatedLog';
import ConfigContext from 'src/components/ConfigProvider/ConfigContext';

import Option from './Option';
import Extra from './Extra';
import {
    SelectWrap,
    SelectSearchInput,
    Selector,
    Arrow,
    BlockMenu,
    MenuWrap,
    EmptyContentWrapper,
    selectorContentCls
} from './style';
import LOCALE from './locale/zh_CN';

export const deprecatedLogForPopover = _.once(() => deprecatedLog('Select popover', 'popoverProps'));

const Size = ['sm', 'md', 'lg'];

export const SelectContext = createReactContext();

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Select' })
@uncontrolledDecorator({})
class Select extends Component {
    constructor(props) {
        super(props);

        const { children, options } = this.props;
        let itemTree;
        if (_.isEmpty(options)) {
            itemTree = getItemTree(children);
        } else {
            itemTree = getItemTree(this.renderOptions(options));
        }
        this.state = {
            searchValue: '',
            itemTree
        };
        if ('popover' in props) {
            deprecatedLogForPopover();
        }
    }
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** 当前值，controlled */
        value: PropTypes.any,
        /** 默认值，uncontrolled */
        defaultValue: PropTypes.any,
        /** 无选项时显示内容 */
        placeholder: PropTypes.node,
        /** 修改时的回调 */
        onChange: PropTypes.func,
        /** 快速设置选项 */
        options: PropTypes.array,
        /** 在尾部增加附加内容，会脱离选项流容器，超高度时不会一起滚动，如需在选项中嵌入附加内容，可使用 Select.Extra */
        extra: PropTypes.oneOfType([
            PropTypes.shape({
                content: PropTypes.node.isRequired
            }),
            PropTypes.node
        ]),
        /** @ignore */
        className: PropTypes.string,
        /** 是否多选 */
        multiple: PropTypes.bool,
        /** 是否显示全选 */
        showSelectAll: PropTypes.bool,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /**
         * 如何渲染选中项的展示
         * @param {any} value - 当前 select 的值
         */
        renderContent: PropTypes.func,
        /**
         * 自定义渲染选择器
         * @param {node} content - 渲染的内容
         * @param {bool} visible - 当前的select下拉是否展示
         */
        renderSelector: PropTypes.func,
        /**
         * 自定义渲染弹出内容
         * @param {Object} options - 配置
         * @param {function} options.handleVisible - 处理弹出层的显示隐藏
         * @param {function} options.onChange -  value 变化回调
         * @param {any} options.value - select 的当前值
         */
        renderPopup: PropTypes.func,
        /**
         * - 是否展示搜索框，可以为true或者Object
         * - 为Object时可传入handleSearch对搜索筛选进行自定义
         * @argument searchValue - 搜索的值
         * @argument value - option的值
         * @argument item - option的引用
         */
        search: PropTypes.oneOfType([
            PropTypes.oneOf([true]),
            PropTypes.shape({
                handleSearch: PropTypes.func
            })
        ]),
        /** 尺寸 */
        size: PropTypes.oneOf(Size),
        /**
         * 弹出层的popover props
         * @deprecated 请使用popoverProps替换
         */
        popover: PropTypes.object,
        /** 弹出层的popover props */
        popoverProps: PropTypes.object,
        /** @ignore */
        onVisibleChange: PropTypes.func,
        /** @ignore */
        locale: PropTypes.object,
        /**
         * 自定义样式
         */
        customStyle: PropTypes.shape({
            /** 列表最大高度 */
            optionListMaxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            /**  */
            popupMaxWidth: PropTypes.string
        }),
        /**
         * 可选性为空时展示内容
         */
        emptyContent: PropTypes.node
    };
    static defaultProps = {
        onChange: () => {},
        size: 'md',
        onVisibleChange: () => {},
        customStyle: {}
    };
    componentWillReceiveProps(nextProps) {
        const { children, options } = nextProps;
        if (children === this.props.children && options === this.props.options) return;
        let itemTree;
        if (_.isEmpty(options)) {
            itemTree = getItemTree(children);
        } else {
            itemTree = getItemTree(this.renderOptions(options));
        }
        this.setState({
            itemTree
        });
    }

    handleSearch = (value, item) => {
        const { search } = this.props;
        const { searchValue } = this.state;
        if (!search || !searchValue) {
            return true;
        }
        if (search.handleSearch) {
            return search.handleSearch(searchValue, value, item);
        } else {
            const { children } = item.props;
            return (
                (value + '').indexOf(searchValue) >= 0 ||
                (children && _.isString(children) && children.indexOf(searchValue) >= 0)
            );
        }
    };
    handleVisibleChange = open => {
        this.setState({
            visible: open
        });
        const { onVisibleChange } = this.props;
        onVisibleChange(open);
    };
    hidePopup = () => {
        this.handleVisibleChange(false);
    };
    renderContent = () => {
        const { state, props } = this;
        const { renderContent, multiple, value } = props;
        const { itemTree } = state;
        let valueChild;
        const rootItemTree = itemTree[rootPrefix];
        const getValueChild = v => {
            const itemKey = _.findKey(rootItemTree, item => item.props.value === v);
            if (itemKey) {
                return rootItemTree[itemKey].props.children;
            } else {
                return v;
            }
        };

        if (!multiple) {
            valueChild = getValueChild(value);
        } else {
            valueChild = _.map(value, getValueChild);
        }

        if (renderContent) {
            return renderContent(value, valueChild);
        } else {
            return this.defaultRenderContent(value, valueChild);
        }
    };
    defaultRenderContent = (value, valueChild) => {
        const { multiple, locale, placeholder = locale.placeholder } = this.props;
        if (!multiple) {
            if (value === undefined) {
                return placeholder;
            } else {
                return valueChild;
            }
        } else {
            if (value && value.length) {
                return `${locale.selected}${value.length}${locale.items}`;
            } else {
                return placeholder;
            }
        }
    };
    renderEmptyContent = () => {
        const { emptyContent, locale } = this.props;
        return emptyContent || <EmptyContentWrapper>{locale.emptyTip}</EmptyContentWrapper>;
    };
    renderPopup = () => {
        const {
            search,
            children,
            onChange,
            multiple,
            showSelectAll,
            value,
            options,
            extra,
            customStyle,
            renderPopup
        } = this.props;
        const { searchValue, itemTree } = this.state;
        const Options = this.renderOptions(options);
        const Extra = this.renderExtra(extra);

        if (renderPopup) {
            return renderPopup({
                handleVisible: this.handleVisibleChange,
                onChange: v => onChange(v),
                value,
                multiple,
                extra,
                search,
                children
            });
        }
        const maxWidth = customStyle.popupMaxWidth ? customStyle.popupMaxWidth : 'none';
        return (
            <MenuWrap>
                {search && (
                    <SelectSearchInput
                        onChange={e =>
                            this.setState({
                                searchValue: e.target.value
                            })
                        }
                        value={searchValue}
                    />
                )}
                <BlockMenu
                    onChange={value => {
                        if (!multiple) {
                            this.handleVisibleChange(false);
                            onChange(value[0]);
                        } else {
                            onChange(value);
                        }
                    }}
                    customStyle={customStyle}
                    menuCustomStyle={{ maxWidth }}
                    itemTree={itemTree}
                    multiple={multiple}
                    showSelectAll={showSelectAll}
                    selectedKeys={multiple ? value : [value]}
                >
                    {Options || children || this.renderEmptyContent()}
                </BlockMenu>
                {Extra}
            </MenuWrap>
        );
    };
    renderOptions = options => {
        if (!_.isEmpty(options)) {
            return options.map(option => {
                const { label, value, ...restOptionProps } = option;
                return (
                    <Option key={value} value={value} {...restOptionProps}>
                        {label !== undefined ? label : value}
                    </Option>
                );
            });
        } else {
            return null;
        }
    };
    renderExtra = extra => {
        if (!_.isEmpty(extra)) {
            if (React.isValidElement(extra)) {
                return <Extra>{extra}</Extra>;
            } else {
                const { content, ...rest } = extra;
                return <Extra {...rest}>{content}</Extra>;
            }
        }
    };
    renderSelector = () => {
        const { renderSelector } = this.props;
        const { visible } = this.state;
        const content = this.renderContent();
        if (renderSelector) {
            return <div>{renderSelector(content, visible)}</div>;
        } else {
            return this.defaultRenderSelector(content);
        }
    };
    defaultRenderSelector = content => {
        const { visible } = this.state;
        const { size, disabled } = this.props;
        const title = typeof content === 'string' ? content : null;
        return (
            <Selector styleType="border" size={size} disabled={disabled} title={title}>
                <div className={selectorContentCls} key="content">
                    {content}
                </div>
                <Arrow key="icon" type={visible ? 'arrow-up' : 'arrow-down'} />
            </Selector>
        );
    };
    render() {
        /* eslint-disable no-unused-vars */
        const {
            children,
            options,
            extra,
            onChange,
            search,
            value,
            multiple,
            showSelectAll,
            defaultValue,
            renderContent,
            renderSelector,
            renderPopup,
            popover,
            popoverProps,
            customStyle,
            emptyContent,
            onVisibleChange,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        const { visible, searchValue } = this.state;
        return (
            <ConfigContext.Consumer>
                {({ forwardPopupContainer } = {}) => {
                    return (
                        <SelectContext.Provider
                            value={{
                                searchValue: searchValue,
                                handleSearch: this.handleSearch,
                                hidePopup: this.hidePopup
                            }}
                        >
                            <SelectWrap {...rest}>
                                <Popover
                                    forceRender
                                    popup={this.renderPopup()}
                                    onVisibleChange={this.handleVisibleChange}
                                    placement="bottomLeft"
                                    trigger={['click']}
                                    {...(forwardPopupContainer
                                        ? { forwardPopupContainer: triggerNode => triggerNode.parentNode }
                                        : { getPopupContainer: triggerNode => triggerNode.parentNode })}
                                    visible={visible}
                                    zIndex={100}
                                    {...popover}
                                    {...popoverProps}
                                >
                                    {this.renderSelector()}
                                </Popover>
                            </SelectWrap>
                        </SelectContext.Provider>
                    );
                }}
            </ConfigContext.Consumer>
        );
    }
}
Select.Size = Size;
export default Select;
