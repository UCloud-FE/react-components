import React, { Key, ReactElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import Tag from 'src/components/Tag';
import useOverflow from 'src/hooks/useOverflow';

import { overflowCls, staticCls } from './style';

let _uid = 0;
const ID_KEY = 'data-urc-select_overflow-id';

export const Static = function Static<T extends { key: Key }>({
    items,
    renderItem,
    renderRest,
    count,
    ...rest
}: {
    items: T[];
    renderItem: (item: T) => ReactElement;
    renderRest: (items: T[]) => ReactElement | null;
    count: number;
}) {
    const renderItems = useMemo(() => items.slice(0, count).map(renderItem), [count, items, renderItem]);
    const restItems = useMemo(() => renderRest(items.slice(count)), [count, items, renderRest]);

    return (
        <Tag.Group {...rest} className={overflowCls + ' ' + staticCls}>
            {renderItems}
            {restItems}
        </Tag.Group>
    );
};
const Overflow = function Overflow<T extends { key: Key }>({
    items,
    renderItem,
    renderRest,
    onMeasure,
    changeContent,
    ...rest
}: {
    items: T[];
    renderItem: (item: T) => ReactElement;
    renderRest: (items: T[]) => ReactElement | null;
    onMeasure: (count: number) => void;
    changeContent: string;
}) {
    const [uid] = useState(() => ++_uid);
    const l = items.length;
    const containerRef = useRef<HTMLElement | null>(null);
    useLayoutEffect(() => {
        containerRef.current = document.querySelector(`[${ID_KEY}="${uid}"]`) as HTMLElement;
    }, [uid]);
    const [count, measureCount] = useOverflow(
        {
            containerRef,
            defaultCount: 1,
            maxCount: l
        },
        [changeContent]
    );

    useEffect(() => {
        onMeasure(measureCount);
    }, [measureCount, onMeasure]);

    const renderItems = useMemo(() => items.slice(0, count).map(renderItem), [count, items, renderItem]);
    const restItems = useMemo(() => renderRest(items.slice(count)), [count, items, renderRest]);

    return (
        <Tag.Group {...rest} {...{ [ID_KEY]: uid }} className={overflowCls}>
            {renderItems}
            {restItems}
        </Tag.Group>
    );
};

export default Overflow;
