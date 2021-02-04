import React, { ReactNode, useCallback } from 'react';
import classnames from 'classnames';

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
    selectedCls
} from './style';
import { ChangeValueMap, Group, SelectedMap, Value } from './interface';
import { getSelectedStatus } from './util';

/** 展开 icon */
const ExpandIcon = ({
    disabled,
    expanded,
    onChange
}: {
    disabled?: boolean;
    expanded?: boolean;
    onChange?: (expanded: boolean) => void;
}) => {
    const onClick = useCallback(() => {
        onChange?.(!expanded);
    }, [expanded, onChange]);
    return (
        <span
            onClick={disabled ? undefined : onClick}
            className={classnames(expandCls, disabled && disabledCls, expanded && expandedCls)}
        >
            ▶
        </span>
    );
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
    ignoreIndent
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
} & SharedItemProps) => {
    const onBodyClick = useCallback(
        e => {
            stopPropagation(e);
            if (disabled) return;
            expandAble ? onExpandChange?.(!expanded) : multiple ? null : onSelect?.(true);
        },
        [disabled, expandAble, expanded, multiple, onExpandChange, onSelect]
    );

    const finalIgnoreIndent = ignoreIndent ? (JSON.parse(ignoreIndent) as number[]) : [];

    return (
        <div
            className={classnames(itemCls, !expandAble && selected && selectedCls, disabled && disabledCls)}
            onClick={onBodyClick}
        >
            <MemoIndents depth={depth} ignoreIndent={finalIgnoreIndent} isLatest={isLatest} />
            <div className={wrapCls}>
                {expandAble ? (
                    <MemoExpandIcon disabled={disabled} expanded={expanded} />
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
    value: Value;
    onSelect: (valueMap: ChangeValueMap) => void;
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
    ...rest
}: {
    value: Value;
    onSelect: (valueMap: ChangeValueMap) => void;
    expanded?: boolean;
    onExpandChange?: (expanded: boolean) => void;
    ignoreIndent: number[];
    selectedMap: SelectedMap;
    group: Group;
} & SharedItemProps) => {
    const selectedStatus = getSelectedStatus(group[value], selectedMap);
    const onCheckChange = useCallback(
        checked => {
            const values = group[value];
            const selectedMap: ChangeValueMap = {};
            values.forEach(v => {
                selectedMap[v] = checked;
            });
            onSelect(selectedMap);
        },
        [group, value, onSelect]
    );
    const checkProps =
        selectedStatus === 'NONE'
            ? { selected: false }
            : selectedStatus === 'ALL'
            ? { selected: true }
            : { indeterminate: true, selected: false };

    return (
        <MemoItemView
            {...checkProps}
            onSelect={onCheckChange}
            expandAble
            ignoreIndent={JSON.stringify(ignoreIndent)}
            {...rest}
        />
    );
};
const MemoTitleItem = React.memo(TitleItem);

export { MemoChildItem as ChildItem, MemoTitleItem as TitleItem };
