import type { MenuItemType as RcMenuItemType, SubMenuType as RcSubMenuType } from 'rc-menu/lib/interface';
import type { MenuItemProps as RcMenuItemProps } from 'rc-menu';

export interface MenuItemType extends RcMenuItemType {
    icon?: React.ReactNode;
    title?: string;
    labelType?: 'normal' | 'small';
    children?: null;
}
export interface SubMenuType extends Omit<RcSubMenuType, 'children'> {
    icon?: React.ReactNode;
    children: ItemType[];
    labelType?: 'normal' | 'small';
}

export interface SubMenuProps {
    marginLeft: number;
    title?: React.ReactNode;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    type?: 'normal' | 'small';
    children?: React.ReactNode;
}

export interface NavItemProps extends Omit<RcMenuItemProps, 'title'> {
    marginLeft: number;
    icon?: React.ReactNode;
    danger?: boolean;
    title?: React.ReactNode;
    type?: 'normal' | 'small';
    /**
     * 垂直展开模式
     */
    verticalChildren?: ItemType[];
}

export type ItemType = MenuItemType | SubMenuType;
