import React, { Dispatch, HTMLAttributes, SetStateAction, useMemo } from 'react';
import type { MenuProps as RcMenuProps, } from 'rc-menu';
import classnames from 'classnames';
import RcMenu from 'rc-menu';
import NavContext from './NavContext';

import { Override } from 'src/type';
import { useItems } from './NavItem';
import { NavWarp, prefixClsNavWarp, prefixClsMenu } from './style';
import { ItemType, NavItemProps, SubMenuProps } from './type';
import { SelectEventHandler } from 'rc-menu/lib/interface';

export interface NavProps extends Omit<RcMenuProps, 'items'> {
    /**
     * 菜单类型，垂直或内嵌，默认内嵌
     */
    mode?: 'vertical' | 'inline';

    /**
     * 菜单项
     */
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
     * 选中每一菜单项的回调, function({key:String, item:ReactComponent, domEvent:Event, selectedKeys:String[]})
     */
    onSelect?: SelectEventHandler;
    /**
     * 自定义 SubMenu render，可以获取 items 参数传入的数据
     */
    subMenuItemRender?: (itemProps: SubMenuProps, dom: JSX.Element) => JSX.Element;

    /**
     * 自定义 MenuItem render，可以获取 items 参数传入的数据
     */
    menuItemRender?: (itemProps: NavItemProps, dom: JSX.Element) => JSX.Element;
}

export interface VerticalContextProps {
    openKeys?: string[];
    selectedKeys?: string[];
    setSelectedKeys?: Dispatch<SetStateAction<string[]>>;
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
    const [selectedKeys, setSelectedKeys] = React.useState(rest.defaultSelectedKeys || []);

    const contextValue = React.useMemo(
        () => ({
            inlineCollapsed: inlineCollapsed || false,
            inlineIndent,
            mode: newMode,
            openKeys: rest.defaultOpenKeys,
            selectedKeys: selectedKeys,
            setSelectedKeys: setSelectedKeys,
            subMenuItemRender: subMenuItemRender,
            menuItemRender: menuItemRender
        }),
        [
            inlineCollapsed,
            selectedKeys,
            setSelectedKeys,
            newMode,
            inlineIndent,
            rest.defaultOpenKeys,
            subMenuItemRender,
            menuItemRender
        ]
    );

    return (
        <NavWarp className={classnames(prefixClsNavWarp, className)}>
            <NavContext.Provider value={contextValue}>
                <RcMenu
                    inlineIndent={0}
                    selectedKeys={selectedKeys}
                    onSelect={({key}) => {
                        setSelectedKeys([key]);
                    }}
                    {...rest}
                    mode={'inline'}
                    prefixCls={prefixClsMenu}
                    className={classnames(
                        className,
                        prefixClsMenu,
                        inlineCollapsed ? `${prefixClsMenu}-collapsed` : `${prefixClsMenu}-expand`
                    )}
                >
                    {mergedChildren}
                </RcMenu>
            </NavContext.Provider>
        </NavWarp>
    );
};

export default Nav;
