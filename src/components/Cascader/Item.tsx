import React, { ReactNode, useCallback, useContext, useMemo } from 'react';
import classnames from 'classnames';

import { attrs } from 'src/utils/attrs';
import SvgIcon from 'src/components/SvgIcon';

import { CascadeData, Key } from './interface';
import { expandedAttr, iconCls, itemCls, selectedAttr, titleCls, valueAttr } from './style/cascade';
import CascadeContext from './CascadeContext';

export interface ItemProps {
    expandAble?: boolean;
    expanded?: boolean;
    selected?: boolean;
    loading?: boolean;
    value: Key;
    title: ReactNode;
    disabled?: boolean;
    parents?: CascadeData[];
}

const Item = ({ title, value, expandAble, expanded, selected, disabled, parents }: ItemProps) => {
    const attributes = useMemo(
        () =>
            attrs({
                [expandedAttr]: expanded,
                [selectedAttr]: selected,
                [valueAttr]: value,
                disabled
            }),
        [disabled, expanded, selected, value]
    );
    const { expandItem, selectItem } = useContext(CascadeContext);
    const handleClick = useCallback(() => {
        if (disabled) return;
        const parentKeys = parents?.map(parent => parent.key) || [];
        expandAble ? expandItem([...parentKeys, value]) : selectItem([...parentKeys, value]);
    }, [disabled, expandAble, expandItem, parents, selectItem, value]);
    return (
        <div
            className={classnames(itemCls)}
            onClick={handleClick}
            title={typeof title === 'string' ? title : ''}
            {...attributes}
        >
            <div className={titleCls}>{title}</div>
            {expandAble && <SvgIcon type="arrow-right" className={iconCls} />}
        </div>
    );
};

export default React.memo(Item);
