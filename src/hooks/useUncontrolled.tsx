import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useIsInitial from './useIsInitial';

const useUncontrolled = <V, P = V, VT = V | undefined, U = never>(
    value: VT,
    defaultValue: V,
    onChange?: (v: P, ...rest: U[]) => void,
    options?: { setter?: (e: P) => V }
): [V, (v: P) => void, (v: P) => void] => {
    const isControlled = useMemo(() => value !== undefined, [value]);
    const isInitial = useIsInitial();
    const [v, setV] = useState<V>(() => (isControlled ? ((value as unknown) as V) : defaultValue));
    const cacheVRef = useRef(v);

    useEffect(() => {
        if (isInitial) return;
        if (isControlled) {
            // console.warn(`Can't change Component from uncontrolled to be controlled`);
        } else {
            // console.warn(`Can't change Component from controlled to be uncontrolled`);
        }
        // only update when isControlled change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isControlled]);

    const finalValue = isControlled ? ((value as unknown) as V) : cacheVRef.current;

    const o = useCallback(
        (v: P, ...rest: U[]) => {
            const r = options?.setter ? options?.setter(v) : v;
            // save value for controlled change to be uncontrolled
            // don't use state for reduce necessary update
            // still keep state for uncontrolled update
            cacheVRef.current = (r as unknown) as V;
            if (!isControlled) setV((r as unknown) as V);
            onChange?.(v, ...rest);
        },
        [options, isControlled, onChange]
    );

    const updateValueWithoutCallOnChange = useCallback(
        (v: P) => {
            if (!isControlled) setV((v as unknown) as V);
        },
        [isControlled]
    );

    return [finalValue, o, updateValueWithoutCallOnChange];
};

export default useUncontrolled;
