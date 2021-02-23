import React, { useState, useEffect, useCallback, useRef, Ref, useImperativeHandle } from 'react';
import classnames from 'classnames';

import Collapse from 'src/components/Collapse';
import withUncontrolled from 'src/decorators/uncontrolled';

import Items from './Items';
import { multipleCls, prefixCls, singleCls, STree } from './style';
import { Group, SelectedMap, Key, TreeData } from './interface';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

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

type CollapseProps = Record<string, unknown>;

const Tree = (
    props: {
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
        onChange: (v: Key[]) => void;
        /** collapse 的配置，查看 collapse 组件 */
        collapseProps: CollapseProps;
    },
    ref: Ref<{ selectAll: () => void; unSelectAll: () => void; inverse: () => void }>
) => {
    const { dataSource, disabled = false, multiple = false, selectedKeys, onChange = noop, collapseProps } = props;
    const [[group, allKeys, allDisabledKeys], setGroup] = useState(() => groupDataSource(dataSource));
    const finalSelectedKeys = selectedKeys;
    const [selectedMap, setSelectedMap] = useState(() => keysToMap(finalSelectedKeys));

    const stateRef = useRef({ selectedMap, finalSelectedKeys });

    useEffect(() => {
        setGroup(groupDataSource(dataSource));
    }, [dataSource]);

    useEffect(() => {
        const selectedMap = keysToMap(finalSelectedKeys);
        stateRef.current = { selectedMap, finalSelectedKeys };
        setSelectedMap(selectedMap);
    }, [finalSelectedKeys]);

    useImperativeHandle(
        ref,
        () => {
            return {
                /**
                 * 全选
                 * @public
                 */
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
                    onChange(selectedKeys);
                },
                /**
                 * 全部取消选择
                 * @public
                 */
                unSelectAll: () => {
                    const disabledSelectedKeys: Key[] = [];
                    allDisabledKeys.forEach(v => {
                        if (selectedMap[v]) disabledSelectedKeys.push(v);
                    });
                    onChange([...disabledSelectedKeys]);
                },
                /**
                 * 反选
                 * @public
                 */
                inverse: () => {
                    if (!multiple) {
                        console.error(`Can't call selectAll for single select Tree`);
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
                    onChange(selectedKeys);
                }
            };
        },
        [multiple, allKeys, allDisabledKeys, onChange, selectedMap]
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

            onChange(selectedKeys);
        },
        [multiple, onChange]
    );

    return (
        <Collapse
            {...collapseProps}
            component={STree}
            className={classnames(prefixCls, multiple ? multipleCls : singleCls)}
        >
            <Items
                depth={0}
                disabled={disabled}
                multiple={multiple}
                onSelect={onSelect}
                group={group}
                selectedMap={selectedMap}
            >
                {dataSource}
            </Items>
        </Collapse>
    );
};

export default withUncontrolled({ valueName: 'selectedKeys' })(React.memo(React.forwardRef(Tree)));
