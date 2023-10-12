import React from 'react';
import classnames from 'classnames';
import { Item } from 'rc-menu';
import _ from 'lodash';

import Popover from 'src/components/Popover';
import Menu from 'src/components/Menu';

import { prefixClsMenuItem, prefixClsTitleContent, prefixClsTitleText, NavPopWrap } from './style';
import type { NavContextProps } from './NavContext';
import { ItemType, NavItemProps } from './type';
import SubMenu from './SubMenu';
import NavContext from './NavContext';
import { getTreeAllKeys } from './util';

export default class NavItem extends React.Component<NavItemProps> {
    renderItemChildren() {
        const { children } = this.props;

        const wrapNode = <span className={prefixClsTitleText}>{children}</span>;

        return wrapNode;
    }

    renderItem = (contextProps: NavContextProps) => {
        const { className, type } = this.props;
        const { title, icon, verticalChildren, marginLeft, ...rest } = this.props;
        const { inlineCollapsed, menuItemRender } = contextProps;

        if (verticalChildren?.length) {
            return this.renderVerticalItem(contextProps);
        }

        const dom = (
            <>
                {React.isValidElement(icon) &&
                    React.cloneElement(icon, {
                        className: classnames(
                            React.isValidElement(icon) ? icon.props?.className : '',
                            `${prefixClsMenuItem}-icon`
                        )
                    })}
                {this.renderItemChildren()}
            </>
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
                <div className={prefixClsTitleContent}>{menuItemRender ? menuItemRender(this.props, dom) : dom}</div>
            </Item>
        );

        return returnNode;
    };

    renderPopverMenu = (items: (ItemType | ItemType[])[]) => {
        return items.map(i => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { children, label, key } = i as any;
            if (children) {
                return (
                    <Menu.SubMenu title={label} key={key} styleType="popover">
                        {this.renderPopverMenu(children)}
                    </Menu.SubMenu>
                );
            }
            return <Menu.Item key={key}>{label}</Menu.Item>;
        });
    };

    // 垂直菜单项
    renderVerticalItem = ({ inlineCollapsed, selectedKeys }: Partial<NavContextProps>) => {
        const { className, type } = this.props;
        const { title, icon, verticalChildren, marginLeft, ...rest } = this.props;

        const subKeys = getTreeAllKeys([], verticalChildren || []).map(item => item.toString());
        const intersectKeys = _.intersection(subKeys, selectedKeys);

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
                    <div className={prefixClsTitleContent}>
                        {React.isValidElement(icon) &&
                            React.cloneElement(icon, {
                                className: classnames(
                                    React.isValidElement(icon) ? icon.props?.className : '',
                                    `${prefixClsMenuItem}-icon`
                                )
                            })}
                        {this.renderItemChildren()}
                    </div>
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

export function useItems(
    items?: (ItemType | ItemType[])[],
    inlineIndent = 0,
    inlineCollapsed = false,
    mode?: 'inline' | 'vertical'
) {
    return React.useMemo(() => {
        if (!items) {
            return items;
        }
        if (inlineCollapsed) {
            // 折叠状态过滤小标题
            const newItems = items.map(item => {
                if (item && 'labelType' in item && item?.labelType === 'small') {
                    return 'children' in item ? item.children : item;
                }
                return item;
            });
            return convertItemsToNodes(newItems.flat(), 0, inlineIndent, inlineCollapsed, 'vertical');
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

                // 垂直目录
                if (labelType !== 'small' && mode === 'vertical' && children) {
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
                    <NavItem {...restProps} key={mergedKey} type={labelType} style={{ ...style }} marginLeft={padding}>
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
    renderPopverMenu: (items: (ItemType | ItemType[])[]) => JSX.Element[];
    verticalChildren?: ItemType[];
}) => {
    const { SetSelectedKeys: SetNavSelectedKeys, selectedKeys: navSelectedKeys } = React.useContext(NavContext);
    const [menuSelectedKeys, setMenuSelectedKeys] = React.useState([] as string[]);

    React.useEffect(() => {
        const subKeys = getTreeAllKeys([], verticalChildren || []).map(item => item.toString());
        const intersectKeys = _.intersection(subKeys, navSelectedKeys);
        setMenuSelectedKeys(intersectKeys.length ? intersectKeys : []);
    }, [navSelectedKeys]);

    return (
        <NavPopWrap>
            <Menu
                selectedKeys={menuSelectedKeys}
                onChange={key => {
                    SetNavSelectedKeys?.(key as string[]);
                }}
            >
                {renderPopverMenu(verticalChildren || [])}
            </Menu>
        </NavPopWrap>
    );
};
