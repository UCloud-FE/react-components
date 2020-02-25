import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import createReactContext from 'create-react-context';

import Popover from 'src/components/Popover';
import uncontrolledDecorator from 'decorators/uncontrolled';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import { getItemTree, rootPrefix } from 'src/components/Menu/Menu';
import deprecatedLog from 'src/utils/deprecatedLog';

import Option from './Option';
import { SelectWrap, SelectSearchInput, Selector, Arrow, BlockMenu, MenuWrap } from './style';
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
        locale: PropTypes.object
    };
    static defaultProps = {
        onChange: () => {},
        size: 'md',
        onVisibleChange: () => {}
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
    renderPopup = () => {
        const { search, children, onChange, multiple, showSelectAll, value, options } = this.props;
        const { searchValue, itemTree } = this.state;
        const Options = this.renderOptions(options);

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
                    itemTree={itemTree}
                    multiple={multiple}
                    showSelectAll={showSelectAll}
                    selectedKeys={multiple ? value : [value]}
                >
                    {Options || children}
                </BlockMenu>
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
    renderSelector = () => {
        const { renderSelector } = this.props;
        const { visible } = this.state;
        if (renderSelector) {
            return renderSelector(this.renderContent(), visible);
        } else {
            return this.defaultRenderSelector();
        }
    };
    defaultRenderSelector = () => {
        const { visible } = this.state;
        const { size, disabled } = this.props;
        return (
            <Selector styleType="border" size={size} disabled={disabled}>
                <div key="content">{this.renderContent()}</div>
                <Arrow key="icon" type={visible ? 'up' : 'down'} />
            </Selector>
        );
    };
    render() {
        /* eslint-disable no-unused-vars */
        const {
            children,
            options,
            onChange,
            search,
            value,
            multiple,
            showSelectAll,
            defaultValue,
            renderContent,
            renderSelector,
            popover,
            popoverProps,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        const { visible, searchValue } = this.state;
        return (
            <SelectContext.Provider
                value={{
                    searchValue: searchValue,
                    handleSearch: this.handleSearch
                }}
            >
                <SelectWrap {...rest}>
                    <Popover
                        forceRender
                        popup={this.renderPopup()}
                        onVisibleChange={this.handleVisibleChange}
                        placement="bottomLeft"
                        trigger={['click']}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        visible={visible}
                        zIndex={100}
                        {...popover}
                        {...popoverProps}
                    >
                        <div>{this.renderSelector()}</div>
                    </Popover>
                </SelectWrap>
            </SelectContext.Provider>
        );
    }
}
Select.Size = Size;
export default Select;
