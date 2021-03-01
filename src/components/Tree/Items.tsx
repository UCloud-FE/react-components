import React from 'react';

import { Panel } from 'src/components/Collapse';

import { ChangeKeyMap, Group, LoadData, SelectedMap, TreeData } from './interface';
import { ChildItem, TitleItem } from './Item';

/** 项 */
const Items = ({
    children,
    depth,
    ignoreIndent = [],
    disabled,
    multiple,
    onSelect,
    selectedMap,
    group,
    loadData
}: {
    // 数据
    children?: TreeData[];
    // 层级
    depth: number;
    // 无线缩进
    ignoreIndent?: number[];
    // 是否禁用
    disabled: boolean;
    // 是否为多选
    multiple: boolean;
    // 选中回调
    onSelect: (keyMap: ChangeKeyMap) => void;
    // 选中数据
    selectedMap: SelectedMap;
    // 分组数据
    group: Group;
    loadData?: LoadData;
}) => {
    if (!children || !children.length) return null;

    const lastIndex = children.length - 1;

    return (
        <>
            {children.map((item, index) => {
                const isLatest = lastIndex === index;
                const { children, key: value, disabled: itemDisabled, title, isParent } = item;
                const finalDisabled = disabled || !!itemDisabled;

                if (children || isParent) {
                    return (
                        <Panel
                            key={value}
                            title={({ toggle, open }: { toggle: () => void; open: boolean }) => (
                                <TitleItem
                                    value={value}
                                    title={title}
                                    onExpandChange={toggle}
                                    depth={depth}
                                    isLatest={isLatest}
                                    ignoreIndent={ignoreIndent}
                                    expanded={open}
                                    onSelect={onSelect}
                                    multiple={multiple}
                                    selectedMap={selectedMap}
                                    group={group}
                                    disabled={finalDisabled}
                                    loadData={loadData}
                                    loaded={!!children}
                                />
                            )}
                            panelKey={item.key}
                            ignoreUpdateWhenClose
                        >
                            <MemoItems
                                depth={depth + 1}
                                ignoreIndent={isLatest ? ignoreIndent.concat(depth) : ignoreIndent}
                                selectedMap={selectedMap}
                                group={group}
                                onSelect={onSelect}
                                disabled={finalDisabled}
                                multiple={multiple}
                                loadData={loadData}
                            >
                                {children}
                            </MemoItems>
                        </Panel>
                    );
                }
                return (
                    <ChildItem
                        key={value}
                        value={value}
                        title={title}
                        depth={depth}
                        isLatest={isLatest}
                        ignoreIndent={ignoreIndent}
                        onSelect={onSelect}
                        multiple={multiple}
                        selectedMap={selectedMap}
                        disabled={finalDisabled}
                    />
                );
            })}
        </>
    );
};
const MemoItems = React.memo(Items);

export default MemoItems;
