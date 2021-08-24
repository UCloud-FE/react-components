import { Context, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

export type V = number | string;
export type ValueMap = Map<V, boolean>;
export interface SelectableContext {
    valueMap?: ValueMap;
    toggleSelect: (v: V) => void;
    addItem: () => void;
    removeItem: () => void;
}
export type SelectedStatus = 'NONE' | 'ALL' | 'PART';

const formatValue = (value: V[]): V[] => {
    return Array.isArray(value) ? value : [];
};

const useGroup = (value: V[], onChange: (v: V[], selectedStatus: SelectedStatus) => void) => {
    const valueMap = useMemo(() => {
        const m: ValueMap = new Map();
        formatValue(value).forEach(v => m.set(v, true));
        return m;
    }, [value]);
    const itemCountRef = useRef(0);
    const addItem = useCallback(() => {
        itemCountRef.current++;
    }, []);
    const removeItem = useCallback(() => {
        itemCountRef.current--;
    }, []);
    const toggleSelect = useCallback(
        (v: V) => {
            let newValue: V[];
            if (valueMap.get(v)) {
                newValue = formatValue(value).filter(_v => _v !== v);
            } else {
                newValue = formatValue(value).concat(v);
            }
            const selectedStatus =
                newValue.length === 0 ? 'NONE' : newValue.length >= itemCountRef.current ? 'ALL' : 'PART';

            onChange(newValue, selectedStatus);
        },
        [onChange, value, valueMap]
    );
    return {
        valueMap,
        toggleSelect,
        addItem,
        removeItem
    };
};

const useItem = <T extends SelectableContext>(value: V, checked: boolean, context: Context<T>) => {
    const { valueMap, toggleSelect, addItem, removeItem, ...restContext } = useContext(context);
    // save toggle for better performance
    const toggleRef = useRef(toggleSelect);
    useEffect(() => {
        toggleRef.current = toggleSelect;
    }, [toggleSelect]);
    if (valueMap) {
        checked = !!valueMap.get(value);
    }
    const toggle = useCallback((v: V) => toggleRef.current(v), []);
    useEffect(() => {
        addItem();
        return () => {
            removeItem();
        };
    }, [addItem, removeItem]);
    return {
        checked,
        toggle,
        restContext
    };
};

export { useGroup, useItem };
