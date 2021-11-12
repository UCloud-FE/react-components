import React, { HTMLAttributes, ReactNode, useCallback, useMemo, useRef } from 'react';
import classnames from 'classnames';

import Checkbox from 'src/components/Checkbox';
import useLocale from 'src/components/LocaleProvider/useLocale';
import { CollapseProps, useCollapse } from 'src/components/Collapse/hooks';
import CollapseContext from 'src/components/Collapse/CollapseContext';
import { useGroup, Key, groupChildrenAsDataSource, SubGroupMap, ChildrenMap } from 'src/hooks/group';
import useUncontrolled from 'src/hooks/useUncontrolled';
import noop from 'src/utils/noop';
import { Override } from 'src/type';
import once from 'src/utils/once';
import useVirtualList from 'src/hooks/useVirtualList';
import useSimpleVirtualList from 'src/hooks/useSimpleVirtualList';

import {
    MenuWrap,
    prefixCls,
    multipleCls,
    singleCls,
    selectallWrapCls,
    checkboxCls,
    blockCls,
    disabledCls
} from './style';
import MenuContext from './MenuContext';
import LOCALE from './locale/zh_CN';

export interface MenuProps {
    /** 选中的菜单项的key，controlled */
    selectedKeys?: Key[];
    /** 默认选中的菜单项的key，uncontrolled */
    defaultSelectedKeys?: Key[];
    /** 选中变化时的回调 */
    onChange?: (keys: Key[]) => void;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 是否可选 */
    selectable?: boolean;
    /** 是否显示全选，多选时有效 */
    showSelectAll?: boolean;
    /** 是否使用块元素显示模式，去除宽高限制，撑满容器，去除外阴影、border，方便放置在自定义容器中 */
    block?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** collapse 的配置，参考 collapse 组件 */
    collapseProps?: CollapseProps;
    /** 启用虚拟滚动，启用后需要注意所有 item 需提供 key（可不提供 itemKey 和 subMenuKey，会使用 key 作为对应），且 Item key 和 SubMenu 不可重复，目前不支持 collapse 类 SubMenu */
    virtualList?:
        | boolean
        | {
              // 简易模式，如确认每个 item 高度一致且不会变化可启用，可一定程度上优化性能
              simple?: true;
              // 虚拟滚动的高度，默认为 200
              height?: number;
          };
    /** 自定义样式 */
    customStyle?: {
        /** 菜单的最大高度 */
        maxHeight?: string;
        /** 菜单的最大宽度 */
        maxWidth?: string;
    };
    /** @ignore */
    locale?: typeof LOCALE;
    /**
     * @ignore
     * use for inner usage
     */
    dataSource?: ReturnType<typeof groupChildrenAsDataSource>;
}

const warn = once(() => console.warn(`Virtual menu only support popover type of SubMenu`));

export const strictGroupChildrenAsDataSource = (
    children: ReactNode,
    globalDisabled = false,
    {
        itemTag,
        subGroupTag,
        itemKeyName,
        subGroupKeyName
    }: {
        itemTag: string;
        subGroupTag?: string;
        itemKeyName: string;
        subGroupKeyName?: string;
    } = {
        itemTag: 'isItem',
        subGroupTag: 'isSubGroup',
        itemKeyName: 'itemKey',
        subGroupKeyName: 'subGroupKey'
    }
): [Key[], Key[], ReactNode[], SubGroupMap, ChildrenMap] => {
    const subGroupMap: SubGroupMap = new Map();
    const childrenMap: ChildrenMap = new Map();
    const group = (children: ReactNode, disabled: boolean, prefix: string): [Key[], Key[], ReactNode[]] => {
        const validKeys: Key[] = [];
        const disabledKeys: Key[] = [];
        const l = React.Children.count(children);
        const renderChildren: ReactNode[] = [];
        React.Children.forEach(children, (child, i) => {
            const isFirst = i === 0;
            const isLast = i === l - 1;
            if (React.isValidElement(child)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((child.type as any)?.[itemTag]) {
                    const props = child.props;
                    const key = props[itemKeyName] === undefined ? child.key : props[itemKeyName];
                    const isDisabled = disabled || props.disabled;
                    if (isDisabled) {
                        disabledKeys.push(key);
                    } else {
                        validKeys.push(key);
                    }

                    childrenMap.set(key, props.children);
                    renderChildren.push(
                        React.cloneElement(child, {
                            [itemKeyName]: key,
                            disabled: globalDisabled || isDisabled,
                            isFirst,
                            isLast
                        })
                    );
                    return;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } else if (subGroupTag && subGroupKeyName && (child.type as any)?.[subGroupTag]) {
                    const props = child.props;
                    const key = props[subGroupKeyName] || child.key || `${prefix}-${i}`;
                    const isDisabled = disabled || props.disabled;
                    const [subValidKeys, subDisabledKeys, subRenderChildren] = group(
                        child.props.children,
                        isDisabled,
                        key
                    );
                    subGroupMap.set(key, { validKeys: subValidKeys, disabledKeys: subDisabledKeys });
                    validKeys.push(...subValidKeys);
                    disabledKeys.push(...subDisabledKeys);
                    if (props.styleType === 'collapse') warn();

                    return renderChildren.push(
                        React.cloneElement(
                            child,
                            {
                                disabled: globalDisabled || isDisabled,
                                [subGroupKeyName]: key,
                                isFirst,
                                isLast,
                                styleType: 'popover'
                            },
                            subRenderChildren
                        )
                    );
                }
                renderChildren.push(child);
                return;
            }
        });
        return [validKeys, disabledKeys, renderChildren];
    };

    return [...group(children, false, 'group-root'), subGroupMap, childrenMap];
};

const Menu = ({
    selectedKeys: _selectedKeys,
    defaultSelectedKeys = [],
    onChange: _onChange,
    selectable = true,
    multiple = false,
    showSelectAll,
    disabled,
    block,
    locale: _locale,
    className,
    children,
    dataSource,
    collapseProps,
    virtualList,
    ...rest
}: MenuProps & Override<HTMLAttributes<HTMLDivElement>, MenuProps>) => {
    let [selectedKeys, onSelectedKeysChange] = useUncontrolled(_selectedKeys, defaultSelectedKeys, _onChange);
    // clean selectedStatus here
    let onChange = useCallback((keys: Key[]) => onSelectedKeysChange(keys), [onSelectedKeysChange]);
    if (!selectable) {
        // when unselectable clean selectedKeys and onChange handle
        selectedKeys = [];
        onChange = noop;
    }
    const locale = useLocale(LOCALE, 'Menu', _locale);
    const [validKeys, disabledKeys, renderChildren, subGroupMap] = useMemo(
        () =>
            dataSource
                ? dataSource
                : (virtualList ? strictGroupChildrenAsDataSource : groupChildrenAsDataSource)(children, disabled, {
                      itemTag: 'isMenuItem',
                      subGroupTag: 'isMenuSubMenu',
                      itemKeyName: 'itemKey',
                      subGroupKeyName: 'subMenuKey'
                  }),
        [children, dataSource, disabled, virtualList]
    );
    const [collapseContext] = useCollapse(collapseProps || {});

    const [groupContext, selectedStatus, toggleAllItems] = useGroup(
        selectedKeys,
        onChange,
        multiple,
        validKeys,
        disabledKeys,
        subGroupMap
    );
    const selectAllCheckbox = useMemo(
        () =>
            selectable &&
            multiple &&
            showSelectAll && (
                <div className={classnames(selectallWrapCls, disabled && disabledCls)} key="menu-select-all">
                    <Checkbox
                        className={checkboxCls}
                        checked={selectedStatus === 'ALL'}
                        indeterminate={selectedStatus === 'PART'}
                        onChange={toggleAllItems}
                        size="lg"
                        disabled={disabled}
                    >
                        {locale.selectAll}
                    </Checkbox>
                </div>
            ),
        [disabled, locale.selectAll, multiple, selectable, selectedStatus, showSelectAll, toggleAllItems]
    );

    const renderList = useMemo(() => {
        if (virtualList) {
            const virtualRenderChildren: ReactNode[] = (selectAllCheckbox
                ? [selectAllCheckbox as ReactNode]
                : []
            ).concat(renderChildren as ReactNode[]);
            const virtualInfo = typeof virtualList === 'object' ? virtualList : { simple: false, height: 200 };
            return virtualInfo.simple ? (
                <SimpleVirtualScrollList height={virtualInfo.height ?? 200} width="100%">
                    {virtualRenderChildren}
                </SimpleVirtualScrollList>
            ) : (
                <VirtualScrollList height={virtualInfo.height ?? 200} width="100%">
                    {virtualRenderChildren}
                </VirtualScrollList>
            );
        } else {
            return (
                <div>
                    {selectAllCheckbox}
                    {renderChildren}
                </div>
            );
        }
    }, [renderChildren, selectAllCheckbox, virtualList]);

    return (
        <CollapseContext.Provider value={collapseContext}>
            <MenuContext.Provider value={{ ...groupContext, locale }}>
                <MenuWrap
                    className={classnames(className, prefixCls, multiple ? multipleCls : singleCls, block && blockCls)}
                    {...rest}
                >
                    {renderList}
                </MenuWrap>
            </MenuContext.Provider>
        </CollapseContext.Provider>
    );
};

const VirtualScrollList = ({
    children,
    height,
    width
}: {
    children: ReactNode[];
    height: number;
    width?: number | string;
}) => {
    const scrollerRef = useRef(null);
    const heightWrapperRef = useRef(null);
    const wrapperRef = useRef(null);
    const [renderChildren, offsetTop] = useVirtualList(scrollerRef, wrapperRef, heightWrapperRef, children, {
        clientHeight: height
    });
    return (
        <div ref={scrollerRef} style={{ maxHeight: height, width, overflowY: 'auto' }}>
            <div ref={heightWrapperRef}>
                <div ref={wrapperRef} style={{ transform: `translate(0, ${offsetTop}px)` }}>
                    {renderChildren}
                </div>
            </div>
        </div>
    );
};

const SimpleVirtualScrollList = ({
    children,
    height,
    width
}: {
    children: ReactNode[];
    height: number;
    width?: number | string;
}) => {
    const scrollerRef = useRef(null);
    const heightWrapperRef = useRef(null);
    const wrapperRef = useRef(null);
    const [renderChildren, offsetTop] = useSimpleVirtualList(scrollerRef, wrapperRef, heightWrapperRef, children, {
        clientHeight: height
    });
    return (
        <div ref={scrollerRef} style={{ maxHeight: height, width, overflowY: 'auto' }}>
            <div ref={heightWrapperRef}>
                <div ref={wrapperRef} style={{ transform: `translate(0, ${offsetTop}px)` }}>
                    {renderChildren}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Menu);
