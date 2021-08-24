import React, { HTMLAttributes, useCallback, useMemo } from 'react';
import classnames from 'classnames';

import Checkbox from 'src/components/Checkbox';
import useLocale from 'src/components/LocaleProvider/useLocale';
import { CollapseProps, useCollapse } from 'src/components/Collapse/hooks';
import CollapseContext from 'src/components/Collapse/CollapseContext';
import { useGroup, Key, groupChildrenAsDataSource } from 'src/hooks/group';
import useUncontrolled from 'src/hooks/useUncontrolled';
import noop from 'src/utils/noop';
import { Override } from 'src/type';

import {
    MenuWrap,
    prefixCls,
    multipleCls,
    singleCls,
    selectallWrapCls,
    checkboxCls,
    blockCls,
    disabledCls
} from './style';
import MenuContext from './MenuContext';
import LOCALE from './locale/zh_CN';

export interface MenuProps {
    /** 选中的菜单项的key，controlled */
    selectedKeys?: Key[];
    /** 默认选中的菜单项的key，uncontrolled */
    defaultSelectedKeys?: Key[];
    /** 选中变化时的回调 */
    onChange?: (keys: Key[]) => void;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 是否可选 */
    selectable?: boolean;
    /** 是否显示全选，多选时有效 */
    showSelectAll?: boolean;
    /** 是否使用块元素显示模式，去除宽高限制，撑满容器，去除外阴影、border，方便放置在自定义容器中 */
    block?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** collapse 的配置，参考 collapse 组件 */
    collapseProps?: CollapseProps;
    /** 自定义样式 */
    customStyle?: {
        /** 菜单的最大高度 */
        maxHeight?: string;
        /** 菜单的最大宽度 */
        maxWidth?: string;
    };
    /** @ignore */
    locale?: typeof LOCALE;
    /**
     * @ignore
     * use for inner usage
     */
    dataSource?: ReturnType<typeof groupChildrenAsDataSource>;
}

const Menu = ({
    selectedKeys: _selectedKeys,
    defaultSelectedKeys = [],
    onChange: _onChange,
    selectable = true,
    multiple = false,
    showSelectAll,
    disabled,
    block,
    locale: _locale,
    className,
    children,
    dataSource,
    collapseProps,
    ...rest
}: MenuProps & Override<HTMLAttributes<HTMLDivElement>, MenuProps>) => {
    let [selectedKeys, onSelectedKeysChange] = useUncontrolled(_selectedKeys, defaultSelectedKeys, _onChange);
    // clean selectedStatus here
    let onChange = useCallback((keys: Key[]) => onSelectedKeysChange(keys), [onSelectedKeysChange]);
    if (!selectable) {
        // when unselectable clean selectedKeys and onChange handle
        selectedKeys = [];
        onChange = noop;
    }
    const locale = useLocale(LOCALE, 'Menu', _locale);
    const [validKeys, disabledKeys, renderChildren, subGroupMap] = useMemo(
        () =>
            dataSource
                ? dataSource
                : groupChildrenAsDataSource(children, disabled, {
                      itemTag: 'isMenuItem',
                      subGroupTag: 'isMenuSubMenu',
                      itemKeyName: 'itemKey',
                      subGroupKeyName: 'subMenuKey'
                  }),
        [children, dataSource, disabled]
    );
    const [collapseContext] = useCollapse(collapseProps || {});

    const [groupContext, selectedStatus, toggleAllItems] = useGroup(
        selectedKeys,
        onChange,
        multiple,
        validKeys,
        disabledKeys,
        subGroupMap
    );
    const selectAllCheckbox = selectable && multiple && showSelectAll && (
        <div className={classnames(selectallWrapCls, disabled && disabledCls)} key="menu-select-all">
            <Checkbox
                className={checkboxCls}
                checked={selectedStatus === 'ALL'}
                indeterminate={selectedStatus === 'PART'}
                onChange={toggleAllItems}
                size="lg"
                disabled={disabled}
            >
                {locale.selectAll}
            </Checkbox>
        </div>
    );

    return (
        <CollapseContext.Provider value={collapseContext}>
            <MenuContext.Provider value={{ ...groupContext, locale }}>
                <MenuWrap
                    className={classnames(className, prefixCls, multiple ? multipleCls : singleCls, block && blockCls)}
                    {...rest}
                >
                    <div>
                        {selectAllCheckbox}
                        {renderChildren}
                    </div>
                </MenuWrap>
            </MenuContext.Provider>
        </CollapseContext.Provider>
    );
};

export default React.memo(Menu);
