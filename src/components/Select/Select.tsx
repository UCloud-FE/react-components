import React, { ComponentType, HTMLAttributes, ReactNode, useCallback, useMemo, useState } from 'react';

import Popover from 'src/components/Popover';
import ConfigContext from 'src/components/ConfigProvider/ConfigContext';
import useLocale from 'src/components/LocaleProvider/useLocale';
import { Override, Size } from 'src/type';
import { ChildrenMap, groupChildrenAsDataSource, Key, SubGroupMap } from 'src/hooks/group';
import { getPopoverConfigFromContext } from 'src/hooks/usePopoverConfig';
import useUncontrolled from 'src/hooks/useUncontrolled';
import useInitial from 'src/hooks/useInitial';
import noop from 'src/utils/noop';
import deprecatedLog from 'src/utils/deprecatedLog';
import isObject from 'src/utils/isObject';
import once from 'src/utils/once';
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
    FooterWrap
} from './style';
import SelectContext from './SelectContext';
import LOCALE from './locale/zh_CN';

export const deprecatedLogForPopover = once(() => deprecatedLog('Select popover', 'popoverProps'));
const warnLogForVirtualList = once(() => console.error('Select virtualList only valid when use options'));
const warnLogForCustomHeight = once(() =>
    console.error('CustomStyle.optionListMaxHeight is invalid when use virtualList, please use virtualList.height')
);
const warnLogForSearchProps = once(() =>
    console.error(`Don't use item.props in custom search, just use item as props.`)
);

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

type PopoverProps = any;

export interface SelectProps {
    /** 当前值，controlled */
    value?: Key;
    /** 默认值，uncontrolled */
    defaultValue?: Key;
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

const Selector = ({
    size,
    disabled,
    multiple,
    placeholder,
    renderContent,
    renderSelector,
    renderPopup,
    value,
    visible,
    locale,
    dataSource,
    ...rest
}: Pick<
    SelectProps,
    'size' | 'disabled' | 'multiple' | 'placeholder' | 'renderContent' | 'renderSelector' | 'renderPopup' | 'value'
> & {
    visible: boolean;
    locale: typeof LOCALE;
    dataSource: ReturnType<typeof groupChildrenAsDataSource>;
}) => {
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
            valueChild = getValueChild(value);
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

    if (renderSelector) {
        const selector = renderSelector(content, visible) || <></>;
        return React.isValidElement(selector) ? React.cloneElement(selector, rest) : null;
    }
    const title = typeof content === 'string' ? content : undefined;
    return (
        <SSelector styleType="border" size={size} disabled={disabled} title={title} {...rest}>
            <div className={selectorContentCls} key="content">
                {content}
            </div>
            <Arrow key="icon" type={visible ? 'arrow-up' : 'arrow-down'} />
        </SSelector>
    );
};

const Popup = ({
    extra,
    customStyle = {},
    search,
    multiple,
    emptyContent,
    showSelectAll,
    value,
    renderPopup,
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
}: Pick<
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
    }) => {
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

    if (renderPopup) {
        return (
            <>
                {renderPopup({
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
    }

    const maxWidth = customStyle.popupMaxWidth ? customStyle.popupMaxWidth : 'none';
    const newCustomStyle = { ...customStyle };
    if (virtualList) {
        newCustomStyle.optionListMaxHeight = 'none';
        if ('optionListMaxHeight' in newCustomStyle) warnLogForCustomHeight();
    }

    const renderEmptyContent = () => {
        return emptyContent || <EmptyContentWrapper>{locale.emptyTip}</EmptyContentWrapper>;
    };

    return (
        <MenuWrap>
            {search && <SelectSearchInput onChange={handleSearchInput} value={searchValue} />}
            {children || options ? (
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
                <BlockMenu>{renderEmptyContent()}</BlockMenu>
            )}
            {finalExtra ? <FooterWrap>{finalExtra}</FooterWrap> : null}
        </MenuWrap>
    );
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
    handleSearch: (value: Key, props: any) => boolean
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
                const display = (child[displayName] as ReactNode) ?? key;
                const visible = searchValue ? handleSearch(key, child) : true;
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
    ...rest
}: SelectProps & Override<HTMLAttributes<HTMLDivElement>, SelectProps>) => {
    const [value, onChange] = useUncontrolled(_value, defaultValue, _onChange);
    const [visible, setVisible] = useState(false);
    const locale = useLocale(LOCALE, 'Select', _locale);
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
                const children = options ? props.label : props.children;
                return (
                    (value + '').indexOf(searchValue) >= 0 ||
                    (children && typeof children === 'string' && children.indexOf(searchValue) >= 0)
                );
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

    virtualList = useMemo(() => (options ? virtualList : false), [options, virtualList]);

    const dataSource = useMemo(
        () =>
            (options ? optionsDataSource : childrenDataSource) as
                | ReturnType<typeof groupOptionsAsDataSource>
                | ReturnType<typeof groupChildrenAsDataSource>,
        [options, childrenDataSource, optionsDataSource]
    );

    const handleVisibleChange = useCallback(
        (open: boolean) => {
            setVisible(open);
            onVisibleChange(open);
        },
        [onVisibleChange]
    );

    const hidePopup = useCallback(() => handleVisibleChange(false), [handleVisibleChange]);

    return (
        <ConfigContext.Consumer>
            {configContext => {
                const popupConfigProps = getPopoverConfigFromContext(configContext);
                return (
                    <SelectContext.Provider
                        value={{
                            hidePopup,
                            handleSearch,
                            searchValue
                        }}
                    >
                        <SelectWrap {...rest}>
                            <Popover
                                onVisibleChange={handleVisibleChange}
                                placement="bottomLeft"
                                trigger={['click']}
                                {...popupConfigProps}
                                visible={visible}
                                {...popover}
                                {...popoverProps}
                                popup={
                                    <Popup
                                        {...{
                                            extra,
                                            customStyle,
                                            search,
                                            multiple,
                                            emptyContent,
                                            showSelectAll,
                                            value,
                                            renderPopup,
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
                                        }}
                                    />
                                }
                                forceRender={false}
                            >
                                <Selector
                                    {...{
                                        size,
                                        disabled,
                                        multiple,
                                        placeholder,
                                        renderContent,
                                        renderSelector,
                                        renderPopup,
                                        value,
                                        visible,
                                        locale,
                                        dataSource
                                    }}
                                />
                            </Popover>
                        </SelectWrap>
                    </SelectContext.Provider>
                );
            }}
        </ConfigContext.Consumer>
    );
};

export default Select;
