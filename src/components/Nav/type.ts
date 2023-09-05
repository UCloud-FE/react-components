import type { MenuItemType as RcMenuItemType, SubMenuType as RcSubMenuType } from 'rc-menu/lib/interface';

export interface MenuItemType extends RcMenuItemType {
    icon?: React.ReactNode;
    title?: string;
    labelType?: 'normal' | 'small';
}
export interface SubMenuType extends Omit<RcSubMenuType, 'children'> {
    icon?: React.ReactNode;
    children: ItemType[];
    labelType?: 'normal' | 'small';
}

export type ItemType = MenuItemType | SubMenuType | null;
