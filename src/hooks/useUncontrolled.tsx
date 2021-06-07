import { useCallback, useMemo, useState } from 'react';

const useUncontrolled = <V, P = V, VT = V | undefined>(
    value: VT,
    defaultValue: V,
    onChange?: (v: P) => void,
    options?: { setter?: (e: P) => V }
): [V, (v: P) => void, (v: P) => void] => {
    const isControlled = useMemo(() => value !== undefined, [value]);
    const [v, setV] = useState<V>(() => (isControlled ? ((value as unknown) as V) : defaultValue));
    const finalValue = isControlled ? ((value as unknown) as V) : v;
    const o = useCallback(
        (v: P) => {
            const r = options?.setter ? options?.setter(v) : v;
            if (!isControlled) setV((r as unknown) as V);
            onChange?.(v);
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
