import React, { HTMLAttributes, ReactNode, useCallback, useMemo, useState } from 'react';

import Popover from 'src/components/Popover';
import ConfigContext from 'src/components/ConfigProvider/ConfigContext';
import useLocale from 'src/components/LocaleProvider/useLocale';
import { Override, Size, Sizes } from 'src/type';
import { groupChildrenAsDataSource, groupOptionsAsDataSource, Key } from 'src/hooks/group';
import { getPopoverConfigFromContext } from 'src/hooks/usePopoverConfig';
import useUncontrolled from 'src/hooks/useUncontrolled';
import useInitial from 'src/hooks/useInitial';
import noop from 'src/utils/noop';
import deprecatedLog from 'src/utils/deprecatedLog';
import isObject from 'src/utils/isObject';
import once from 'src/utils/once';
import isEmpty from 'src/utils/isEmpty';

import Option from './Option';
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

const groupOptions = {
    itemTag: 'isMenuItem',
    subGroupTag: 'isMenuSubMenu',
    itemKeyName: 'value',
    subGroupKeyName: 'groupKey',
    displayName: 'label',
    subGroupName: 'children',
    ItemComponent: Option,
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
        label: ReactNode;
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
     * @argument searchValue - 搜索的值
     * @argument value - option的值
     */
    search?: true | { handleSearch?: (searchValue: string, value: Key, s: any) => boolean };
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
    };
    /**
     * 可选性为空时展示内容
     */
    emptyContent?: ReactNode;
}

const Selector = ({
    size,
    disabled,
    multiple,
    placeholder,
    renderContent,
    renderSelector,
    value,
    visible,
    locale,
    dataSource,
    ...rest
}: Pick<
    SelectProps,
    'size' | 'disabled' | 'multiple' | 'placeholder' | 'renderContent' | 'renderSelector' | 'value'
> & {
    visible: boolean;
    locale: typeof LOCALE;
    dataSource: ReturnType<typeof groupChildrenAsDataSource>;
}) => {
    placeholder = useMemo(() => placeholder || locale.placeholder, []);
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

    const content = useMemo(() => {
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
    setSearchValue
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

    const renderEmptyContent = () => {
        return emptyContent || <EmptyContentWrapper>{locale.emptyTip}</EmptyContentWrapper>;
    };

    return (
        <MenuWrap>
            {search && <SelectSearchInput onChange={handleSearchInput} value={searchValue} />}
            {children || options ? (
                <BlockMenu
                    onChange={handleChange}
                    customStyle={customStyle}
                    menuCustomStyle={{ maxWidth }}
                    dataSource={dataSource}
                    multiple={multiple}
                    showSelectAll={showSelectAll}
                    selectedKeys={multiple ? value : [value]}
                />
            ) : (
                <BlockMenu>{renderEmptyContent()}</BlockMenu>
            )}
            {finalExtra ? <FooterWrap>{finalExtra}</FooterWrap> : null}
        </MenuWrap>
    );
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
    ...rest
}: SelectProps & Override<HTMLAttributes<HTMLDivElement>, SelectProps>) => {
    const [value, onChange] = useUncontrolled(_value, defaultValue, _onChange);
    const [visible, setVisible] = useState(false);
    const locale = useLocale(LOCALE, 'Select', _locale);
    const [searchValue, setSearchValue] = useState('');

    useInitial(() => {
        if (popover) deprecatedLogForPopover();
    });

    const dataSource = useMemo(() => {
        if (!options) {
            return groupChildrenAsDataSource(children, disabled, groupOptions);
        } else {
            return groupOptionsAsDataSource(options, disabled, groupOptions);
        }
    }, [children, options, disabled]);

    const handleVisibleChange = useCallback(
        (open: boolean) => {
            setVisible(open);
            onVisibleChange(open);
        },
        [onVisibleChange]
    );

    const hidePopup = useCallback(() => handleVisibleChange(false), [handleVisibleChange]);

    const handleSearch = useCallback(
        (value: Key, props: any) => {
            if (!search || !searchValue) {
                return true;
            }
            if (typeof search === 'object' && search.handleSearch) {
                return search.handleSearch(searchValue, value, { props });
            } else {
                const { children } = props;
                return (
                    (value + '').indexOf(searchValue) >= 0 ||
                    (children && typeof children === 'string' && children.indexOf(searchValue) >= 0)
                );
            }
        },
        [search, searchValue]
    );

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
                                forceRender
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
                                            setSearchValue
                                        }}
                                    />
                                }
                            >
                                <Selector
                                    {...{
                                        size,
                                        disabled,
                                        multiple,
                                        placeholder,
                                        renderContent,
                                        renderSelector,
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

Select.Size = Sizes;
export default Select;
