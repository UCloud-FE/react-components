import React, { Dispatch, HTMLAttributes, ReactNode, SetStateAction, useMemo } from 'react';
import type { MenuProps as RcMenuProps } from 'rc-menu';
import classnames from 'classnames';
import RcMenu from 'rc-menu';
import NavContext from './NavContext';

import { Override } from 'src/type';
import { useItems } from './NavItem';
import { NavWarp, prefixClsNavWarp, prefixClsMenu } from './style';
import { ItemType, NavItemProps, SubMenuProps } from './type';

export interface NavProps extends Omit<RcMenuProps, 'items'> {
    /**
     * 菜单类型，垂直或内嵌，默认内嵌
     */
    mode?: 'vertical' | 'inline';

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
    /**
     * 自定义 SubMenu render，可以获取 items 参数传入的数据
     */
    subMenuItemRender?: (itemProps: SubMenuProps, dom: JSX.Element) => ReactNode;

    /**
     * 自定义 MenuItem render，可以获取 items 参数传入的数据
     */
    menuItemRender?: (itemProps: NavItemProps, dom: JSX.Element) => ReactNode;
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
    items,
    inlineCollapsed,
    mode = 'inline',
    inlineIndent = 32,
    subMenuItemRender,
    menuItemRender,
    ...rest
}: NavProps & Override<HTMLAttributes<HTMLDivElement>, NavProps>) => {
    const newMode = useMemo(() => (inlineCollapsed ? 'vertical' : mode), [inlineCollapsed, mode]);
    const mergedChildren = useItems(items, inlineIndent, inlineCollapsed, mode);
    const [selectedKeys, SetSelectedKeys] = React.useState(rest.defaultSelectedKeys || []);

    const contextValue = React.useMemo(
        () => ({
            inlineCollapsed: inlineCollapsed || false,
            inlineIndent,
            mode: newMode,
            openKeys: rest.defaultOpenKeys,
            selectedKeys: selectedKeys,
            SetSelectedKeys: SetSelectedKeys,
            subMenuItemRender: subMenuItemRender,
            menuItemRender: menuItemRender
        }),
        [
            inlineCollapsed,
            selectedKeys,
            SetSelectedKeys,
            newMode,
            inlineIndent,
            rest.defaultOpenKeys,
            subMenuItemRender,
            menuItemRender
        ]
    );

    // 有垂直菜单的时候，selectedKeys手动处理
    const verticalProps = useMemo(
        () =>
            newMode === 'vertical'
                ? {
                      selectedKeys,
                      onSelect: ({ key }: { key: string }) => {
                          SetSelectedKeys([key]);
                      }
                  }
                : {},
        [newMode, selectedKeys]
    );

    return (
        <NavWarp className={classnames(prefixClsNavWarp, className)}>
            <NavContext.Provider value={contextValue}>
                <RcMenu
                    inlineIndent={0}
                    {...rest}
                    mode={'inline'}
                    prefixCls={prefixClsMenu}
                    className={classnames(
                        className,
                        prefixClsMenu,
                        inlineCollapsed ? `${prefixClsMenu}-collapsed` : `${prefixClsMenu}-expand`
                    )}
                    {...verticalProps}
                >
                    {mergedChildren}
                </RcMenu>
            </NavContext.Provider>
        </NavWarp>
    );
};

export default Nav;
