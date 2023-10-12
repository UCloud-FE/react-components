import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';
import { NavItemProps, SubMenuProps } from './type';

export interface NavContextProps {
    inlineCollapsed: boolean;
    inlineIndent: number;
    mode: 'vertical' | 'inline';
    openKeys?: string[];
    selectedKeys?: string[];
    SetSelectedKeys?: Dispatch<SetStateAction<string[]>>;
    subMenuItemRender?: (itemProps: SubMenuProps, dom: JSX.Element) => ReactNode;
    menuItemRender?: (itemProps: NavItemProps, dom: JSX.Element) => ReactNode;
}

const NavContext = createContext<NavContextProps>({
    inlineCollapsed: false,
    inlineIndent: 24,
    mode: 'inline',
    openKeys: [],
    selectedKeys: []
});

export default NavContext;
