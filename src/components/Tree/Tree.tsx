import React, { useState, useEffect, useCallback, useRef, Ref, useImperativeHandle } from 'react';
import classnames from 'classnames';

import Collapse from 'src/components/Collapse';

import Items from './Items';
import { multipleCls, prefixCls, singleCls, STree } from './style';
import { Group, SelectedMap, Value, TreeData } from './interface';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const groupDataSource = (dataSource: TreeData[]): [Group, Value[]] => {
    const group: Group = {};
    const allValue: Value[] = [];
    const _groupData = (children: TreeData[]): Value[] => {
        let result: Value[] = [];
        children.forEach(child => {
            const { value, children } = child;
            if (children && children.length) {
                const values = _groupData(children);
                group[value] = values;
                result = result.concat(values);
            } else {
                result.push(value);
                allValue.push(value);
            }
        });
        return result;
    };
    _groupData(dataSource);
    return [group, allValue];
};

const keysToMap = (keys: Value[] = []): SelectedMap => {
    const result: SelectedMap = {};
    keys.forEach(key => {
        result[key] = true;
    });
    return result;
};

const Tree = (
    props: {
        /** 数据源 */
        dataSource: TreeData[];
        /** 是否禁用 */
        disabled?: boolean;
        /** 是否支持多选 */
        multiple?: boolean;
        /** 选中的数据 controlled */
        selectedKeys?: Value[];
        /** 默认选中的数据 uncontrolled */
        defaultSelectedKeys?: Value[];
        /** 选中变化回调 */
        onChange: (v: Value[]) => void;
        /** collapse 的配置，查看 collapse 组件 */
        collapse: Record<string, unknown>;
    },
    ref: Ref<{ selectAll: () => void; unSelectAll: () => void; inverse: () => void }>
) => {
    const {
        dataSource,
        disabled = false,
        multiple = false,
        selectedKeys,
        defaultSelectedKeys = [],
        onChange = noop,
        collapse
    } = props;
    const [selectedKeysS, setSelectedKeysS] = useState(defaultSelectedKeys);
    const [isControlled] = useState(() => selectedKeys !== undefined);
    const [[group, allValue], setGroup] = useState(() => groupDataSource(dataSource));
    const finalSelectedKeys = isControlled ? selectedKeys : selectedKeysS;
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
                    const value = [...allValue];
                    onChange(value);
                    if (!isControlled) setSelectedKeysS(value);
                },
                /**
                 * 全部取消选择
                 * @public
                 */
                unSelectAll: () => {
                    onChange([]);
                    if (!isControlled) setSelectedKeysS([]);
                },
                /**
                 * 反选
                 * @public
                 */
                inverse: () => {
                    const value: Value[] = [];
                    allValue.forEach(v => {
                        if (!selectedMap[v]) {
                            value.push(v);
                        }
                    });
                    onChange(value);
                    if (!isControlled) setSelectedKeysS(value);
                }
            };
        },
        [allValue, isControlled, onChange, selectedMap]
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
                selectedKeys = Object.keys(clonedMap) as Value[];
            } else {
                for (const key in _selectedMap) {
                    const v = _selectedMap[key];
                    if (v) {
                        selectedKeys = [key] as Value[];
                        break;
                    }
                }
                if (!selectedKeys) return;
            }

            onChange(selectedKeys);
            if (!isControlled) setSelectedKeysS(selectedKeys);
        },
        [isControlled, multiple, onChange]
    );

    return (
        <Collapse {...collapse} component={STree} className={classnames(prefixCls, multiple ? multipleCls : singleCls)}>
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

export default React.memo(React.forwardRef(Tree));
