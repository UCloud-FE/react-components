import { useCallback, useMemo, useRef, useState } from 'react';

// import once from 'src/utils/once';

const useUncontrolled = <V, P = V, VT = V | undefined, U = never>(
    value: VT,
    defaultValue: V,
    onChange?: (v: P, ...rest: U[]) => void,
    options?: { setter?: (e: P) => V }
): [V, (v: P) => void, (v: P) => void] => {
    const _isControlled = useMemo(() => value !== undefined, [value]);
    const isControlledRef = useRef(_isControlled);

    // const warningUncontrolledToControlled = useMemo(() => {
    //     return once(() => console.error(`Can't change Component from controlled to uncontrolled`));
    // }, []);
    // const warningControlledToUncontrolled = useMemo(() => {
    //     return once(() => console.error(`Can't change Component from controlled to uncontrolled`));
    // }, []);

    if (isControlledRef.current !== _isControlled) {
        if (_isControlled) {
            // warningUncontrolledToControlled();
            isControlledRef.current = _isControlled;
        } else {
            // warningControlledToUncontrolled();
            // don't change a controlled component to be uncontrolled to avoid unexpected undefined value
        }
    }
    const isControlled = isControlledRef.current;
    const [v, setV] = useState<V>(() => (isControlled ? ((value as unknown) as V) : defaultValue));
    const cacheVRef = useRef(v);

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
