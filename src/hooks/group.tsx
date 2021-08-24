import React, { useCallback, useEffect, useMemo, useRef, ReactNode, ComponentType } from 'react';

import noop from 'src/utils/noop';

export type Key = number | string;
export type KeyMap = Map<Key, boolean>;
export type ChildrenMap = Map<Key, ReactNode>;
export interface GroupContext {
    selectedKeyMap?: KeyMap;
    selectedKeys?: Key[];
    toggleKey: (key: Key, selected?: boolean) => void;
    toggleKeys: (keys: Key[], selected: boolean) => void;
    multiple?: boolean;
    subGroupMap?: SubGroupMap;
}
export const defaultContext: GroupContext = {
    toggleKey: noop,
    toggleKeys: noop
};
export type SelectedStatus = 'NONE' | 'ALL' | 'PART' | 'UNKNOWN';
export type SubGroupMap = Map<Key, { validKeys: Key[]; disabledKeys: Key[] }>;

const emptyKeys: Key[] = [];
const formatKeys = (keys: Key[]): Key[] => {
    return Array.isArray(keys) ? keys : emptyKeys;
};

const union = (keys: Key[], anotherKeys: Key[]) => {
    if (!keys.length || !anotherKeys.length) return [];
    const unionKeys: Key[] = [];
    const map: KeyMap = new Map();
    keys.forEach(key => map.set(key, true));
    anotherKeys.forEach(key => {
        if (map.has(key)) unionKeys.push(key);
    });
    return unionKeys;
};

const getSelectedStatusByUnionCount = (selectedKeys: Key[], validKeys: Key[]) => {
    const validSelectedKeys = union(selectedKeys, validKeys);
    const vsL = validSelectedKeys.length;
    return vsL === 0 ? 'NONE' : vsL >= validKeys.length ? 'ALL' : 'PART';
};

const getSelectedStatus = (selectedKeys: Key[], validKeys: Key[], disabledKeys: Key[]): SelectedStatus => {
    const sL = selectedKeys.length;
    if (sL === 0) return 'NONE';
    const vL = validKeys.length,
        dL = disabledKeys.length;
    if (sL < vL) return 'PART';
    if (sL >= vL + dL) return 'ALL';
    return getSelectedStatusByUnionCount(selectedKeys, validKeys);
};

const getSubSelectedStatus = (selectedKeys: Key[], validKeys: Key[]): SelectedStatus => {
    const sL = selectedKeys.length;
    if (sL === 0) return 'NONE';
    return getSelectedStatusByUnionCount(selectedKeys, validKeys);
};

const getSelectedKeysAfterSelectAll = (
    allSelectedStatus: SelectedStatus,
    selectedKeys: Key[],
    validKeys: Key[],
    disabledKeys: Key[]
) => {
    const disabledSelectedKeys = union(selectedKeys, disabledKeys);
    if (allSelectedStatus === 'ALL') {
        return disabledSelectedKeys;
    } else {
        return validKeys.concat(disabledSelectedKeys);
    }
};

/**
 * @param selectedKeys all selected keys
 * @param onChange callback when selectedKeys change
 */
const useGroup = (
    selectedKeys: Key[],
    onChange: (keys: Key[], selectedStatus?: SelectedStatus) => void,
    multiple = true,
    validKeys?: Key[],
    disabledKeys?: Key[],
    subGroupMap?: SubGroupMap
): [GroupContext, SelectedStatus, () => void] => {
    // avoid unknown type of keys
    selectedKeys = formatKeys(selectedKeys);
    const selectedStatus: SelectedStatus = useMemo(
        () =>
            multiple && validKeys && disabledKeys
                ? getSelectedStatus(selectedKeys, validKeys, disabledKeys)
                : 'UNKNOWN',
        [selectedKeys, validKeys, disabledKeys, multiple]
    );
    const selectedKeyMap = useMemo(() => {
        const m: KeyMap = new Map();
        selectedKeys.forEach(v => m.set(v, true));
        return m;
    }, [selectedKeys]);
    // use ref to reduce toggle rebuild
    const cacheRef = useRef({
        selectedKeys,
        selectedKeyMap,
        validKeys,
        disabledKeys,
        multiple,
        selectedStatus
    });
    // update cache
    useEffect(() => {
        cacheRef.current = { selectedKeys, selectedKeyMap, validKeys, disabledKeys, multiple, selectedStatus };
    }, [disabledKeys, selectedKeyMap, multiple, selectedKeys, selectedStatus, validKeys]);

    const toggleKeys = useCallback(
        (keys: Key[], selected?: boolean) => {
            const cache = cacheRef.current;
            const { selectedKeyMap, validKeys, disabledKeys, multiple } = cache;
            if (multiple) {
                const newKeyMap: KeyMap = new Map(selectedKeyMap);
                if (selected) {
                    keys.forEach(key => newKeyMap.set(key, true));
                } else {
                    keys.forEach(key => newKeyMap.delete(key));
                }
                const newKeys = Array.from(newKeyMap.keys());
                const selectedStatus =
                    validKeys && disabledKeys ? getSelectedStatus(newKeys, validKeys, disabledKeys) : 'UNKNOWN';
                onChange(newKeys, selectedStatus);
            } else {
                if (selected !== false) {
                    const key = keys.slice(0, 1);
                    onChange(key);
                } else {
                    onChange([]);
                }
            }
        },
        [onChange]
    );
    const toggleKey = useCallback(
        (key: Key, selected?: boolean) => {
            const cache = cacheRef.current;
            const { selectedKeyMap, multiple } = cache;
            toggleKeys([key], multiple && selected === undefined ? !selectedKeyMap.get(key) : selected);
        },
        [toggleKeys]
    );
    const groupContext = {
        selectedKeys,
        selectedKeyMap,
        toggleKey,
        toggleKeys,
        multiple,
        subGroupMap
    };
    const toggleAllItems = useCallback(() => {
        const cache = cacheRef.current;
        const { selectedKeys, validKeys, disabledKeys, selectedStatus, multiple } = cache;
        if (!multiple || !validKeys || !disabledKeys) return;
        const newSelectedKeys = getSelectedKeysAfterSelectAll(selectedStatus, selectedKeys, validKeys, disabledKeys);
        onChange(newSelectedKeys, selectedStatus === 'ALL' ? 'NONE' : 'ALL');
    }, [onChange]);
    return [groupContext, selectedStatus, toggleAllItems];
};

/**
 * @param key key of this item
 * @param groupContext context
 * @param selected selected prop from item
 */
const useItem = (key: Key, groupContext: GroupContext, selected = false): [boolean, (selected?: boolean) => void] => {
    const { selectedKeyMap, toggleKey } = groupContext;
    // save toggle to ref for better performance
    const toggleRef = useRef((selected?: boolean) => toggleKey(key, selected));
    useEffect(() => {
        toggleRef.current = (selected?: boolean) => toggleKey(key, selected);
    }, [toggleKey, key]);
    if (selectedKeyMap) {
        selected = !!selectedKeyMap.get(key);
    }
    const toggle = useCallback((selected?: boolean) => toggleRef.current(selected), []);
    return [selected, toggle];
};

/**
 * @param groupContext context from group
 * @param validKeys valid wrapped item keys
 * @param disabledKeys disabled wrapped item keys
 */
const useSubGroup = (key: Key, groupContext: GroupContext): [SelectedStatus, () => void] => {
    const { selectedKeys = [], toggleKeys, multiple, subGroupMap } = groupContext;
    const { validKeys = [], disabledKeys = [] } = subGroupMap?.get(key) || {};

    const selectedStatus: SelectedStatus = useMemo(
        () =>
            multiple
                ? validKeys && disabledKeys && selectedKeys
                    ? getSubSelectedStatus(selectedKeys, validKeys)
                    : 'UNKNOWN'
                : getSubSelectedStatus(selectedKeys, [...validKeys, ...disabledKeys]),
        [selectedKeys, validKeys, disabledKeys, multiple]
    );

    // use ref to reduce toggle rebuild
    const cacheRef = useRef({
        selectedKeys,
        validKeys,
        disabledKeys,
        toggleKeys,
        selectedStatus
    });
    // update cache
    useEffect(() => {
        cacheRef.current = {
            selectedKeys,
            validKeys,
            disabledKeys,
            toggleKeys,
            selectedStatus
        };
    }, [selectedKeys, validKeys, disabledKeys, toggleKeys, selectedStatus]);

    const toggleAllItems = useCallback(() => {
        const cache = cacheRef.current;
        const { validKeys, toggleKeys, selectedStatus } = cache;
        toggleKeys(validKeys, selectedStatus !== 'ALL');
    }, []);

    return [selectedStatus, toggleAllItems];
};

const groupChildrenAsDataSource = (
    children: ReactNode,
    disabled = false,
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
): [Key[], Key[], ReactNode, SubGroupMap, ChildrenMap] => {
    const subGroupMap: SubGroupMap = new Map();
    const childrenMap: ChildrenMap = new Map();
    const group = (children: ReactNode, disabled: boolean, prefix: string): [Key[], Key[], ReactNode] => {
        const validKeys: Key[] = [];
        const disabledKeys: Key[] = [];
        const l = React.Children.count(children);
        const renderChildren: ReactNode = React.Children.map(children, (child, i) => {
            const isFirst = i === 0;
            const isLast = i === l - 1;
            if (React.isValidElement(child)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((child.type as any)?.[itemTag]) {
                    const props = child.props;
                    const key = props[itemKeyName] ?? child.key;
                    const isDisabled = disabled || props.disabled;
                    if (isDisabled) {
                        disabledKeys.push(key);
                    } else {
                        validKeys.push(key);
                    }

                    childrenMap.set(key, props.children);
                    return React.cloneElement(child, {
                        [itemKeyName]: key,
                        disabled: isDisabled,
                        isFirst,
                        isLast
                    });
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
                    // const flatChildren = props.styleType !== 'popover';
                    // if (flatChildren) {
                    //     renderChildren.push(
                    //         <SubMenu {...child.props} disabled={isDisabled} subMenuKey={key} key={`sub-menu-${key}`} />,
                    //         ...subRenderChildren
                    //     );
                    // } else {
                    return React.cloneElement(
                        child,
                        {
                            disabled: isDisabled,
                            [subGroupKeyName]: key,
                            isFirst,
                            isLast
                        },
                        subRenderChildren
                    );
                    // }
                }
                return child;
            }
        });
        return [validKeys, disabledKeys, renderChildren];
    };

    return [...group(children, disabled, 'group-root'), subGroupMap, childrenMap];
};

const groupOptionsAsDataSource = <
    T extends {
        disabled?: boolean;
        key?: Key;
        [key: string]: Key | ReactNode | unknown;
    }
>(
    options: T[],
    disabled = false,
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
        ItemComponent: ComponentType;
        SubGroupComponent: ComponentType;
    } = {
        subGroupName: 'children',
        displayName: 'label',
        itemKeyName: 'itemKey',
        subGroupKeyName: 'subGroupKey',
        ItemComponent: () => null,
        SubGroupComponent: () => null
    }
) => {
    const subGroupMap: SubGroupMap = new Map();
    const childrenMap: ChildrenMap = new Map();
    const group = (options: T[], disabled = false, prefixKey: Key): [Key[], Key[], ReactNode[]] => {
        const validKeys: Key[] = [];
        const disabledKeys: Key[] = [];
        const renderChildren: ReactNode[] = [];
        options.forEach((child, i) => {
            const subChildren = child[subGroupName] as T[];
            if (subChildren) {
                const key = (child[subGroupKeyName] as Key) || child.key || `${prefixKey}-${i}`;
                const isDisabled = disabled || child.disabled;
                const [subValidKeys, subDisabledKeys, subRenderChildren] = group(subChildren, isDisabled, key);
                subGroupMap.set(key, { validKeys: subValidKeys, disabledKeys: subDisabledKeys });
                validKeys.push(...subValidKeys);
                disabledKeys.push(...subDisabledKeys);
                renderChildren.push(
                    <SubGroupComponent key={key} {...child} {...{ disabled: isDisabled, [subGroupKeyName]: key }}>
                        {subRenderChildren}
                    </SubGroupComponent>
                );
            } else {
                const key = (child[itemKeyName] as Key) || child.key || '';
                const isDisabled = disabled || child.disabled;
                if (isDisabled) {
                    disabledKeys.push(key);
                } else {
                    validKeys.push(key);
                }
                const display = (child[displayName] as ReactNode) || key;
                renderChildren.push(
                    <ItemComponent key={key} {...child} {...{ disabled: isDisabled, [itemKeyName]: key }}>
                        {display}
                    </ItemComponent>
                );
                childrenMap.set(key, display);
            }
        });
        return [validKeys, disabledKeys, renderChildren];
    };

    return [...group(options, disabled, 'group-root'), subGroupMap, childrenMap];
};

export { useGroup, useItem, useSubGroup, groupChildrenAsDataSource, groupOptionsAsDataSource };
