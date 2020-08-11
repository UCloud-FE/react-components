import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import uncontrolledDecorator from 'src/decorators/uncontrolled';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import deprecatedLog from 'src/utils/deprecatedLog';
import Checkbox from 'src/components/Checkbox';

import {
    MenuWrap,
    prefixCls,
    multipleCls,
    singleCls,
    selectallWrapCls,
    firstCls,
    lastCls,
    checkboxCls,
    blockCls,
    disabledCls
} from './style';
import LOCALE from './locale/zh_CN';

const deprecatedLogForTheme = _.once(() => deprecatedLog('Menu theme', 'ThemeProvider'));
const deprecatedLogForThemeType = _.once(() => deprecatedLog('Menu themeType', 'ThemeProvider'));

export const rootPrefix = 'root';

export const getItemTree = children => {
    const getTree = (children, prefix) => {
        const items = {};
        const groupTree = {};
        React.Children.forEach(children, (child, i) => {
            if (!React.isValidElement(child)) {
                return;
            }
            const childType = child.type;
            const isMenuItem = childType.isMenuItem;
            const isOtherMenuComponent = childType.isMenuSubMenu || childType.isMenuGroup;

            if (isMenuItem) {
                const uid = `${prefix}-${i}-item`;
                items[uid] = child;
            } else if (isOtherMenuComponent) {
                const uid = `${prefix}-${i}-group`;
                const childGroupTree = getTree(child.props.children, uid);

                _.assign(groupTree, childGroupTree);
                _.assign(items, childGroupTree[uid]);
            }
        });
        groupTree[prefix] = items;
        return groupTree;
    };

    return getTree(children, rootPrefix);
};

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Menu' })
@uncontrolledDecorator({
    valueName: 'selectedKeys'
})
class Menu extends Component {
    static propTypes = {
        /** 选中的菜单项的key，controlled */
        selectedKeys: PropTypes.array,
        /** 默认选中的菜单项的key，uncontrolled */
        defaultSelectedKeys: PropTypes.array,
        /** 选中变化时的回调 */
        onChange: PropTypes.func,
        /** 是否支持多选 */
        multiple: PropTypes.bool,
        /** 是否可选 */
        selectable: PropTypes.bool,
        /** collapse的配置，参考collpase组件 */
        collapse: PropTypes.object,
        /** 是否显示全选，多选时有效 */
        showSelectAll: PropTypes.bool,
        /** 是否使用块元素显示模式，去除宽高限制，撑满容器，去除外阴影、border，方便放置在自定义容器中 */
        block: PropTypes.bool,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 自定义样式 */
        customStyle: PropTypes.shape({
            /** 菜单的最大高度 */
            maxHeight: PropTypes.string
        }),
        /** @ignore */
        theme: PropTypes.any,
        /** @ignore */
        themeType: PropTypes.any,
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        itemTree: PropTypes.any,
        /** @ignore */
        locale: PropTypes.object,
        /** @ignore */
        className: PropTypes.string
    };
    static defaultProps = {
        defaultSelectedKeys: [],
        onChange: () => {},
        selectable: true
    };
    constructor(props) {
        super(props);
        const { children } = props;
        if ('itemTree' in props) {
            this.itemTree = props.itemTree;
        } else {
            this.itemTree = getItemTree(children);
        }
        if ('theme' in props) {
            deprecatedLogForTheme();
        }
        if ('themeType' in props) {
            deprecatedLogForThemeType();
        }
    }
    componentWillReceiveProps(nextProps) {
        const { children } = nextProps;
        if ('itemTree' in nextProps) {
            return (this.itemTree = nextProps.itemTree);
        }
        if (children === this.props.children) return;
        this.itemTree = getItemTree(children);
    }

    getAllSelectedStatus = groupUid => {
        const { selectedKeys } = this.props;
        if (!selectedKeys || !selectedKeys.length) {
            return 'NONE';
        }

        const items = this.itemTree[groupUid];
        const itemKeys = _.map(
            _.filter(items, item => !item.props.disabled),
            item => item.type.getItemKey(item)
        );
        const selectedItemKeys = _.filter(
            itemKeys,
            key => _.findIndex(selectedKeys, selectedKey => selectedKey === key) >= 0
        );

        if (!selectedItemKeys.length) {
            return 'NONE';
        } else if (selectedItemKeys.length < itemKeys.length) {
            return 'PART';
        } else {
            return 'ALL';
        }
    };
    getItemSelected = itemUid => {
        const { selectedKeys } = this.props;
        const itemKey = this.getItemKey(itemUid);
        return _.findIndex(selectedKeys, key => key === itemKey) >= 0;
    };
    getItemKey = itemUid => {
        const item = this.itemTree[rootPrefix][itemUid];
        return item.type.getItemKey(item);
    };

    _selectItem = (selectedKeys = [], selected, uid) => {
        const { multiple } = this.props;
        const itemKey = this.getItemKey(uid);
        const isSelected = this.getItemSelected(uid);
        if (multiple) {
            if (isSelected && !selected) {
                return selectedKeys.filter(key => key !== itemKey);
            } else if (!isSelected && selected) {
                return selectedKeys.concat(itemKey);
            } else {
                return selectedKeys;
            }
        } else {
            return [itemKey];
        }
    };

    onSelect = (selected, uid) => {
        const { onChange, selectedKeys, selectable } = this.props;
        if (!selectable) {
            return;
        }

        onChange(this._selectItem(selectedKeys, selected, uid));
    };
    onMultipleSelect = (selected, groupUid) => {
        const { onChange, selectedKeys: _selectedKeys, selectable } = this.props;
        if (!selectable) {
            return;
        }

        const items = this.itemTree[groupUid];

        let selectedKeys = _selectedKeys;
        _.each(items, (item, uid) => {
            if (!item.props.disabled) {
                selectedKeys = this._selectItem(selectedKeys, selected, uid);
            }
        });

        onChange(selectedKeys);
    };

    renderChildren = (children, prefix) => {
        const { multiple, disabled: globalDisabled } = this.props;
        const renderChildren = children => {
            const l = React.Children.count(children) - 1;
            return React.Children.map(children, (child, i) => {
                if (!React.isValidElement(child)) {
                    return child;
                }

                const childType = child.type;
                const isMenuItem = childType.isMenuItem;
                const isOtherMenuComponent = childType.isMenuSubMenu || childType.isMenuGroup;
                const isFirst = i === 0;
                const isLast = i === l;
                const className = classnames(child.props.className, isFirst && firstCls, isLast && lastCls);
                const disabled = globalDisabled || child.props.disabled;
                if (isMenuItem) {
                    const uid = `${prefix}-${i}-item`;
                    return React.cloneElement(child, {
                        uid,
                        multiple,
                        disabled,
                        selected: this.getItemSelected(uid),
                        onSelect: this.onSelect,
                        className
                    });
                } else if (isOtherMenuComponent) {
                    const uid = `${prefix}-${i}-group`;
                    return React.cloneElement(child, {
                        uid,
                        multiple,
                        disabled,
                        allSelectedStatus: this.getAllSelectedStatus(uid),
                        onMultipleSelect: this.onMultipleSelect,
                        renderChildren: children => this.renderChildren(children, uid),
                        className
                    });
                }

                return child;
            });
        };

        return renderChildren(children);
    };

    render() {
        /* eslint-disable no-unused-vars */
        let {
            selectedKeys,
            defaultSelectedKeys,
            onChange,
            multiple,
            selectable,
            showSelectAll,
            collapse,
            children,
            theme,
            themeType,
            itemTree,
            locale,
            className,
            block,
            disabled,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        const allSelectedStatus = this.getAllSelectedStatus(rootPrefix);
        const selectAllCheckbox = multiple && showSelectAll && (
            <div className={classnames(selectallWrapCls, disabled && disabledCls)}>
                <Checkbox
                    className={checkboxCls}
                    checked={allSelectedStatus === 'ALL'}
                    indeterminate={allSelectedStatus === 'PART'}
                    onChange={checked => this.onMultipleSelect(checked, rootPrefix)}
                    size="lg"
                    disabled={disabled}
                >
                    {locale.selectAll}
                </Checkbox>
            </div>
        );
        return (
            <MenuWrap
                className={classnames(className, prefixCls, multiple ? multipleCls : singleCls, block && blockCls)}
                {...rest}
                {...collapse}
            >
                <div>
                    {selectAllCheckbox}
                    {this.renderChildren(children, rootPrefix)}
                </div>
            </MenuWrap>
        );
    }
}

export default Menu;
