import { ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react';

const CLIENT_HEIGHT = window.innerHeight;
const FAIL_OFFSET = 2;

// get offset top for offset item
const getOffsetTop = (
    offset: number,
    // cache of measured item heights
    heights: number[],
    // cache array
    offsetTops: number[],
    lastUnmeasuredIndex: number,
    itemHeight: number
) => {
    const _getOffsetTop = (offset: number): number => {
        // cache
        if (offsetTops[offset] != null) return offsetTops[offset];
        // when have unmeasured items, use itemHeight for replace
        if (offset > lastUnmeasuredIndex)
            return _getOffsetTop(lastUnmeasuredIndex) + itemHeight * (offset - lastUnmeasuredIndex);
        // compute for measured items and cache
        return (offsetTops[offset] = _getOffsetTop(offset - 1) + heights[offset - 1]);
    };
    return _getOffsetTop(offset);
};

// get closed offset for current scrollTop
const getClosedOffset = (
    scrollTop: number,
    itemHeight: number,
    heights: number[],
    offsetTops: number[],
    lastUnmeasuredIndex: number,
    total: number,
    visibleCount: number
) => {
    const firstGuessOffset = (scrollTop / itemHeight) | 0;
    let min: number, max: number;
    if (getOffsetTop(firstGuessOffset, heights, offsetTops, lastUnmeasuredIndex, itemHeight) > scrollTop) {
        min = 0;
        max = firstGuessOffset;
    } else {
        min = firstGuessOffset;
        max = total - 1;
    }
    while (max - min > 2) {
        const c = ((min + max) / 2) | 0;
        if (getOffsetTop(c, heights, offsetTops, lastUnmeasuredIndex, itemHeight) > scrollTop) {
            max = c;
        } else {
            min = c;
        }
    }
    return Math.min(Math.max(min - 2, 0), Math.max(0, total - visibleCount));
};

const useVisibleScroll = <
    E1 extends HTMLElement = HTMLDivElement,
    E2 extends HTMLElement = HTMLDivElement,
    E3 extends HTMLElement = HTMLDivElement
>(
    scrollerRef: RefObject<E1>,
    wrapperRef: RefObject<E2>,
    heightWrapperRef: RefObject<E3>,
    children: ReactNode[],
    { clientHeight = CLIENT_HEIGHT, itemHeight = 20 }: { clientHeight?: number; itemHeight?: number } = {}
) => {
    const [scrollTop, setScrollTop] = useState(0);
    const heightsRef = useRef<number[]>([]);
    const offsetTopsRef = useRef([0]);
    const lastUnmeasuredIndexRef = useRef(0);

    // visible count of children
    const visibleCount = useMemo(() => ((clientHeight / itemHeight) | 0) + FAIL_OFFSET * 2, [clientHeight, itemHeight]);

    // offset from first visible child
    const offset = useMemo(
        () =>
            getClosedOffset(
                scrollTop,
                itemHeight,
                heightsRef.current,
                offsetTopsRef.current,
                lastUnmeasuredIndexRef.current,
                children.length,
                visibleCount
            ),
        [children.length, itemHeight, scrollTop, visibleCount]
    );

    // measure item heights
    const wrapper = wrapperRef.current;
    const heightWrapper = heightWrapperRef.current;
    useEffect(() => {
        if (!wrapper) return;
        const renderChildrenDOM = wrapper.childNodes;
        const l = renderChildrenDOM.length;
        const heights = heightsRef.current;
        const prevMeasured = offset <= lastUnmeasuredIndexRef.current;
        for (let i = 0; i < l; i++) {
            const index = i + offset;
            if (renderChildrenDOM[i].nodeType === 1) {
                heights[index] = (renderChildrenDOM[i] as HTMLElement).offsetHeight;
            } else {
                heights[index] = itemHeight;
                console.warn(renderChildrenDOM[i], ' is not a valid Element, this may cause height flashing');
            }
        }
        // update measured index
        if (prevMeasured) {
            lastUnmeasuredIndexRef.current = Math.max(lastUnmeasuredIndexRef.current, offset + l);
        }

        // full height of all items
        const fullHeight = getOffsetTop(
            children.length,
            heightsRef.current,
            offsetTopsRef.current,
            lastUnmeasuredIndexRef.current,
            itemHeight
        );
        // set height after current items measured
        if (heightWrapper) {
            heightWrapper.style.height = fullHeight + 'px';
        }
    }, [children.length, heightWrapper, itemHeight, offset, wrapper]);

    // listen onscroll
    const scroller = scrollerRef.current;
    useEffect(() => {
        const onScroll = (e: Event) => {
            if (!scroller) return;
            if (e.currentTarget !== scroller) return;
            setScrollTop(scroller.scrollTop);
        };
        if (scroller) {
            // initial scrollTop
            setScrollTop(scroller.scrollTop);
            scroller.addEventListener('scroll', onScroll);
        }
        return () => {
            if (scroller) scroller.removeEventListener('scroll', onScroll);
        };
    }, [scroller]);

    // children should render
    const renderChildren = useMemo(() => children.slice(offset, visibleCount + offset), [
        children,
        offset,
        visibleCount
    ]);

    // offset height from top
    const offsetTop = useMemo(() => {
        const heights = heightsRef.current;
        const offsetTops = offsetTopsRef.current;
        return getOffsetTop(offset, heights, offsetTops, lastUnmeasuredIndexRef.current, itemHeight);
    }, [itemHeight, offset]);

    return [renderChildren, offsetTop];
};

export default useVisibleScroll;
