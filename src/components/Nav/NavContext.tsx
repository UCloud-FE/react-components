import { Dispatch, SetStateAction, createContext } from 'react';

export interface NavContextProps {
    inlineCollapsed: boolean;
    inlineIndent: number;
    mode: 'vertical' | 'inline';
    openKeys?: string[];
    selectedKeys?: string[];
    SetSelectedKeys?: Dispatch<SetStateAction<string[]>>;
}

const NavContext = createContext<NavContextProps>({
    inlineCollapsed: false,
    inlineIndent: 24,
    mode: 'inline',
    openKeys: [],
    selectedKeys: []
});

export default NavContext;
