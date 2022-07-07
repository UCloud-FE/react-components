import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const DEFAULT_DEP: any[] = [];

/**
 * 计算容器内的元素最大展示数量
 * @returns {[number, number, boolean]} [当前测试的展示数, 最终确定的展示数, 是否在测试过程中]
 */
const useOverflow = (
    {
        containerRef,
        defaultCount = 0,
        maxCount,
        minCount = 0
    }: {
        /**
         * 容器元素的 ref
         */
        containerRef?: React.MutableRefObject<HTMLElement | null>;
        /**
         * 默认的初始展示数量
         */
        defaultCount?: number;
        /**
         * 最大展示数量，一般传入元素数量即可
         */
        maxCount: number;
        /**
         * 最小展示数量
         */
        minCount?: number;
    },
    /** 其它可能会导致需要重新计算展示数的依赖项 */
    deps: any[] = DEFAULT_DEP
): [number, number, boolean] => {
    const [count, setCount] = useState(() => Math.min(defaultCount, maxCount));
    const [measureCount, setMeasureCount] = useState(count);
    const [latestValidCount, setLatestValidCount] = useState<number | null>(null);
    const [measuring, setMeasuring] = useState(true);

    const startMeasuring = useCallback(() => {
        setMeasuring(true);
        setLatestValidCount(null);
    }, []);

    const endMeasuring = useCallback(measureCount => {
        setMeasuring(false);
        setMeasureCount(measureCount);
    }, []);

    useEffect(() => {
        startMeasuring();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        // reset when config changed
        startMeasuring();
    }, [minCount, maxCount, startMeasuring]);

    const measuringRef = useRef(measuring);
    useEffect(() => {
        measuringRef.current = measuring;
    }, [measuring]);

    useLayoutEffect(() => {
        const containerDOM = containerRef?.current;
        let resizeObserver: ResizeObserver | null = null;
        if (containerDOM) {
            resizeObserver = new ResizeObserver(() => {
                if (!measuringRef.current) {
                    startMeasuring();
                }
            });
            resizeObserver.observe(containerDOM);
        }
        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [containerRef, startMeasuring]);

    useLayoutEffect(() => {
        const containerDOM = containerRef?.current;
        if (!containerDOM) return;
        if (count === latestValidCount) {
            endMeasuring(latestValidCount);
            return;
        }
        let newCount: number = count;
        if (containerDOM.offsetWidth >= containerDOM.scrollWidth) {
            setLatestValidCount(count);
            newCount = Math.min(count + 1, maxCount);
        } else if (containerDOM.offsetWidth < containerDOM.scrollWidth) {
            if (count === 0) setLatestValidCount(count);
            newCount = Math.max(0, minCount, count - 1);
        }
        setCount(newCount);
    }, [containerRef, count, endMeasuring, latestValidCount, maxCount, minCount]);

    return [count, measureCount, measuring];
};

export default useOverflow;
