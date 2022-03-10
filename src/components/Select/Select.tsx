import React, {
    ChangeEvent,
    ComponentType,
    HTMLAttributes,
    ReactNode,
    RefObject,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import Overflow from 'rc-overflow';

import Popover from 'src/components/Popover';
import Button from 'src/components/Button';
import Tag from 'src/components/Tag';
import Tooltip from 'src/components/Tooltip';
import { MenuRef } from 'src/components/Menu/Menu';
import { Highlight } from 'src/sharedComponents/Search';
import useLocale from 'src/components/LocaleProvider/useLocale';
import SvgIcon from 'src/components/SvgIcon';
import { Override, Size } from 'src/type';
import { ChildrenMap, groupChildrenAsDataSource, Key, SubGroupMap } from 'src/hooks/group';
import usePopoverConfig from 'src/hooks/usePopoverConfig';
import useUncontrolled from 'src/hooks/useUncontrolled';
import useInitial from 'src/hooks/useInitial';
import noop from 'src/utils/noop';
import deprecatedLog from 'src/utils/deprecatedLog';
import { onceWarning } from 'src/utils/warning';
import isObject from 'src/utils/isObject';
import isEmpty from 'src/utils/isEmpty';

import { PureOption } from './Option';
import Group from './Group';
import Extra from './Extra';
import {
    SelectWrap,
    SelectSearchInput,
    SSelector,
    Arrow,
    BlockMenu,
    MenuWrap,
    EmptyContentWrapper,
    selectorContentCls,
    FooterWrap,
    selectAllBtnWrapCls,
    selectInputCls,
    SSelectorMultiple,
    suffixCls,
    SSingleSelector,
    overflowCls,
    measureCls,
    measureContentCls,
    placeholderCls,
    clearCls,
    SRestList
} from './style';
import SelectContext from './SelectContext';
import LOCALE from './locale/zh_CN';

export const deprecatedLogForPopover = deprecatedLog('Select popover', 'popoverProps');
const warnLogForVirtualList = onceWarning('Select virtualList only valid when use options');
const warnLogForCustomHeight = onceWarning(
    'CustomStyle.optionListMaxHeight is invalid when use virtualList, please use virtualList.height'
);
const warnLogForSearchProps = onceWarning(`Don't use item.props in custom search, just use item as props.`);
const warnLogForSubGroup = deprecatedLog('Select.Group', 'Cascader');

const groupOptions = {
    itemTag: 'isMenuItem',
    subGroupTag: 'isMenuSubMenu',
    itemKeyName: 'value',
    subGroupKeyName: 'groupKey',
    displayName: 'label',
    subGroupName: 'children',
    ItemComponent: PureOption,
    SubGroupComponent: Group
};

const groupOptionsAsDataSource = <
    T extends {
        disabled?: boolean;
        key?: Key;
        [key: string]: Key | ReactNode | unknown;
    }
>(
    options: T[],
    globalDisabled = false,
    {
        subGroupName,
        displayName,
        itemKeyName,
        subGroupKeyName,
        ItemComponent,
        SubGroupComponent
    }: {
        subGroupName: string;
        displayName: string;
        itemKeyName: string;
        subGroupKeyName: string;
        ItemComponent: ComponentType<any>;
        SubGroupComponent: ComponentType<any>;
    } = {
        subGroupName: 'children',
        displayName: 'label',
        itemKeyName: 'itemKey',
        subGroupKeyName: 'subGroupKey',
        ItemComponent: () => null,
        SubGroupComponent: () => null
    },
    searchValue: string,
    handleSearch: (value: Key, props: any) => boolean | [string, string, string]
): [Key[], Key[], ReactNode[], SubGroupMap, ChildrenMap] => {
    const subGroupMap: SubGroupMap = new Map();
    const childrenMap: ChildrenMap = new Map();
    const isValidKey = (v: any) => {
        return typeof v === 'string' || typeof v === 'number';
    };
    const group = (options: T[], disabled = false, prefixKey: Key): [Key[], Key[], ReactNode[]] => {
        const validKeys: Key[] = [];
        const disabledKeys: Key[] = [];
        const renderChildren: ReactNode[] = [];
        options.forEach((child, i) => {
            const subChildren = child[subGroupName] as T[];
            if (subChildren) {
                const key = (child[subGroupKeyName] as Key) || child.key || `${prefixKey}-${i}`;
                const reactKey =
                    child.key || isValidKey(child[subGroupKeyName]) ? child[subGroupKeyName] : `${prefixKey}-${i}`;
                const isDisabled = disabled || child.disabled;
                const [subValidKeys, subDisabledKeys, subRenderChildren] = group(subChildren, isDisabled, key);
                subGroupMap.set(key, { validKeys: subValidKeys, disabledKeys: subDisabledKeys });
                validKeys.push(...subValidKeys);
                disabledKeys.push(...subDisabledKeys);
                const visible = searchValue ? !!subRenderChildren.length : true;
                if (visible) {
                    renderChildren.push(
                        <SubGroupComponent
                            key={reactKey}
                            {...child}
                            {...{ disabled: globalDisabled || isDisabled, [subGroupKeyName]: key }}
                        >
                            {subRenderChildren}
                        </SubGroupComponent>
                    );
                }
            } else {
                const key = (child[itemKeyName] === undefined ? child.key : child[itemKeyName]) as Key;
                const reactKey = child.key || isValidKey(child[itemKeyName]) ? child[itemKeyName] : `${prefixKey}-${i}`;
                const isDisabled = disabled || child.disabled;
                if (isDisabled) {
                    disabledKeys.push(key);
                } else {
                    validKeys.push(key);
                }
                const visible = searchValue ? handleSearch(key, child) : true;
                const display = Array.isArray(visible) ? (
                    <>
                        {visible[0]}
                        {<Highlight>{visible[1]}</Highlight>}
                        {visible[2]}
                    </>
                ) : (
                    (child[displayName] as ReactNode) ?? key
                );
                if (visible) {
                    renderChildren.push(
                        <ItemComponent
                            key={reactKey}
                            {...child}
                            {...{ disabled: globalDisabled || isDisabled, [itemKeyName]: key }}
                        >
                            {display}
                        </ItemComponent>
                    );
                }
                childrenMap.set(key, display);
            }
        });
        return [validKeys, disabledKeys, renderChildren];
    };

    return [...group(options, false, 'group-root'), subGroupMap, childrenMap];
};

type PopoverProps = any;

export interface SelectProps {
    /** 当前值，controlled */
    value?: Key | Key[];
    /** 默认值，uncontrolled */
    defaultValue?: Key | Key[];
    /** 无选项时显示内容 */
    placeholder?: ReactNode;
    /** 修改时的回调 */
    onChange?: (value: Key | Key[]) => void;
    /** 快速设置选项 */
    options?: {
        /** 选项展示 */
        label?: ReactNode;
        /** 选项 value，不可重复 */
        value: Key;
    }[];
    /** 在尾部增加附加内容，会脱离选项流容器，超高度时不会一起滚动，如需在选项中嵌入附加内容，可使用 Select.Extra */
    extra?: { content: ReactNode } | ReactNode | ((hidePopup: () => void) => ReactNode);
    /** 是否多选 */
    multiple?: boolean;
    /** 是否显示全选 */
    showSelectAll?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /**
     * 如何渲染选中项的展示
     * @param value - 当前 select 的值
     * @param valueChild - 当前值对应的展示内容（为性能考虑，只提供前 20 个选项，如果需要获取所有，请自行拿 value 获取）
     */
    renderContent?: (value?: Key | Key[], valueChild?: ReactNode[]) => ReactNode;
    /**
     * 自定义渲染选择器
     * @param {node} content - 渲染的内容
     * @param {bool} visible - 当前的select下拉是否展示
     */
    renderSelector?: (content: ReactNode, visible: boolean) => ReactNode;
    /**
     * 自定义渲染弹出内容
     * @param {Object} options - 配置
     * @param {function} options.handleVisible - 处理弹出层的显示隐藏
     * @param {function} options.onChange -  value 变化回调
     * @param options.value - select 的当前值
     */
    renderPopup?: (
        options: {
            handleVisible: (visible: boolean) => void;
            onChange: (v: Key | Key[]) => void;
            value?: Key | Key[];
            /** @ignore */
            children?: ReactNode;
        } & Pick<SelectProps, 'multiple' | 'extra' | 'search' | 'options'>
    ) => ReactNode;
    /**
     * - 是否展示搜索框，可以为 true 或者 Object
     * - 为 Object 时可传入 handleSearch 对搜索筛选进行自定义
     */
    search?:
        | true
        | {
              /**
               * 自定义搜索
               * @argument searchValue - 搜索的值
               * @argument value - option的值
               */
              handleSearch?: (searchValue: string, value: Key, s: any) => boolean;
              /** 搜索值 受控 */
              searchValue?: string;
              /** 默认搜索值 非受控 */
              defaultSearchValue?: string;
              /** 搜索值变化回调 */
              onSearchValueChange?: (searchValue: string) => void;
          };
    /** 尺寸 */
    size?: Size;
    /**
     * 弹出层的popover props
     * @deprecated 请使用popoverProps替换
     */
    popover?: PopoverProps;
    /** 弹出层的popover props */
    popoverProps?: PopoverProps;
    /**
     * @deprecated 请勿使用
     * @ignore
     */
    onVisibleChange?: (visible?: boolean) => void;
    /** @ignore */
    locale?: typeof LOCALE;
    /**
     * 自定义样式
     */
    customStyle?: {
        /** 列表最大高度 */
        optionListMaxHeight?: number | string;
        /** 弹出菜单的最大宽度  */
        popupMaxWidth?: string;
        /** 弹出菜单的宽度 */
        popupWidth?: string;
    };
    /**
     * 可选性为空时展示内容
     */
    emptyContent?: ReactNode;
    /**
     * 启用虚拟列表，仅使用 options 时生效
     */
    virtualList?:
        | boolean
        | {
              simple?: true;
              height?: number;
          };
}

type PopupProps = Pick<
    SelectProps,
    | 'extra'
    | 'customStyle'
    | 'search'
    | 'multiple'
    | 'emptyContent'
    | 'showSelectAll'
    | 'value'
    | 'renderPopup'
    | 'options'
    | 'virtualList'
> &
    Required<Pick<SelectProps, 'onChange'>> & {
        children?: ReactNode;
        locale: typeof LOCALE;
        handleVisibleChange: (visible: boolean) => void;
        hidePopup: () => void;
        dataSource: ReturnType<typeof groupChildrenAsDataSource>;
        searchValue: string;
        setSearchValue: (searchValue: string) => void;
    };

const Popup = React.memo(function Popup({
    v1,
    ...props
}: PopupProps & {
    v1: boolean;
}) {
    const PopupComponent = props.renderPopup ? CustomPopup : v1 ? PopupV1 : PopupV2;
    return React.createElement(PopupComponent, props);
});

const CustomPopup = React.memo(function CustomPopup(props: PopupProps) {
    const { onChange, value, multiple, extra, search, children, options, handleVisibleChange, renderPopup } = props;
    return (
        <>
            {renderPopup?.({
                handleVisible: handleVisibleChange,
                onChange,
                value,
                multiple,
                extra,
                search,
                children,
                options
            })}
        </>
    );
});

const PopupV1 = React.memo(function PopupV1({
    extra,
    customStyle = {},
    search,
    multiple,
    emptyContent: _emptyContent,
    showSelectAll,
    value,
    options,
    children,
    onChange,
    locale,
    handleVisibleChange,
    hidePopup,
    dataSource,
    searchValue,
    setSearchValue,
    virtualList
}: PopupProps) {
    const handleChange = useCallback(
        (value: Key[]) => {
            if (!multiple) {
                handleVisibleChange(false);
                onChange(value[0]);
            } else {
                onChange(value);
            }
        },
        [multiple, onChange, handleVisibleChange]
    );
    const handleSearchInput = useCallback(
        e => {
            setSearchValue(e.target.value);
        },
        [setSearchValue]
    );

    const finalExtra = useMemo(() => {
        if (typeof extra === 'function') {
            return <Extra>{extra(hidePopup)}</Extra>;
        } else if (!isEmpty(extra)) {
            if (React.isValidElement(extra)) {
                return <Extra>{extra}</Extra>;
            } else if (isObject(extra)) {
                const { content, ...rest } = extra as { content: ReactNode };
                return <Extra {...rest}>{content}</Extra>;
            }
        }
    }, [extra, hidePopup]);

    const maxWidth = customStyle.popupMaxWidth ? customStyle.popupMaxWidth : 'none';
    const newCustomStyle = { ...customStyle };
    if (virtualList) {
        newCustomStyle.optionListMaxHeight = 'none';
        if ('optionListMaxHeight' in newCustomStyle) warnLogForCustomHeight();
    }

    const emptyContent = useMemo(() => _emptyContent || <EmptyContentWrapper>{locale.emptyTip}</EmptyContentWrapper>, [
        _emptyContent,
        locale
    ]);

    return (
        <MenuWrap>
            {search && <SelectSearchInput onChange={handleSearchInput} value={searchValue} status="default" />}
            {children || options?.length ? (
                <BlockMenu
                    onChange={handleChange}
                    customStyle={newCustomStyle}
                    menuCustomStyle={{ maxWidth }}
                    dataSource={dataSource}
                    multiple={multiple}
                    showSelectAll={showSelectAll}
                    selectedKeys={multiple ? value : [value]}
                    virtualList={options ? virtualList : false}
                />
            ) : (
                <BlockMenu>{emptyContent}</BlockMenu>
            )}
            {finalExtra ? <FooterWrap>{finalExtra}</FooterWrap> : null}
        </MenuWrap>
    );
});

const PopupV2 = React.memo(function PopupV2({
    extra,
    customStyle = {},
    multiple,
    emptyContent: _emptyContent,
    showSelectAll,
    value,
    options,
    children,
    onChange,
    locale,
    handleVisibleChange,
    hidePopup,
    dataSource,
    virtualList
}: PopupProps) {
    const menuRef = useRef<MenuRef>(null);
    const handleChange = useCallback(
        (value: Key[]) => {
            if (!multiple) {
                handleVisibleChange(false);
                onChange(value[0]);
            } else {
                onChange(value);
            }
        },
        [multiple, onChange, handleVisibleChange]
    );
    const handleSelectAll = useCallback(() => {
        menuRef.current?.selectAll();
    }, []);

    const emptyContent = useMemo(() => _emptyContent || <EmptyContentWrapper>{locale.emptyTip}</EmptyContentWrapper>, [
        _emptyContent,
        locale
    ]);

    const finalExtra = useMemo(() => {
        if (typeof extra === 'function') {
            return <Extra>{extra(hidePopup)}</Extra>;
        } else if (!isEmpty(extra)) {
            if (React.isValidElement(extra)) {
                return <Extra>{extra}</Extra>;
            } else if (isObject(extra)) {
                const { content, ...rest } = extra as { content: ReactNode };
                return <Extra {...rest}>{content}</Extra>;
            }
        }
    }, [extra, hidePopup]);

    const maxWidth = customStyle.popupMaxWidth ? customStyle.popupMaxWidth : 'none';
    const newCustomStyle = { ...customStyle };
    if (virtualList) {
        newCustomStyle.optionListMaxHeight = 'none';
        if ('optionListMaxHeight' in newCustomStyle) warnLogForCustomHeight();
    }

    return (
        <MenuWrap>
            {multiple && showSelectAll && (
                <div className={selectAllBtnWrapCls}>
                    <Button block styleType="border-gray" size="sm" onClick={handleSelectAll}>
                        {locale.selectAll}
                    </Button>
                </div>
            )}
            {children || options?.length ? (
                <BlockMenu
                    onChange={handleChange}
                    customStyle={newCustomStyle}
                    menuCustomStyle={{ maxWidth }}
                    dataSource={dataSource}
                    multiple={multiple}
                    selectedKeys={multiple ? value : [value]}
                    virtualList={options ? virtualList : false}
                    ref={menuRef}
                />
            ) : (
                <BlockMenu>{emptyContent}</BlockMenu>
            )}
            {finalExtra ? <FooterWrap>{finalExtra}</FooterWrap> : null}
        </MenuWrap>
    );
});

type SelectorProps = Pick<
    SelectProps,
    | 'disabled'
    | 'multiple'
    | 'placeholder'
    | 'renderContent'
    | 'renderSelector'
    | 'renderPopup'
    | 'value'
    | 'onChange'
    | 'search'
> & {
    visible: boolean;
    locale: typeof LOCALE;
    dataSource: ReturnType<typeof groupChildrenAsDataSource>;
    searchValue?: string;
    setSearchValue: (v: string) => void;
    _popupProps: any;
    wrapRef: RefObject<HTMLElement>;
} & Required<Pick<SelectProps, 'size'>>;

const Selector = React.memo(function Selector({
    v1,
    size,
    disabled,
    multiple,
    placeholder,
    renderContent,
    renderSelector,
    renderPopup,
    value,
    onChange,
    visible,
    locale,
    dataSource,
    search,
    searchValue,
    setSearchValue,
    wrapRef,
    ..._popupProps
}: Omit<SelectorProps, '_popupProps'> & { v1: boolean }) {
    const props = {
        size,
        disabled,
        multiple,
        placeholder,
        renderContent,
        renderSelector,
        renderPopup,
        value,
        onChange,
        visible,
        locale,
        dataSource,
        search,
        searchValue,
        setSearchValue,
        wrapRef,
        _popupProps
    };
    const SelectorComponent = renderSelector
        ? CustomSelector
        : v1
        ? SelectorV1
        : multiple
        ? MultipleSelector
        : SingleSelector;
    return React.createElement(SelectorComponent, props);
});

const useOldContent = ({
    locale,
    placeholder,
    multiple,
    dataSource,
    value,
    renderContent,
    renderPopup
}: SelectorProps) => {
    placeholder = useMemo(() => placeholder || locale.placeholder, [locale.placeholder, placeholder]);
    const defaultRenderContent = useCallback(
        (value, valueChild) => {
            if (!multiple) {
                if (value === undefined) {
                    return placeholder;
                } else {
                    return valueChild;
                }
            } else {
                if (value && value.length) {
                    return `${locale.selected}${value.length}${locale.items}`;
                } else {
                    return placeholder;
                }
            }
        },
        [locale.items, locale.selected, multiple, placeholder]
    );

    const getContent = useCallback(() => {
        const [, , , , childrenMap = new Map()] = dataSource;

        let valueChild;
        const getValueChild = (v?: Key) => {
            return childrenMap.has(v) ? childrenMap.get(v) : v;
        };

        if (!multiple) {
            valueChild = getValueChild(value as Key);
        } else {
            const _value = ((value as unknown) as Key[]) ? [...((value as unknown) as Key[])] : [];
            // only get the top twenty item child for better performance
            if (_value.length > 20) {
                _value.length = 20;
            }
            valueChild = _value.map(getValueChild);
        }

        if (renderContent) {
            return renderContent(value, valueChild);
        } else {
            return defaultRenderContent(value, valueChild);
        }
    }, [dataSource, defaultRenderContent, multiple, renderContent, value]);

    let content = useMemo(getContent, [getContent]);
    // 自定义渲染弹层时，开发者可能不传入 options 和 children，导致 content memo deps 不触发变更，故强制更新
    if (renderPopup) content = getContent();
    return content;
};

const CustomSelector = React.memo(function CustomSelector(props: SelectorProps) {
    const content = useOldContent(props);
    // eslint-disable-next-line react/prop-types
    const { renderSelector, visible, _popupProps } = props;
    const selector = renderSelector?.(content, visible) || <></>;
    return React.isValidElement(selector) ? React.cloneElement(selector, _popupProps) : null;
});

const SelectorV1 = React.memo(function SelectorV1(props: SelectorProps) {
    const { size, disabled, visible, _popupProps } = props;
    const content = useOldContent(props);
    const title = typeof content === 'string' ? content : undefined;
    return (
        <SSelector styleType="border" size={size} disabled={disabled} title={title} {..._popupProps}>
            <div className={selectorContentCls} key="content">
                {content}
            </div>
            <Arrow key="icon" type={visible ? 'arrow-up' : 'arrow-down'} />
        </SSelector>
    );
});

const RestListItem = React.memo(function RestListItem({
    item,
    disabled,
    onClose
}: {
    item: InternalItem;
    disabled?: boolean;
    onClose: (itemKey: Key) => void;
}) {
    const handleClose = useCallback(() => {
        onClose(item.key);
    }, [item.key, onClose]);
    return (
        <div key={item.key}>
            <span data-role="label">{item.children}</span>
            {!disabled && (
                <span data-role="close" onClick={handleClose}>
                    <SvgIcon type="cross" />
                </span>
            )}
        </div>
    );
});

const RestList = React.memo(function RestList({
    items,
    onClose,
    disabled,
    ...rest
}: { items: InternalItem[]; disabled?: boolean; onClose: (itemKey: Key) => void } & HTMLAttributes<HTMLDivElement>) {
    return (
        <SRestList {...rest}>
            {items.map(item => {
                return <RestListItem item={item} key={item.key} onClose={onClose} disabled={disabled} />;
            })}
        </SRestList>
    );
});

interface InternalItem {
    key: Key;
    children: any;
}

const TagItem = React.memo(function TagItem({
    item,
    disabled,
    onClose
}: {
    item: InternalItem;
    disabled?: boolean;
    onClose: (itemKey: Key) => void;
}) {
    const handleClose = useCallback(() => {
        onClose(item.key);
    }, [item.key, onClose]);
    return (
        <Tag key={item.key} closable disabled={disabled} onClose={handleClose}>
            {item.children}
        </Tag>
    );
});

const MultipleSelector = React.memo(function MultipleSelector(props: SelectorProps) {
    const {
        size,
        disabled,
        visible,
        dataSource,
        value,
        onChange,
        placeholder,
        search,
        searchValue = '',
        setSearchValue,
        wrapRef,
        _popupProps
    } = props;
    const [, , , , childrenMap = new Map()] = dataSource;
    const [inputWidth, setInputWidth] = useState(40);
    const measureRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useLayoutEffect(() => {
        setInputWidth(Math.max((measureRef.current?.scrollWidth || 0) + 10, 40));
    }, [searchValue]);

    const items = useMemo(
        () =>
            ((value as Key[]) || []).map(v => {
                return {
                    key: v,
                    children: childrenMap.has(v) ? childrenMap.get(v) : v
                };
            }),
        [childrenMap, value]
    );

    const handleClose = useCallback(
        (key: Key) => {
            onChange?.((value as Key[]).filter(v => v !== key));
        },
        [onChange, value]
    );

    const popoverConfigProps = usePopoverConfig();

    const renderItem = useCallback(
        (item: InternalItem) => {
            return <TagItem key={item.key} disabled={disabled} onClose={handleClose} item={item} />;
        },
        [disabled, handleClose]
    );
    const getRestPopupContainer = useCallback(() => wrapRef?.current, [wrapRef]);

    const renderRest = useCallback(
        (items: any[]) => {
            if (!items.length) return null;
            return (
                <Tooltip
                    key="rest"
                    popup={<RestList onClose={handleClose} disabled={disabled} items={items} />}
                    arrow={false}
                    getPopupContainer={getRestPopupContainer}
                    customStyle={{ popupWrapperPadding: '0' }}
                    align={{
                        points: ['tl', 'br'],
                        overflow: { adjustX: 1, adjustY: 1 },
                        offset: [10, 10],
                        targetOffset: [0, 0]
                    }}
                    {...popoverConfigProps}
                >
                    <Tag disabled={disabled}>+{items.length}</Tag>
                </Tooltip>
            );
        },
        [disabled, getRestPopupContainer, handleClose, popoverConfigProps]
    );

    const handleInput = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
        },
        [setSearchValue]
    );

    const hasInput = search;

    const handleClear = useCallback(() => {
        if (!disabled) {
            onChange?.([]);
            inputRef.current?.focus();
        }
    }, [disabled, onChange]);

    const clearBtn = useMemo(() => {
        return (
            <span className={clearCls} onClick={handleClear}>
                <SvgIcon type="cross-circle-filled" />
            </span>
        );
    }, [handleClear]);

    const empty = useMemo(() => !(value as Key[])?.length, [value]);
    const handleSelectorClick = useCallback(
        (e: MouseEvent) => {
            inputRef.current?.focus();
            _popupProps.onClick?.(e);
        },
        [_popupProps]
    );

    return (
        <SSelectorMultiple
            size={size}
            disabled={disabled}
            focused={visible}
            cursor={hasInput ? 'text' : 'pointer'}
            empty={empty}
            block
            {..._popupProps}
            onClick={handleSelectorClick}
        >
            {placeholder && empty && !searchValue && <div className={placeholderCls}>{placeholder}</div>}
            <Overflow
                prefixCls={overflowCls}
                data={items}
                renderItem={renderItem}
                renderRest={renderRest}
                suffix={
                    hasInput ? (
                        <div key="input" className={measureCls} style={{ width: inputWidth }}>
                            <input
                                className={suffixCls}
                                value={searchValue}
                                onChange={handleInput}
                                disabled={disabled}
                                ref={inputRef}
                            />
                            <span className={measureContentCls} ref={measureRef} aria-hidden>
                                {searchValue}
                            </span>
                        </div>
                    ) : null
                }
                itemKey="key"
                maxCount="responsive"
            />
            {clearBtn}
            {!visible && <SvgIcon type={'arrow-down'} />}
        </SSelectorMultiple>
    );
});

// 单选下的选择器
const SingleSelector = React.memo(function SingleSelector({
    size,
    disabled,
    placeholder,
    renderContent,
    renderPopup,
    value,
    visible,
    dataSource,
    search,
    searchValue = '',
    setSearchValue,
    _popupProps
}: SelectorProps) {
    const getContent = useCallback(() => {
        const [, , , , childrenMap = new Map()] = dataSource;
        const getValueChild = (v?: Key) => {
            return childrenMap.has(v) ? childrenMap.get(v) : v;
        };
        const valueChild = getValueChild(value as Key);
        if (renderContent) {
            return renderContent(value, valueChild);
        }
        return value === undefined ? placeholder : valueChild;
    }, [dataSource, placeholder, renderContent, value]);

    let content = useMemo(getContent, [getContent]);
    // 自定义渲染弹层时，开发者可能不传入 options 和 children，导致 content memo deps 不触发变更，故强制更新
    if (renderPopup) content = getContent();

    const handleInput = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
        },
        [setSearchValue]
    );

    const sharedProps = {
        className: selectInputCls,
        size,
        disabled,
        block: true,
        readOnly: !search,
        suffix: <SvgIcon type={visible ? 'arrow-up' : 'arrow-down'} />,
        cursor: search ? 'text' : 'pointer',
        ..._popupProps
    };

    if (typeof content === 'string') {
        if (visible) {
            return (
                <SSingleSelector value={searchValue} onChange={handleInput} placeholder={content} {...sharedProps} />
            );
        }
        return <SSingleSelector value={content} {...sharedProps} />;
    }
    if (visible) {
        return (
            <SSingleSelector
                value={searchValue}
                onChange={handleInput}
                prefix={
                    <span
                        className={placeholderCls}
                        style={{ visibility: searchValue ? 'hidden' : 'visible', opacity: '.5' }}
                    >
                        {content}
                    </span>
                }
                {...sharedProps}
            />
        );
    }
    return <SSingleSelector value="" prefix={<span className={placeholderCls}>{content}</span>} {...sharedProps} />;
});

const Select = ({
    size = 'md',
    value: _value,
    defaultValue,
    onChange: _onChange,
    onVisibleChange = noop,
    disabled,
    search,
    multiple,
    renderContent,
    renderSelector,
    placeholder,
    locale: _locale,
    options,
    children,
    emptyContent,
    showSelectAll,
    extra,
    customStyle,
    popover,
    popoverProps,
    renderPopup,
    virtualList,
    ...htmlProps
}: SelectProps & Override<HTMLAttributes<HTMLDivElement>, SelectProps>) => {
    const [value, onChange] = useUncontrolled(_value, defaultValue, _onChange);
    const [visible, setVisible] = useState(false);
    const locale = useLocale(LOCALE, 'Select', _locale);
    const wrapRef = useRef<HTMLElement>(null);
    if (search === true) search = {};
    const [searchValue, setSearchValue] = useUncontrolled(
        search?.searchValue,
        search?.defaultSearchValue || '',
        search?.onSearchValueChange
    );

    useInitial(() => {
        if (popover) deprecatedLogForPopover();
        if (virtualList && !options) warnLogForVirtualList();
    });

    const handleSearch = useCallback(
        (value: Key, props: any) => {
            if (!search || !searchValue) {
                return true;
            }
            if (typeof search === 'object' && search.handleSearch) {
                // assign props for forward compatible
                const beforeProps = { ...props };
                if (options) beforeProps.children = beforeProps.label ?? beforeProps.value;
                const itemInfo = { ...props };
                if (!('props' in itemInfo)) {
                    Object.defineProperty(itemInfo, 'props', {
                        get: () => {
                            warnLogForSearchProps();
                            return beforeProps;
                        }
                    });
                }
                return search.handleSearch(searchValue, value, itemInfo);
            } else {
                // use label for options case
                const children = options ? props.label ?? props.value : props.children;
                if (children && typeof children === 'string') {
                    const i = children.indexOf(searchValue);
                    if (i >= 0) {
                        const l = searchValue.length;
                        return [children.substring(0, i), children.substring(i, i + l), children.substring(i + l)] as [
                            string,
                            string,
                            string
                        ];
                    }
                }
                return (value + '').indexOf(searchValue) >= 0;
            }
        },
        [options, search, searchValue]
    );

    const childrenDataSource = useMemo(
        () => (options ? [] : groupChildrenAsDataSource(children, disabled, groupOptions)),
        [children, disabled, options]
    );
    const optionsDataSource = useMemo(
        () => (options ? groupOptionsAsDataSource(options, disabled, groupOptions, searchValue, handleSearch) : []),
        [disabled, handleSearch, options, searchValue]
    );

    const dataSource = useMemo(
        () =>
            (options ? optionsDataSource : childrenDataSource) as
                | ReturnType<typeof groupOptionsAsDataSource>
                | ReturnType<typeof groupChildrenAsDataSource>,
        [options, childrenDataSource, optionsDataSource]
    );

    virtualList = useMemo(() => (options ? virtualList : false), [options, virtualList]);

    const handleVisibleChange = useCallback(
        (open: boolean) => {
            setVisible(open);
            onVisibleChange(open);
            if (!open) setSearchValue('');
        },
        [onVisibleChange, setSearchValue]
    );
    const hidePopup = useCallback(() => handleVisibleChange(false), [handleVisibleChange]);

    const hasSubGroup = useMemo(() => {
        const hasSubGroup = dataSource[3].size > 0;
        warnLogForSubGroup();
        return hasSubGroup;
    }, [dataSource]);
    // 多层数据/搜索且自定义 selector/自定义渲染内容时，无法兼容，回滚到老版本
    const [v1] = useState(() => hasSubGroup || !!(search && (renderContent || renderSelector)));

    const popup = React.createElement(
        Popup,
        {
            v1,
            extra,
            customStyle,
            search,
            multiple,
            emptyContent,
            showSelectAll,
            value,
            renderPopup,
            handleVisibleChange,
            options,
            onChange,
            locale,
            hidePopup,
            dataSource,
            searchValue,
            setSearchValue,
            virtualList
        },
        children
    );
    const selector = React.createElement(Selector, {
        v1,
        size,
        disabled,
        multiple,
        placeholder,
        renderContent,
        renderSelector,
        renderPopup,
        value,
        onChange,
        visible,
        locale,
        dataSource,
        search,
        searchValue,
        setSearchValue,
        wrapRef
    });
    const popoverTriggerAttrs = useMemo(
        () => (v1 ? { trigger: ['click'] } : { trigger: [], showAction: ['click', 'contextMenu'] }),
        [v1]
    );
    const popoverConfigProps = usePopoverConfig();

    return (
        <SelectContext.Provider
            value={{
                hidePopup,
                handleSearch,
                searchValue
            }}
        >
            <SelectWrap ref={wrapRef} {...htmlProps}>
                <Popover
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    placement="bottomLeft"
                    {...popoverTriggerAttrs}
                    {...popoverConfigProps}
                    {...popover}
                    {...popoverProps}
                    popup={popup}
                    forceRender={false}
                >
                    {selector}
                </Popover>
            </SelectWrap>
        </SelectContext.Provider>
    );
};

export default React.memo(Select);
