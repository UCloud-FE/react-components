import { ReactNode, RefObject, useEffect, useMemo, useState } from 'react';

const CLIENT_HEIGHT = window.innerHeight;
const FAIL_OFFSET = 2;

export const useSimpleVirtualList = <
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
    const [measuredItemHeight, setMeasuredItemHeight] = useState(itemHeight);
    const [measuredClientHeight, setMeasuredClientHeight] = useState(clientHeight);

    // visible count of children
    const visibleCount = useMemo(() => ((measuredClientHeight / measuredItemHeight) | 0) + FAIL_OFFSET * 2, [
        measuredClientHeight,
        measuredItemHeight
    ]);

    // measure when first mount
    useEffect(() => {
        const scroller = scrollerRef.current;
        const wrapper = wrapperRef.current;
        const heightWrapper = heightWrapperRef.current;
        if (!scroller || !wrapper || !heightWrapper) {
            console.error('scroller, wrapper, heightWrapper is invalid');
            return;
        }
        const firstItem = wrapper.children[0];
        if (!firstItem) {
            console.error('First item is invalid');
            return;
        }
        const itemRect = firstItem.getBoundingClientRect();
        // full height of all items
        const fullHeight = itemRect.height * children.length;
        // set height after current items measured
        heightWrapper.style.height = fullHeight + 'px';
        const scrollRect = scroller.getBoundingClientRect();
        setScrollTop(scroller.scrollTop);
        setMeasuredItemHeight(itemRect.height);
        setMeasuredClientHeight(scrollRect.height);
    }, [children.length, heightWrapperRef, scrollerRef, wrapperRef]);

    // offset from first visible child
    const offset = useMemo(() => {
        return Math.min(
            Math.max(((scrollTop / measuredItemHeight) | 0) - FAIL_OFFSET, 0),
            Math.max(children.length - visibleCount, 0)
        );
    }, [children.length, measuredItemHeight, scrollTop, visibleCount]);

    // listen onscroll
    useEffect(() => {
        const scroller = scrollerRef.current;
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
    }, [scrollerRef]);

    // children should render
    const renderChildren = useMemo(() => children.slice(offset, visibleCount + offset), [
        children,
        offset,
        visibleCount
    ]);

    // offset height from top
    const offsetTop = useMemo(() => offset * measuredItemHeight, [measuredItemHeight, offset]);

    return [renderChildren, offsetTop];
};

export default useSimpleVirtualList;
