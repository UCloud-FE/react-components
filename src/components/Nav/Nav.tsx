import React, { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';
import type { MenuProps as RcMenuProps } from 'rc-menu';
import classnames from 'classnames';
import RcMenu from 'rc-menu';
import NavContext from './NavContext';

import { Override } from 'src/type';
import { useItems } from './NavItem';
import { NavWarp, prefixClsNavWarp, prefixClsSwitch, SwtichAppWarp, prefixClsMenu, prefixClsMenuOuter } from './style';
import { ItemType } from './type';

export interface NavProps extends Omit<RcMenuProps, 'items'> {
    /**
     * 菜单类型，垂直或内嵌，默认内嵌
     */
    mode?: 'vertical' | 'inline';

    /**
     * 顶部展示元素
     */
    TopExtraItem?: ReactNode;
    items?: ItemType[];
    /**
     * inline 时菜单是否收起状态
     */
    inlineCollapsed?: boolean;
    /**
     * 每一级缩进量
     */
    inlineIndent?: number;
    /**
     * 初始展开的 SubMenu 菜单项 key 数组
     */
    defaultOpenKeys?: string[];
    /**
     * 初始选中的菜单项 key 数组
     */
    defaultSelectedKeys?: string[];
    /**
     * SubMenu 展开/关闭的回调
     */
    onOpenChange?: (openKeys: string[]) => void;
}

export interface VerticalContextProps {
    openKeys?: string[];
    selectedKeys?: string[];
    SetSelectedKeys?: Dispatch<SetStateAction<string[]>>;
}
export const VerticalContext = React.createContext<VerticalContextProps>({
    openKeys: [],
    selectedKeys: []
});

const Nav = ({
    className,
    TopExtraItem,
    items,
    inlineCollapsed,
    mode = 'inline',
    inlineIndent = 32,
    ...rest
}: NavProps & Override<HTMLAttributes<HTMLDivElement>, NavProps>) => {
    const newMode = inlineCollapsed ? 'vertical' : mode;
    const mergedChildren = useItems(items, inlineIndent, inlineCollapsed, mode);
    const [selectedKeys, SetSelectedKeys] = React.useState(rest.defaultSelectedKeys || []);

    const contextValue = React.useMemo(
        () => ({
            inlineCollapsed: inlineCollapsed || false,
            inlineIndent,
            mode: newMode,
            openKeys: rest.defaultOpenKeys,
            selectedKeys: selectedKeys,
            SetSelectedKeys: SetSelectedKeys
        }),
        [inlineCollapsed, selectedKeys, SetSelectedKeys, newMode, inlineIndent, rest.defaultOpenKeys]
    );

    // 有垂直菜单的时候，selectedKeys手动处理
    const verticalProps =
        newMode === 'vertical'
            ? {
                  selectedKeys,
                  onSelect: ({ key }: { key: string }) => {
                      SetSelectedKeys([key]);
                  }
              }
            : {};

    return (
        <NavWarp className={classnames(prefixClsNavWarp, className)}>
            {TopExtraItem && (
                <SwtichAppWarp className={classnames(prefixClsSwitch, className)}>{TopExtraItem}</SwtichAppWarp>
            )}
            <NavContext.Provider value={contextValue}>
                <div className={classnames(prefixClsMenuOuter)}>
                    <RcMenu
                        inlineIndent={0}
                        {...rest}
                        mode={'inline'}
                        prefixCls={prefixClsMenu}
                        className={classnames(className, prefixClsMenu)}
                        {...verticalProps}
                    >
                        {mergedChildren}
                    </RcMenu>
                </div>
            </NavContext.Provider>
        </NavWarp>
    );
};

export default Nav;
