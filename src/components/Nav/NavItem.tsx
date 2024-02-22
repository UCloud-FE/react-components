import React from 'react';
import classnames from 'classnames';
import { Item } from 'rc-menu';
import { intersection } from 'lodash';

import Popover from 'src/components/Popover';
import Menu from 'src/components/Menu';

import { prefixClsMenuItem, prefixClsTitleContent, prefixClsTitleText, NavPopWrap } from './style';
import type { NavContextProps } from './NavContext';
import { ItemType, NavItemProps, SubMenuProps } from './type';
import SubMenu from './SubMenu';
import NavContext from './NavContext';
import { getTreeAllKeys } from './util';
import Tooltip from '../Tooltip';

export default class NavItem extends React.Component<NavItemProps> {
    renderItemChildren() {
        const { children } = this.props;
        const wrapNode = <span className={prefixClsTitleText}>{children}</span>;

        return wrapNode;
    }

    renderIcon = (icon: React.ReactElement) => {
        return React.cloneElement(icon, {
            className: classnames(icon.props?.className, `${prefixClsMenuItem}-icon`)
        });
    };

    renderItem = (contextProps: NavContextProps) => {
        const { className, type } = this.props;
        const { title, icon, verticalChildren, marginLeft, ...rest } = this.props;
        const { inlineCollapsed, menuItemRender } = contextProps;

        if (verticalChildren?.length) {
            return this.renderVerticalItem(contextProps);
        }

        const dom = (
            <>
                {React.isValidElement(icon) && this.renderIcon(icon)}
                {this.renderItemChildren()}
            </>
        );

        const renderContent = () =>
            menuItemRender ? (
                React.cloneElement(menuItemRender(this.props, dom), {
                    className: classnames(prefixClsTitleContent)
                })
            ) : (
                <div className={prefixClsTitleContent}>{dom}</div>
            );

        const returnNode = (
            <Item
                {...rest}
                className={classnames(
                    type && `${prefixClsMenuItem}-${type}`,
                    prefixClsMenuItem,
                    className,
                    inlineCollapsed && `${prefixClsMenuItem}-collapsed`
                )}
                title={typeof title === 'string' ? title : undefined}
            >
                {/* 如果是折叠目录，没有子菜单的展示tooltip */}
                {inlineCollapsed ? (
                    <Tooltip
                        popup={<span className={`${prefixClsMenuItem}-tooltop-text`}>{title}</span>}
                        arrow={false}
                        placement="right"
                    >
                        {renderContent()}
                    </Tooltip>
                ) : (
                    renderContent()
                )}
            </Item>
        );

        return returnNode;
    };

    renderPopverMenu = (
        items: (ItemType | ItemType[])[],
        subMenuItemRender?: (itemProps: SubMenuProps, dom: JSX.Element) => React.ReactNode,
        menuItemRender?: (itemProps: NavItemProps, dom: JSX.Element) => React.ReactNode
    ) => {
        return items.map(i => {
            const { children, label, key } = i as ItemType;
            if (children) {
                return (
                    <Menu.SubMenu
                        title={subMenuItemRender ? subMenuItemRender({ ...i, marginLeft: 0 }, <>{label}</>) : label}
                        key={key}
                        styleType="popover"
                    >
                        {this.renderPopverMenu(children, subMenuItemRender, menuItemRender)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item key={key}>
                    {menuItemRender ? menuItemRender({ ...i, marginLeft: 0 }, <>{label}</>) : label}
                </Menu.Item>
            );
        });
    };

    // 垂直菜单项
    renderVerticalItem = ({
        inlineCollapsed,
        selectedKeys,
        subMenuItemRender,
        menuItemRender
    }: Partial<NavContextProps>) => {
        const { className, type, children } = this.props;
        const { title, icon, verticalChildren, marginLeft, ...rest } = this.props;

        const subKeys = getTreeAllKeys([], verticalChildren || []).map(item => item.toString());
        const intersectKeys = intersection(subKeys, selectedKeys);

        const dom = (
            <>
                {React.isValidElement(icon) ? (
                    this.renderIcon(icon)
                ) : (
                    <span className={`${prefixClsMenuItem}-icon`}>{title?.charAt(0)}</span>
                )}
                {this.renderItemChildren()}
            </>
        );

        const getItem = (itemRender?: (itemProps: NavItemProps | SubMenuProps, dom: JSX.Element) => JSX.Element) =>
            itemRender ? (
                React.cloneElement(itemRender(this.props, dom), {
                    className: classnames(prefixClsTitleContent)
                })
            ) : (
                <div className={prefixClsTitleContent}>{dom}</div>
            );

        return (
            <Popover
                trigger={['hover']}
                placement="rightTop"
                popup={<PopMenu renderPopverMenu={this.renderPopverMenu} verticalChildren={verticalChildren} />}
            >
                <Item
                    {...rest}
                    className={classnames(
                        type && `${prefixClsMenuItem}-${type}`,
                        prefixClsMenuItem,
                        className,
                        inlineCollapsed && `${prefixClsMenuItem}-collapsed`,
                        intersectKeys.length && `${prefixClsMenuItem}-pop-has-selected`
                    )}
                    title={typeof title === 'string' ? title : undefined}
                >
                    {children ? getItem(subMenuItemRender) : getItem(menuItemRender)}
                </Item>
            </Popover>
        );
    };

    render() {
        return (
            <div style={{ marginLeft: this.props.marginLeft }}>
                <NavContext.Consumer>{this.renderItem}</NavContext.Consumer>
            </div>
        );
    }
}

export function useItems(items?: ItemType[], inlineIndent = 0, inlineCollapsed = false, mode?: 'inline' | 'vertical') {
    return React.useMemo(() => {
        if (!items) {
            return items;
        }
        return convertItemsToNodes(items, 0, inlineIndent, inlineCollapsed, mode);
    }, [items]);
}

/**
 *
 * @param list
 * @param padding 当前item的padding-left
 * @param inlineIndent 每一级padding递增值
 * @param level 当前等级
 * @param menuLevel 需要将子项目变为右侧Menu垂直展开的等级
 * @returns
 */
function convertItemsToNodes(
    list: (ItemType | ItemType[])[],
    padding: number,
    inlineIndent: number,
    collapsed?: boolean,
    mode?: 'inline' | 'vertical'
) {
    return (list || [])
        .map((opt, index) => {
            if (opt && typeof opt === 'object') {
                const { label, children, key, style, labelType, ...restProps } = opt as any;
                const mergedKey = key ?? `tmp-${index}`;
                const nextPadding = labelType === 'small' ? padding : inlineIndent;

                // 垂直展开，有children的菜单 labelType为small时不是NavItem，是SubMenu
                // 折叠目录，所有都是NavItem
                if ((labelType !== 'small' && mode === 'vertical' && children) || collapsed) {
                    return (
                        <NavItem
                            {...restProps}
                            key={mergedKey}
                            type={labelType}
                            style={{ ...style }}
                            marginLeft={padding}
                            verticalChildren={children}
                            title={label}
                        >
                            {label}
                        </NavItem>
                    );
                }

                if (children) {
                    // Sub Menu
                    return (
                        <SubMenu key={mergedKey} {...restProps} type={labelType} title={label} marginLeft={padding}>
                            {convertItemsToNodes(children, nextPadding, inlineIndent, collapsed, mode)}
                        </SubMenu>
                    );
                }

                return (
                    <NavItem
                        {...restProps}
                        title={label}
                        key={mergedKey}
                        type={labelType}
                        style={{ ...style }}
                        marginLeft={padding}
                    >
                        {label}
                    </NavItem>
                );
            }

            return null;
        })
        .filter(opt => opt);
}

// 垂直菜单悬浮展开部分
const PopMenu = ({
    renderPopverMenu,
    verticalChildren
}: {
    renderPopverMenu: (
        items: (ItemType | ItemType[])[],
        subMenuItemRender?: (itemProps: SubMenuProps, dom: JSX.Element) => React.ReactNode,
        menuItemRender?: (itemProps: NavItemProps, dom: JSX.Element) => React.ReactNode
    ) => JSX.Element[];
    verticalChildren?: ItemType[];
}) => {
    const {
        setSelectedKeys: setNavSelectedKeys,
        selectedKeys: navSelectedKeys,
        subMenuItemRender,
        menuItemRender
    } = React.useContext(NavContext);
    const [menuSelectedKeys, setMenuSelectedKeys] = React.useState([] as string[]);

    React.useEffect(() => {
        const subKeys = getTreeAllKeys([], verticalChildren || []).map(item => item.toString());
        const intersectKeys = intersection(subKeys, navSelectedKeys);
        setMenuSelectedKeys(intersectKeys.length ? intersectKeys : []);
    }, [navSelectedKeys]);

    return (
        <NavPopWrap>
            <Menu
                selectedKeys={menuSelectedKeys}
                onChange={key => {
                    setNavSelectedKeys?.(key as string[]);
                }}
            >
                {renderPopverMenu(verticalChildren || [], subMenuItemRender, menuItemRender)}
            </Menu>
        </NavPopWrap>
    );
};
