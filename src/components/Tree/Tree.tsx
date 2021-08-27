/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Ref, useState, useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from 'react';
import classnames from 'classnames';

import { CollapseProps, useCollapse } from 'src/components/Collapse/hooks';
import CollapseContext from 'src/components/Collapse/CollapseContext';
import useUncontrolled from 'src/hooks/useUncontrolled';
import Search, { Highlight } from 'src/sharedComponents/Search';
import noop from 'src/utils/noop';
import each from 'src/utils/each';

import Items from './Items';
import { multipleCls, prefixCls, singleCls, STree } from './style';
import { Group, SelectedMap, Key, TreeData, LoadData } from './interface';

const groupDataSource = (dataSource: TreeData[]): [Group, Key[], Key[]] => {
    const group: Group = {};
    const allKeys: Key[] = [];
    const allDisabledKeys: Key[] = [];
    const _groupData = (children: TreeData[], disabled?: boolean): [Key[], Key[]] => {
        let keys: Key[] = [];
        let disabledKeys: Key[] = [];
        children.forEach(child => {
            const { key, disabled: _disabled, children } = child;
            const finalDisabled = disabled || _disabled;
            if (children && children.length) {
                const [_keys, _disabledKeys] = _groupData(children, finalDisabled);
                group[key] = {
                    keys: _keys,
                    disabledKeys: _disabledKeys
                };
                keys = keys.concat(_keys);
                disabledKeys = disabledKeys.concat(_disabledKeys);
            } else {
                if (finalDisabled) {
                    disabledKeys.push(key);
                    allDisabledKeys.push(key);
                } else {
                    keys.push(key);
                    allKeys.push(key);
                }
            }
        });
        return [keys, disabledKeys];
    };
    _groupData(dataSource);
    return [group, allKeys, allDisabledKeys];
};

const keysToMap = (keys: Key[] = []): SelectedMap => {
    const result: SelectedMap = {};
    keys.forEach(key => {
        result[key] = true;
    });
    return result;
};

export interface TreeProps {
    /** 数据源 */
    dataSource: TreeData[];
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 选中的数据 controlled */
    selectedKeys?: Key[];
    /** 默认选中的数据 uncontrolled */
    defaultSelectedKeys?: Key[];
    /** 选中变化回调 */
    onChange?: (v: Key[]) => void;
    /** 异步加载数据操作 */
    loadData?: LoadData;
    /** collapse 的配置，参考 collapse 组件 */
    collapseProps?: CollapseProps;
    /** 使用搜索 */
    search?:
        | true
        | {
              /** 自定义搜索函数 */
              handleSearch?: (
                  searchValue: string,
                  dataSource: TreeData[]
              ) => {
                  dataSource: TreeData[];
                  count: number;
                  openKeys: Key[];
              };
          };
}

export type TreeRef = {
    /**
     * 全选
     * @public
     */
    selectAll: () => void;
    /**
     * 全部取消选择
     * @public
     */
    unSelectAll: () => void;
    /**
     * 反选
     * @public
     */
    inverse: () => void;
};

const defaultSearchHandle = (searchValue: string, dataSource: TreeData[]) => {
    if (!searchValue) return { dataSource, count: null };
    let count = 0;
    const finalExpandedKeyMap: Record<Key, 1> = {};
    const handle = (children: TreeData[]): [TreeData[], boolean] => {
        let childrenHit = false;
        const newChildren: TreeData[] = [];
        children.forEach(child => {
            const { title, key, children } = child;
            const override: Partial<TreeData> = {};
            let searchHit = false;
            if (typeof title === 'string') {
                const index = title.indexOf(searchValue);
                searchHit = index >= 0;
                if (searchHit) {
                    count++;
                    const beforeStr = title.substr(0, index);
                    const afterStr = title.substr(index + searchValue.length);
                    override.title = (
                        <>
                            {beforeStr}
                            <Highlight>{searchValue}</Highlight>
                            {afterStr}
                        </>
                    );
                }
            }
            if (children) {
                const [_children, _searchHit] = handle(children);
                override.children = _children;
                searchHit = _searchHit || searchHit;
                if (_searchHit) finalExpandedKeyMap[key] = 1;
            }
            if (searchHit) {
                childrenHit = true;
                newChildren.push({ ...child, ...override });
            }
        });
        return [newChildren, childrenHit];
    };
    const dataSourceAfterSearch = handle(dataSource)[0];
    return {
        dataSource: dataSourceAfterSearch,
        count,
        openKeys: Object.keys(finalExpandedKeyMap)
    };
};

const CommonTree = forwardRef(
    (
        {
            dataSource = [],
            disabled = false,
            multiple = false,
            selectedKeys: _selectedKeys,
            defaultSelectedKeys,
            onChange: _onChange = noop,
            onDiff,
            loadData,
            collapseProps
        }: TreeProps & {
            onDiff?: (diffData: { select: Key[]; unselect: Key[] }) => void;
        },
        ref: Ref<TreeRef>
    ) => {
        const [[group, allKeys, allDisabledKeys], setGroup] = useState(() => groupDataSource(dataSource));
        const [selectedKeys, onChange] = useUncontrolled(_selectedKeys, defaultSelectedKeys || [], _onChange);
        const [selectedMap, setSelectedMap] = useState(() => keysToMap(selectedKeys));
        const stateRef = useRef({ selectedMap, selectedKeys });

        const handleDiff = useCallback(
            newSelectedKeys => {
                if (!onDiff) return;
                const selectKeys = [];
                const unselectKeys = [];
                const newSelectedMap = keysToMap(newSelectedKeys);
                const allMap = keysToMap(allKeys);
                for (const newKey in newSelectedMap) {
                    // don't in dataSource, ignore
                    if (!(newKey in allMap)) continue;
                    if (!(newKey in selectedMap)) {
                        selectKeys.push(newKey);
                    }
                }
                for (const oldKey in selectedMap) {
                    // don't in dataSource, ignore
                    if (!(oldKey in allMap)) continue;
                    if (!(oldKey in newSelectedMap)) {
                        unselectKeys.push(oldKey);
                    }
                }

                onDiff({
                    select: selectKeys,
                    unselect: unselectKeys
                });
            },
            [allKeys, onDiff, selectedMap]
        );

        const finalOnChange = useCallback(
            selectedKeys => {
                onChange(selectedKeys);
                handleDiff(selectedKeys);
            },
            [handleDiff, onChange]
        );

        useEffect(() => {
            setGroup(groupDataSource(dataSource));
        }, [dataSource]);

        useEffect(() => {
            const selectedMap = keysToMap(selectedKeys);
            stateRef.current = { selectedMap, selectedKeys };
            setSelectedMap(selectedMap);
        }, [selectedKeys]);

        useImperativeHandle(
            ref,
            () => {
                return {
                    selectAll: () => {
                        if (!multiple) {
                            console.error(`Can't call selectAll for single select Tree`);
                            return;
                        }
                        const disabledSelectedKeys: Key[] = [];
                        allDisabledKeys.forEach(v => {
                            if (selectedMap[v]) disabledSelectedKeys.push(v);
                        });
                        const selectedKeys = [...allKeys, ...disabledSelectedKeys];
                        finalOnChange(selectedKeys);
                    },
                    unSelectAll: () => {
                        const disabledSelectedKeys: Key[] = [];
                        allDisabledKeys.forEach(v => {
                            if (selectedMap[v]) disabledSelectedKeys.push(v);
                        });
                        finalOnChange([...disabledSelectedKeys]);
                    },
                    inverse: () => {
                        if (!multiple) {
                            console.error(`Can't call inverse for single select Tree`);
                            return;
                        }
                        const disabledSelectedKeys: Key[] = [];
                        allDisabledKeys.forEach(v => {
                            if (selectedMap[v]) disabledSelectedKeys.push(v);
                        });
                        const selectedKeys: Key[] = [...disabledSelectedKeys];
                        allKeys.forEach(v => {
                            if (!selectedMap[v]) {
                                selectedKeys.push(v);
                            }
                        });
                        finalOnChange(selectedKeys);
                    }
                };
            },
            [multiple, allDisabledKeys, allKeys, finalOnChange, selectedMap]
        );

        const onSelect = useCallback(
            _selectedMap => {
                let selectedKeys;
                if (multiple) {
                    const { selectedMap } = stateRef.current;
                    const clonedMap = { ...selectedMap };
                    for (const key in _selectedMap) {
                        const v = _selectedMap[key];
                        if (v) {
                            clonedMap[key] = true;
                        } else {
                            delete clonedMap[key];
                        }
                    }
                    selectedKeys = Object.keys(clonedMap) as Key[];
                } else {
                    for (const key in _selectedMap) {
                        const v = _selectedMap[key];
                        if (v) {
                            selectedKeys = [key] as Key[];
                            break;
                        }
                    }
                    if (!selectedKeys) return;
                }

                finalOnChange(selectedKeys);
            },
            [finalOnChange, multiple]
        );

        const [collapseContext] = useCollapse(collapseProps || {});

        return (
            <CollapseContext.Provider value={collapseContext}>
                <STree disabled={disabled} className={classnames(prefixCls, multiple ? multipleCls : singleCls)}>
                    <Items
                        depth={0}
                        disabled={disabled}
                        multiple={multiple}
                        onSelect={onSelect}
                        group={group}
                        selectedMap={selectedMap}
                        loadData={loadData}
                    >
                        {dataSource}
                    </Items>
                </STree>
            </CollapseContext.Provider>
        );
    }
);

const SearchTree = forwardRef(
    (
        {
            dataSource,
            search,
            collapseProps,
            selectedKeys: _selectedKeys,
            onChange: _onChange,
            defaultSelectedKeys,
            ...rest
        }: TreeProps,
        ref: Ref<TreeRef>
    ) => {
        const [dataSourceAfterSearch, setDataSourceAfterSearch] = useState(dataSource);
        const [searchValue, setSearchValue] = useState('');
        const [loading, setLoading] = useState(false);
        const [count, setCount] = useState<number | null>(null);
        const [empty, setEmpty] = useState(false);
        const [selectedKeys, onChange] = useUncontrolled(_selectedKeys, defaultSelectedKeys || [], _onChange);
        const { openKeys: _openKeys, defaultOpenKeys, onChange: _onOpenKeysChange, ...restCollapseProps } =
            collapseProps || {};
        const [openKeys, onOpenKeysChange] = useUncontrolled(_openKeys, defaultOpenKeys || [], _onOpenKeysChange);
        const handleSearch = useCallback((searchValue: string) => {
            setSearchValue(searchValue);
        }, []);
        const handleDiff = useCallback(
            ({ select, unselect }: { select: Key[]; unselect: Key[] }) => {
                const newSelectedKeysMap = keysToMap(selectedKeys);
                each(select, item => (newSelectedKeysMap[item] = true));
                each(unselect, item => delete newSelectedKeysMap[item]);
                onChange(Object.keys(newSelectedKeysMap));
            },
            [onChange, selectedKeys]
        );
        useEffect(() => {
            let exited = false;
            (async () => {
                if (!searchValue) {
                    setDataSourceAfterSearch(dataSource);
                    setCount(null);
                    setEmpty(false);
                    setLoading(false);
                    return;
                }
                const handler =
                    typeof search === 'object' && search.handleSearch ? search.handleSearch : defaultSearchHandle;
                setLoading(true);
                const { dataSource: dataSourceAfterSearch, count, openKeys } = await handler(searchValue, dataSource);
                // 中断未完成的操作
                if (exited) return;
                setLoading(false);
                setDataSourceAfterSearch(dataSourceAfterSearch);
                setCount(count);
                setEmpty(count === 0);
                if (openKeys) {
                    onOpenKeysChange(openKeys);
                }
            })();
            return () => {
                exited = true;
            };
            // don't update search result when onOpenKeysChange change
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dataSource, search, searchValue]);

        return (
            <Search onSearch={handleSearch} empty={empty} count={count} loading={loading}>
                <CommonTree
                    dataSource={dataSourceAfterSearch}
                    collapseProps={{
                        ...restCollapseProps,
                        openKeys,
                        onChange: onOpenKeysChange
                    }}
                    selectedKeys={selectedKeys}
                    onDiff={handleDiff}
                    ref={ref}
                    {...rest}
                />
            </Search>
        );
    }
);

const Tree = forwardRef(({ search, ...rest }: TreeProps, ref: Ref<TreeRef>) => {
    // force delete onDiff to avoid developer use onDiff
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (rest as any)['onDiff'];
    if (search) {
        return <SearchTree search={search} {...rest} ref={ref} />;
    } else {
        return <CommonTree {...rest} ref={ref} />;
    }
});

export default React.memo(Tree);
