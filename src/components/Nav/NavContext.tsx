import { Dispatch, SetStateAction, createContext } from 'react';
import { NavItemProps, SubMenuProps } from './type';

export interface NavContextProps {
    inlineCollapsed: boolean;
    inlineIndent: number;
    mode: 'vertical' | 'inline';
    openKeys?: string[];
    selectedKeys?: string[];
    setSelectedKeys?: Dispatch<SetStateAction<string[]>>;
    subMenuItemRender?: (itemProps: SubMenuProps, dom: JSX.Element) => JSX.Element;
    menuItemRender?: (itemProps: NavItemProps, dom: JSX.Element) => JSX.Element;
}

const NavContext = createContext<NavContextProps>({
    inlineCollapsed: false,
    inlineIndent: 24,
    mode: 'inline',
    openKeys: [],
    selectedKeys: []
});

export default NavContext;
