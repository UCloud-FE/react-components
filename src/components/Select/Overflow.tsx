import React, { Key, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import Tag from 'src/components/Tag';

import { overflowCls } from './style';

let _uid = 0;

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
        <Tag.Group {...rest} className={overflowCls}>
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
    ...rest
}: {
    items: T[];
    renderItem: (item: T) => ReactElement;
    renderRest: (items: T[]) => ReactElement | null;
    onMeasure: (count: number) => void;
}) {
    const [uid] = useState(() => ++_uid);
    const [count, setCount] = useState(0);
    const [latestValidCount, setLatestValidCount] = useState<number | null>(null);

    useEffect(() => {
        setLatestValidCount(null);
    }, [items, renderItem, renderRest]);

    const compute = useCallback(() => {
        console.log(count);
        const containerDOM = document.querySelector(`[data-urc-overflow-id="${uid}"]`) as HTMLButtonElement;
        console.log(containerDOM);
        if (!containerDOM) return;
        console.log(containerDOM.offsetWidth, containerDOM.scrollWidth);
        if (containerDOM.offsetWidth >= containerDOM.scrollWidth) {
            if (count === latestValidCount) {
                onMeasure(count);
                return;
            }
            setLatestValidCount(count);
            const nextMeasureCount = Math.min(items.length, count + 1);
            setCount(nextMeasureCount);
        } else if (containerDOM.offsetWidth < containerDOM.scrollWidth) {
            setCount(count => Math.max(0, count - 1));
        }
    }, [count, items.length, latestValidCount, uid]);

    useEffect(() => {
        const containerDOM = document.querySelector(`[data-urc-overflow-id="${uid}"]`) as HTMLButtonElement;
        const resizeObserver = new ResizeObserver(() => {
            compute();
        });
        if (containerDOM) resizeObserver.observe(containerDOM);
        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [compute, uid]);

    const renderItems = useMemo(() => items.slice(0, count).map(renderItem), [count, items, renderItem]);
    const restItems = useMemo(() => renderRest(items.slice(count)), [count, items, renderRest]);

    return (
        <Tag.Group {...rest} data-urc-overflow-id={uid} className={overflowCls}>
            {renderItems}
            {restItems}
        </Tag.Group>
    );
};

export default Overflow;
