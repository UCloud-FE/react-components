import type { MenuItemType as RcMenuItemType, SubMenuType as RcSubMenuType } from 'rc-menu/lib/interface';
import type { MenuItemProps as RcMenuItemProps } from 'rc-menu';

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

interface TitleEventEntity {
    key: string;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export interface SubMenuProps {
    marginLeft: number;
    className?: string;
    disabled?: boolean;
    level?: number;
    title?: React.ReactNode;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    onTitleClick?: (e: TitleEventEntity) => void;
    onTitleMouseEnter?: (e: TitleEventEntity) => void;
    onTitleMouseLeave?: (e: TitleEventEntity) => void;
    type?: 'normal' | 'small';
    popupClassName?: string;
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

export type ItemType = MenuItemType | SubMenuType | null;
