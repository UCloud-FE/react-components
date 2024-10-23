import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

// https://github.com/que-etc/resize-observer-polyfill/issues/80
// 由于 ts 官方增加了 contentRect 的类型定义，导致和 resize-observer-polyfill 内部的定义冲突，目前先以 "skipLibCheck" 解决

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
    // the count of trying to show
    const [count, setCount] = useState(() => Math.min(defaultCount, maxCount));
    // the count valid to show
    const [measureCount, setMeasureCount] = useState(count);
    // latest valid count
    const [latestValidCount, setLatestValidCount] = useState<number | null>(null);
    // the container element
    const [measuring, setMeasuring] = useState(true);

    // save to ref for use in resize observer to avoid frequently create new observer
    const measuringRef = useRef(measuring);
    useEffect(() => {
        measuringRef.current = measuring;
    }, [measuring]);

    // start to measure
    const startMeasuring = useCallback(() => {
        if (measuringRef.current) return;
        setMeasuring(true);
        setLatestValidCount(null);
    }, []);

    // stop measuring
    const endMeasuring = useCallback(measureCount => {
        setMeasuring(false);
        setMeasureCount(measureCount);
    }, []);

    useEffect(() => {
        // console.log('reset when deps changed');
        startMeasuring();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        // reset when config changed
        startMeasuring();
    }, [minCount, maxCount, startMeasuring]);

    useEffect(() => {
        const containerDOM = containerRef?.current;
        let resizeObserver: ResizeObserver | null = null;
        if (containerDOM) {
            resizeObserver = new ResizeObserver(() => {
                if (!measuringRef.current) {
                    startMeasuring();
                    // console.log('reset when width changed');
                }
                // else {
                //     console.log('lock when width changed');
                // }
            });
            resizeObserver.observe(containerDOM);
        }
        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [containerRef, startMeasuring]);

    // console.log({ count, latestValidCount, maxCount, minCount, measuring });

    // use layout effect to measure can avoid most shaking
    useLayoutEffect(() => {
        const containerDOM = containerRef?.current;
       
        
        if (!containerDOM || containerDOM.offsetWidth === 0 || containerDOM.scrollWidth ===0) return; 
        // measure end
        if (count === latestValidCount) {
            endMeasuring(latestValidCount);
            return;
        }
        let newCount: number = count;
        if (containerDOM.offsetWidth >= containerDOM.scrollWidth) {
            setLatestValidCount(count);
            // try to show more
            newCount = Math.min(count + 1, maxCount);
        } else if (containerDOM.offsetWidth < containerDOM.scrollWidth) {
            // if container with not enough space event when count is 0, it will be set to 0
            if (count === 0) setLatestValidCount(count);
            // try to show less
            newCount = Math.max(0, minCount, count - 1);
        }
        setCount(newCount);
    }, [containerRef, count, endMeasuring, latestValidCount, maxCount, minCount]);

    return [count, measureCount, measuring];
};

export default useOverflow;
