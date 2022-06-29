import React, { Key, ReactElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import Tag from 'src/components/Tag';

import { overflowCls, staticCls } from './style';

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
    const [count, setCount] = useState(0);
    const [latestValidCount, setLatestValidCount] = useState<number | null>(null);

    const compute = useCallback(() => {
        const containerDOM = document.querySelector(`[data-urc-overflow-id="${uid}"]`) as HTMLButtonElement;
        if (!containerDOM) return;
        if (count === latestValidCount) {
            onMeasure(count);
            return;
        }
        if (containerDOM.offsetWidth >= containerDOM.scrollWidth) {
            setLatestValidCount(count);
            setCount(Math.min(items.length, count + 1));
        } else if (containerDOM.offsetWidth < containerDOM.scrollWidth) {
            setCount(count => Math.max(0, count - 1));
        }
    }, [count, items.length, latestValidCount, onMeasure, uid]);

    const computeRef = useRef(compute);

    useEffect(() => {
        computeRef.current = compute;
    }, [compute]);

    useEffect(() => {
        setLatestValidCount(null);
    }, [changeContent]);

    useEffect(() => {
        computeRef.current();
    }, [compute]);

    useLayoutEffect(() => {
        const containerDOM = document.querySelector(`[data-urc-overflow-id="${uid}"]`) as HTMLButtonElement;
        const resizeObserver = new ResizeObserver(() => {
            setLatestValidCount(null);
        });
        if (containerDOM) resizeObserver.observe(containerDOM);
        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [uid]);

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
