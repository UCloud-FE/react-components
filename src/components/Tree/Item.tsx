import React, { ReactNode, useCallback, useState, MouseEvent } from 'react';
import classnames from 'classnames';

import SvgIcon from 'src/components/SvgIcon';
import Checkbox from 'src/components/Checkbox';

import {
    expandCls,
    disabledCls,
    contentCls,
    itemCls,
    indentCls,
    outerIndentCls,
    innerIndentCls,
    wrapCls,
    latestCls,
    expandedCls,
    expandPlaceholderCls,
    selectedCls,
    loadingIconCls
} from './style';
import { ChangeKeyMap, Group, SelectedMap, Key, LoadData } from './interface';
import { getSelectedStatus } from './util';

/** 展开 icon */
const ExpandIcon = ({ expanded }: { expanded?: boolean }) => {
    return <span className={classnames(expandCls, expanded && expandedCls)}></span>;
};
const MemoExpandIcon = React.memo(ExpandIcon);

/** 单缩进 */
const Indent = ({ ignore, latest }: { ignore?: boolean; latest?: boolean }) => {
    return (
        <span className={classnames(indentCls, ignore ? outerIndentCls : innerIndentCls, latest && latestCls)}></span>
    );
};
const MemoIndent = React.memo(Indent);

/** 缩进 */
const Indents = ({ depth, ignoreIndent, isLatest }: { depth: number; ignoreIndent?: number[]; isLatest?: boolean }) => {
    return (
        <>
            {new Array(depth).fill(null).map((v, i) => (
                <MemoIndent key={i} ignore={ignoreIndent?.includes(i + 1)} latest={isLatest && i === depth - 1} />
            ))}
        </>
    );
};
const MemoIndents = React.memo(Indents);

const stopPropagation = (e: Event | MouseEvent) => {
    e.stopPropagation();
};

export interface SharedItemProps {
    // 标题
    title: ReactNode;
    // 是否禁用
    disabled?: boolean;
    // 层级
    depth: number;
    // 是否为最后一个
    isLatest?: boolean;
    // 是否为多选
    multiple?: boolean;
}

/** 单项 ui */
const ItemView = ({
    title,
    disabled,
    expandAble,
    expanded,
    onExpandChange,
    multiple,
    selected,
    indeterminate,
    onSelect,
    depth,
    isLatest,
    ignoreIndent,
    loading,
    value
}: {
    // 是否可展开
    expandAble?: boolean;
    // 是否展开
    expanded?: boolean;
    // 切换展开
    onExpandChange?: (expanded: boolean) => void;
    // 选中状态
    selected?: boolean;
    // 全选状态
    indeterminate?: boolean;
    // 选中回调
    onSelect?: (checked: boolean) => void;
    // 忽略的层级
    ignoreIndent?: string;
    // 加载中
    loading?: boolean;
    value: Key;
} & SharedItemProps) => {
    const onBodyClick = useCallback(
        e => {
            if (loading) {
                return;
            }
            if (expandAble) {
                onExpandChange?.(!expanded);
                return;
            }
            if (!disabled && !multiple) {
                onSelect?.(true);
            }
        },
        [disabled, expandAble, expanded, multiple, onExpandChange, onSelect, loading]
    );

    const finalIgnoreIndent = ignoreIndent ? (JSON.parse(ignoreIndent) as number[]) : [];

    return (
        <div
            className={classnames(itemCls, !expandAble && selected && selectedCls, disabled && disabledCls)}
            onClick={onBodyClick}
            data-tree-item-value={value}
        >
            <MemoIndents depth={depth} ignoreIndent={finalIgnoreIndent} isLatest={isLatest} />
            <div className={wrapCls}>
                {loading ? (
                    <SvgIcon type="ring-loading" spin className={loadingIconCls} />
                ) : expandAble ? (
                    <MemoExpandIcon expanded={expanded} />
                ) : (
                    <span className={expandPlaceholderCls}></span>
                )}
                {multiple && (
                    <Checkbox
                        disabled={disabled}
                        checked={selected}
                        indeterminate={indeterminate}
                        onClick={stopPropagation}
                        onChange={onSelect}
                    />
                )}
                <span className={contentCls}>{title}</span>
            </div>
        </div>
    );
};

const MemoItemView = React.memo(ItemView);

// 项
const ChildItem = ({
    value,
    onSelect,
    ignoreIndent,
    selectedMap,
    ...rest
}: {
    value: Key;
    onSelect: (keyMap: ChangeKeyMap) => void;
    ignoreIndent: number[];
    selectedMap: SelectedMap;
} & SharedItemProps) => {
    const checked = selectedMap[value];
    const onCheckChange = useCallback(
        checked => {
            onSelect({ [value]: checked });
        },
        [value, onSelect]
    );

    return (
        <MemoItemView
            selected={checked}
            onSelect={onCheckChange}
            ignoreIndent={JSON.stringify(ignoreIndent)}
            value={value}
            {...rest}
        />
    );
};

const MemoChildItem = React.memo(ChildItem);

// 标题项
const TitleItem = ({
    value,
    onSelect,
    ignoreIndent,
    selectedMap,
    group,
    onExpandChange,
    loadData,
    loaded,
    ...rest
}: {
    value: Key;
    onSelect: (keyMap: ChangeKeyMap) => void;
    expanded?: boolean;
    onExpandChange?: (expanded: boolean) => void;
    ignoreIndent: number[];
    selectedMap: SelectedMap;
    group: Group;
    loadData?: LoadData;
    loaded?: boolean;
} & SharedItemProps) => {
    const { keys: values, disabledKeys: disabledValues } = group[value] || {};
    const selectedStatus = getSelectedStatus(values, selectedMap, disabledValues);
    const [loading, setLoading] = useState(false);
    const onCheckChange = useCallback(
        checked => {
            const selectedMap: ChangeKeyMap = {};
            values?.forEach(v => {
                selectedMap[v] = checked;
            });
            onSelect(selectedMap);
        },
        [values, onSelect]
    );
    const checkProps =
        selectedStatus === 'NONE'
            ? { selected: false }
            : selectedStatus === 'ALL'
            ? { selected: true }
            : { indeterminate: true, selected: false };
    const onExpandHandler = useCallback(
        async (expanded: boolean) => {
            if (expanded && loadData && !loaded) {
                setLoading(true);
                await loadData(value);
                setLoading(false);
            }
            onExpandChange?.(expanded);
        },
        [loadData, onExpandChange, value, loaded]
    );
    return (
        <MemoItemView
            {...checkProps}
            onSelect={onCheckChange}
            expandAble
            ignoreIndent={JSON.stringify(ignoreIndent)}
            onExpandChange={onExpandHandler}
            loading={loading}
            value={value}
            {...rest}
        />
    );
};
const MemoTitleItem = React.memo(TitleItem);

export { MemoChildItem as ChildItem, MemoTitleItem as TitleItem };
