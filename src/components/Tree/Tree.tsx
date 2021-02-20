import React, { useState, useEffect, useCallback, useRef, Ref, useImperativeHandle } from 'react';
import classnames from 'classnames';

import Collapse from 'src/components/Collapse';
import withUncontrolled from 'src/decorators/uncontrolled';

import Items from './Items';
import { multipleCls, prefixCls, singleCls, STree } from './style';
import { Group, SelectedMap, Value, TreeData } from './interface';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const groupDataSource = (dataSource: TreeData[]): [Group, Value[], Value[]] => {
    const group: Group = {};
    const allValues: Value[] = [];
    const allDisabledValues: Value[] = [];
    const _groupData = (children: TreeData[], disabled?: boolean): [Value[], Value[]] => {
        let values: Value[] = [];
        let disabledValues: Value[] = [];
        children.forEach(child => {
            const { value, disabled: _disabled, children } = child;
            const finalDisabled = disabled || _disabled;
            if (children && children.length) {
                const [_values, _disabledValues] = _groupData(children, finalDisabled);
                group[value] = {
                    values: _values,
                    disabledValues: _disabledValues
                };
                values = values.concat(_values);
                disabledValues = disabledValues.concat(_disabledValues);
            } else {
                if (finalDisabled) {
                    disabledValues.push(value);
                    allDisabledValues.push(value);
                } else {
                    values.push(value);
                    allValues.push(value);
                }
            }
        });
        return [values, disabledValues];
    };
    _groupData(dataSource);
    return [group, allValues, allDisabledValues];
};

const keysToMap = (keys: Value[] = []): SelectedMap => {
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
        selectedKeys?: Value[];
        /** 默认选中的数据 uncontrolled */
        defaultSelectedKeys?: Value[];
        /** 选中变化回调 */
        onChange: (v: Value[]) => void;
        /** collapse 的配置，查看 collapse 组件 */
        collapse: CollapseProps;
    },
    ref: Ref<{ selectAll: () => void; unSelectAll: () => void; inverse: () => void }>
) => {
    const { dataSource, disabled = false, multiple = false, selectedKeys, onChange = noop, collapse } = props;
    const [[group, allValues, allDisabledValues], setGroup] = useState(() => groupDataSource(dataSource));
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
                    const disabledSelectedValues: Value[] = [];
                    allDisabledValues.forEach(v => {
                        if (selectedMap[v]) disabledSelectedValues.push(v);
                    });
                    const value = [...allValues, ...disabledSelectedValues];
                    onChange(value);
                },
                /**
                 * 全部取消选择
                 * @public
                 */
                unSelectAll: () => {
                    const disabledSelectedValues: Value[] = [];
                    allDisabledValues.forEach(v => {
                        if (selectedMap[v]) disabledSelectedValues.push(v);
                    });
                    onChange([...disabledSelectedValues]);
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
                    const disabledSelectedValues: Value[] = [];
                    allDisabledValues.forEach(v => {
                        if (selectedMap[v]) disabledSelectedValues.push(v);
                    });
                    const value: Value[] = [...disabledSelectedValues];
                    allValues.forEach(v => {
                        if (!selectedMap[v]) {
                            value.push(v);
                        }
                    });
                    onChange(value);
                }
            };
        },
        [multiple, allValues, allDisabledValues, onChange, selectedMap]
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
        },
        [multiple, onChange]
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

export default withUncontrolled({ valueName: 'selectedKeys' })(React.memo(React.forwardRef(Tree)));
